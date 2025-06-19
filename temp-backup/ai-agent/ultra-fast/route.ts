import { NextRequest, NextResponse } from 'next/server';

import { UltraFastAgentService } from '@/app/ehb-ai-agent/services/ultraFastAgentService';

const agent = UltraFastAgentService.getInstance();

export async function GET() {
  try {
    const status = agent.getStatus();
    const tasks = agent.getAllTasks();

    return NextResponse.json({
      success: true,
      data: {
        status,
        tasks: tasks.slice(-50), // Return last 50 tasks
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get agent status' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, type, data } = body;

    switch (action) {
      case 'start':
        await agent.start();
        return NextResponse.json({ success: true, message: 'Agent started' });

      case 'stop':
        await agent.stop();
        return NextResponse.json({ success: true, message: 'Agent stopped' });

      case 'addTask':
        if (!type) {
          return NextResponse.json(
            { success: false, error: 'Task type is required' },
            { status: 400 }
          );
        }
        const taskId = await agent.addTask(type, data || {});
        return NextResponse.json({ success: true, taskId });

      case 'clearCache':
        agent.clearCache();
        return NextResponse.json({ success: true, message: 'Cache cleared' });

      case 'addMultipleTasks':
        const taskTypes = ['development', 'testing', 'deployment', 'monitoring'];
        const promises = taskTypes.map(type =>
          agent.addTask(type, { component: `Component-${Date.now()}-${type}` })
        );
        const taskIds = await Promise.all(promises);
        return NextResponse.json({ success: true, taskIds });

      default:
        return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
