import { NextApiRequest, NextApiResponse } from 'next';

interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  userId?: string;
  sessionId?: string;
  timestamp: Date;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];

  track(event: string, properties: Record<string, any> = {}, userId?: string) {
    const eventData: AnalyticsEvent = {
      event,
      properties,
      userId,
      sessionId: this.getSessionId(),
      timestamp: new Date(),
    };

    this.events.push(eventData);
    this.saveEvent(eventData);
  }

  private getSessionId(): string {
    // Generate or retrieve session ID
    return Math.random().toString(36).substring(2, 15);
  }

  private async saveEvent(event: AnalyticsEvent) {
    try {
      // Save to database or external service
      console.log('Analytics event:', event);
    } catch (error) {
      console.error('Failed to save analytics event:', error);
    }
  }

  getEvents(filters: Partial<AnalyticsEvent> = {}): AnalyticsEvent[] {
    return this.events.filter(event => {
      return Object.entries(filters).every(([key, value]) => {
        return event[key as keyof AnalyticsEvent] === value;
      });
    });
  }

  getEventCount(eventName: string): number {
    return this.events.filter(event => event.event === eventName).length;
  }
}

export const analytics = new AnalyticsService();
export default analytics;
