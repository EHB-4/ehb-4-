import { NextRequest, NextResponse } from 'next/server';
import utils/urlManager from '@/lib/utils/urlManager';
import utils/autoBrowser from '@/lib/utils/autoBrowser';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const pageId = searchParams.get('pageId');
    const agentId = searchParams.get('agentId');
    const query = searchParams.get('query');

    switch (action) {
      case 'getAllPages':
        return NextResponse.json({
          success: true,
          data: urlManager.getAllPages(),
        });

      case 'getPage':
        if (!pageId) {
          return NextResponse.json(
            {
              success: false,
              error: 'Page ID is required',
            },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: urlManager.getPage(pageId),
        });

      case 'getPageByUrl':
        if (!query) {
          return NextResponse.json(
            {
              success: false,
              error: 'URL is required',
            },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: urlManager.getPageByUrl(query),
        });

      case 'searchPages':
        if (!query) {
          return NextResponse.json(
            {
              success: false,
              error: 'Search query is required',
            },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: urlManager.searchPages(query),
        });

      case 'getPagesByCategory':
        if (!query) {
          return NextResponse.json(
            {
              success: false,
              error: 'Category is required',
            },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: urlManager.getPagesByCategory(query),
        });

      case 'getPagesByStatus':
        if (!query) {
          return NextResponse.json(
            {
              success: false,
              error: 'Status is required',
            },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: urlManager.getPagesByStatus(query),
        });

      case 'getPagesByTag':
        if (!query) {
          return NextResponse.json(
            {
              success: false,
              error: 'Tag is required',
            },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: urlManager.getPagesByTag(query),
        });

      case 'getAllAgents':
        return NextResponse.json({
          success: true,
          data: autoBrowser.getAllAgents(),
        });

      case 'getAvailableAgents':
        return NextResponse.json({
          success: true,
          data: autoBrowser.getAvailableAgents(),
        });

      case 'getAgent':
        if (!agentId) {
          return NextResponse.json(
            {
              success: false,
              error: 'Agent ID is required',
            },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: autoBrowser.getAgent(agentId),
        });

      case 'getPagesByAgent':
        if (!agentId) {
          return NextResponse.json(
            {
              success: false,
              error: 'Agent ID is required',
            },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: autoBrowser.getPagesByAgent(agentId),
        });

      case 'getSystemStatus':
        return NextResponse.json({
          success: true,
          data: autoBrowser.getSystemStatus(),
        });

      case 'getActiveSessions':
        return NextResponse.json({
          success: true,
          data: Array.from(autoBrowser.getActiveSessions().entries()),
        });

      case 'getFullUrl':
        if (!pageId) {
          return NextResponse.json(
            {
              success: false,
              error: 'Page ID is required',
            },
            { status: 400 }
          );
        }
        return NextResponse.json({
          success: true,
          data: urlManager.getFullUrl(pageId),
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            pages: urlManager.getAllPages(),
            agents: autoBrowser.getAllAgents(),
            systemStatus: autoBrowser.getSystemStatus(),
            activeSessions: Array.from(autoBrowser.getActiveSessions().entries()),
          },
        });
    }
  } catch (error) {
    console.error('URL Management API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, pageId, agentId, url, status, completion } = body;

    switch (action) {
      case 'openPage':
        if (!pageId) {
          return NextResponse.json(
            {
              success: false,
              error: 'Page ID is required',
            },
            { status: 400 }
          );
        }

        const success = await autoBrowser.openPage(pageId, agentId);
        return NextResponse.json({
          success,
          message: success ? 'Page opened successfully' : 'Failed to open page',
        });

      case 'openMultiplePages':
        if (!body.pageIds || !Array.isArray(body.pageIds)) {
          return NextResponse.json(
            {
              success: false,
              error: 'Page IDs array is required',
            },
            { status: 400 }
          );
        }

        const openedPages = await autoBrowser.openMultiplePages(body.pageIds, agentId);
        return NextResponse.json({
          success: true,
          data: openedPages,
          message: `Opened ${openedPages.length} pages`,
        });

      case 'searchAndOpenPages':
        if (!body.query) {
          return NextResponse.json(
            {
              success: false,
              error: 'Search query is required',
            },
            { status: 400 }
          );
        }

        const searchOpenedPages = await autoBrowser.searchAndOpenPages(body.query, agentId);
        return NextResponse.json({
          success: true,
          data: searchOpenedPages,
          message: `Opened ${searchOpenedPages.length} pages for query: ${body.query}`,
        });

      case 'assignAgent':
        if (!pageId || !agentId) {
          return NextResponse.json(
            {
              success: false,
              error: 'Page ID and Agent ID are required',
            },
            { status: 400 }
          );
        }

        const assignSuccess = autoBrowser.assignAgentToPage(pageId, agentId);
        return NextResponse.json({
          success: assignSuccess,
          message: assignSuccess ? 'Agent assigned successfully' : 'Failed to assign agent',
        });

      case 'releaseAgent':
        if (!pageId) {
          return NextResponse.json(
            {
              success: false,
              error: 'Page ID is required',
            },
            { status: 400 }
          );
        }

        const releaseSuccess = autoBrowser.releaseAgentFromPage(pageId);
        return NextResponse.json({
          success: releaseSuccess,
          message: releaseSuccess ? 'Agent released successfully' : 'Failed to release agent',
        });

      case 'updatePageStatus':
        if (!pageId || !status || completion === undefined) {
          return NextResponse.json(
            {
              success: false,
              error: 'Page ID, status, and completion are required',
            },
            { status: 400 }
          );
        }

        urlManager.updatePageStatus(pageId, status, completion);
        return NextResponse.json({
          success: true,
          message: 'Page status updated successfully',
        });

      case 'updateAgentStatus':
        if (!agentId || !status) {
          return NextResponse.json(
            {
              success: false,
              error: 'Agent ID and status are required',
            },
            { status: 400 }
          );
        }

        const updateAgentSuccess = autoBrowser.updateAgentStatus(agentId, status);
        return NextResponse.json({
          success: updateAgentSuccess,
          message: updateAgentSuccess
            ? 'Agent status updated successfully'
            : 'Failed to update agent status',
        });

      case 'closeAllSessions':
        autoBrowser.closeAllSessions();
        return NextResponse.json({
          success: true,
          message: 'All sessions closed successfully',
        });

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('URL Management API POST Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
