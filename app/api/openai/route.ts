import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '../../../lib/api/openai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import OpenAI from 'openai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize rate limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
});

// Validation schemas
const openAIRequestSchema = z.object({
  model: z.enum(['gpt-4', 'gpt-3.5-turbo', 'text-davinci-003']),
  messages: z.array(
    z.object({
      role: z.enum(['system', 'user', 'assistant']),
      content: z.string(),
    })
  ),
  temperature: z.number().min(0).max(2).optional(),
  max_tokens: z.number().positive().optional(),
  stream: z.boolean().optional(),
});

const openAIResponseSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  model: z.string(),
  choices: z.array(
    z.object({
      message: z.object({
        role: z.string(),
        content: z.string(),
      }),
      finish_reason: z.string(),
    })
  ),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check rate limit
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `openai_${session.user.id}`
    );

    if (!success) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          limit,
          reset,
          remaining,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validatedData = openAIRequestSchema.parse(body);

    // Check user's subscription and usage limits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { subscription: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Log OpenAI request
    const openAIRequest = await prisma.openAIRequest.create({
      data: {
        userId: session.user.id,
        model: validatedData.model,
        messages: validatedData.messages,
        options: {
          temperature: validatedData.temperature,
          max_tokens: validatedData.max_tokens,
          stream: validatedData.stream,
        },
        status: 'processing',
      },
    });

    try {
      // Make OpenAI API call
      const completion = await openai.chat.completions.create({
        model: validatedData.model,
        messages: validatedData.messages,
        temperature: validatedData.temperature,
        max_tokens: validatedData.max_tokens,
        stream: validatedData.stream,
      });

      // Handle streaming response
      if (validatedData.stream) {
        const stream = completion as unknown as ReadableStream;
        return new Response(stream);
      }

      // Handle non-streaming response
      const chatCompletion = completion as OpenAI.Chat.Completions.ChatCompletion;

      // Update request status
      await prisma.openAIRequest.update({
        where: { id: openAIRequest.id },
        data: {
          status: 'completed',
          response: chatCompletion,
          usage: chatCompletion.usage || {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
          },
        },
      });

      // Validate response
      const validatedResponse = openAIResponseSchema.parse(chatCompletion);

      return NextResponse.json(validatedResponse);
    } catch (error) {
      // Update request status on error
      await prisma.openAIRequest.update({
        where: { id: openAIRequest.id },
        data: {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      throw error;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('OpenAI request error:', error);
    return NextResponse.json(
      { error: 'Failed to process OpenAI request' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const model = searchParams.get('model');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const requests = await prisma.openAIRequest.findMany({
      where: {
        userId: session.user.id,
        ...(model && { model }),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    // Get usage statistics
    const usage = await prisma.openAIRequest.aggregate({
      where: {
        userId: session.user.id,
        status: 'completed',
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
        },
      },
      _sum: {
        usage: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: requests,
      usage: usage._sum.usage || 0,
      pagination: {
        limit,
        offset,
        total: await prisma.openAIRequest.count({
          where: {
            userId: session.user.id,
            ...(model && { model }),
          },
        }),
      },
    });
  } catch (error) {
    console.error('OpenAI requests fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch OpenAI requests' },
      { status: 500 }
    );
  }
}
