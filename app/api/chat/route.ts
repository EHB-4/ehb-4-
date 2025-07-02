export const runtime = "nodejs";
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

// Mock AI responses for different types of queries
const mockAIResponses = {
  education: [
    'I can help you find tutors in Pakistan. What subject are you looking for?',
    'There are many qualified tutors available. Which city are you in?',
    "I can connect you with experienced teachers. What's your budget range?",
    'Great! I found several tutors matching your criteria. Would you like to see their profiles?',
  ],
  health: [
    'I can help you find doctors and healthcare services. What type of doctor do you need?',
    'There are excellent healthcare providers in your area. Which city are you located in?',
    "I can recommend specialists based on your needs. What's your preferred location?",
    'Perfect! I found several doctors matching your requirements. Would you like to book an appointment?',
  ],
  shopping: [
    'I can help you find products and shops. What are you looking for?',
    "There are many great products available. What's your budget?",
    'I can recommend the best shops for your needs. Which city are you in?',
    'Excellent! I found several products matching your search. Would you like to see them?',
  ],
  general: [
    "Hello! I'm your EHB AI assistant. How can I help you today?",
    'I can help with education, health, and shopping services across Pakistan.',
    'Feel free to ask me anything about tutors, doctors, or products!',
    "I'm here to make your life easier. What do you need help with?",
  ],
};

// Simple intent detection
function detectIntent(message: string): 'education' | 'health' | 'shopping' | 'general' {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes('tutor') ||
    lowerMessage.includes('teacher') ||
    lowerMessage.includes('education') ||
    lowerMessage.includes('study')
  ) {
    return 'education';
  }

  if (
    lowerMessage.includes('doctor') ||
    lowerMessage.includes('health') ||
    lowerMessage.includes('medical') ||
    lowerMessage.includes('hospital')
  ) {
    return 'health';
  }

  if (
    lowerMessage.includes('shop') ||
    lowerMessage.includes('buy') ||
    lowerMessage.includes('product') ||
    lowerMessage.includes('purchase')
  ) {
    return 'shopping';
  }

  return 'general';
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { message } = await req.json();

    if (!message) {
      return new NextResponse('Message is required', { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Detect intent and get appropriate response
    const intent = detectIntent(message);
    const responses = mockAIResponses[intent];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Add some context awareness
    let response = randomResponse;

    if (message.toLowerCase().includes('karachi')) {
      response += ' I found great options in Karachi!';
    } else if (message.toLowerCase().includes('lahore')) {
      response += ' There are excellent choices in Lahore!';
    } else if (message.toLowerCase().includes('islamabad')) {
      response += ' I can help you find services in Islamabad!';
    }

    return NextResponse.json({
      response,
      intent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
