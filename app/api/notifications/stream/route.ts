export const runtime = 'nodejs';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// Server-Sent Events stream for real-time notifications
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId || userId !== session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Set up SSE headers
    const headers = {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    };

    const stream = new ReadableStream({
      start(controller) {
        // Send initial connection message
        controller.enqueue(
          `data: ${JSON.stringify({ type: 'connected', message: 'Connected to notification stream' })}\n\n`
        );

        // Keep connection alive with heartbeat
        const heartbeat = setInterval(() => {
          controller.enqueue(
            `data: ${JSON.stringify({ type: 'heartbeat', timestamp: Date.now() })}\n\n`
          );
        }, 30000); // Every 30 seconds

        // Clean up on close
        request.signal.addEventListener('abort', () => {
          clearInterval(heartbeat);
          controller.close();
        });
      },
    });

    return new Response(stream, { headers });
  } catch (error) {
    console.error('Notification stream error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
