export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Real-time AI Agent data API
 * Provides live updates using Server-Sent Events
 */
export async function GET(request: NextRequest) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
  };

  const stream = new ReadableStream({
    start(controller) {
      const sendData = (data: any) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      // Send initial data
      sendData({
        type: 'agents_status',
        data: {
          totalAgents: 12,
          activeAgents: 10,
          healthyAgents: 9,
          degradedAgents: 1,
          criticalAgents: 0,
          timestamp: new Date().toISOString(),
        },
      });

      // Simulate real-time updates every 5 seconds
      const interval = setInterval(() => {
        const mockData = {
          type: 'agents_update',
          data: {
            agents: [
              {
                id: 1,
                name: 'SOT Orchestrator',
                status: 'healthy',
                cpu: Math.floor(Math.random() * 30) + 20,
                memory: Math.floor(Math.random() * 20) + 40,
                responseTime: (Math.random() * 0.5 + 0.8).toFixed(2),
                requestsPerMinute: Math.floor(Math.random() * 100) + 400,
              },
              {
                id: 2,
                name: 'Code Check Agent',
                status: Math.random() > 0.8 ? 'degraded' : 'healthy',
                cpu: Math.floor(Math.random() * 40) + 50,
                memory: Math.floor(Math.random() * 30) + 60,
                responseTime: (Math.random() * 1.5 + 1.5).toFixed(2),
                requestsPerMinute: Math.floor(Math.random() * 80) + 250,
              },
              {
                id: 3,
                name: 'Fraud Watch Agent',
                status: 'healthy',
                cpu: Math.floor(Math.random() * 20) + 25,
                memory: Math.floor(Math.random() * 15) + 45,
                responseTime: (Math.random() * 0.3 + 0.2).toFixed(2),
                requestsPerMinute: Math.floor(Math.random() * 200) + 700,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        };

        sendData(mockData);
      }, 5000);

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, { headers });
}
