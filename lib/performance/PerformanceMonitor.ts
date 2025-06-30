/**
 * Performance Monitor for EHB Frontend
 * Tracks Core Web Vitals and application performance metrics
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  fcp?: number; // First Contentful Paint

  // Custom metrics
  pageLoadTime?: number;
  componentRenderTime?: number;
  apiResponseTime?: number;
  memoryUsage?: number;

  // User interactions
  clickToLoad?: number;
  scrollPerformance?: number;

  // Error tracking
  jsErrors?: number;
  apiErrors?: number;
}

export interface PerformanceEvent {
  name: string;
  value: number;
  category: 'navigation' | 'paint' | 'layout' | 'interaction' | 'error';
  timestamp: number;
  metadata?: Record<string, any>;
}

/**
 * Performance Monitor Class
 * Handles performance tracking and reporting
 */
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private events: PerformanceEvent[] = [];
  private observers: Map<string, PerformanceObserver> = new Map();
  private isInitialized = false;

  constructor() {
    this.init();
  }

  /**
   * Initialize performance monitoring
   */
  private init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.setupCoreWebVitals();
    this.setupCustomMetrics();
    this.setupErrorTracking();
    this.setupUserInteractions();

    this.isInitialized = true;
    console.log('Performance Monitor initialized');
  }

  /**
   * Setup Core Web Vitals tracking
   */
  private setupCoreWebVitals(): void {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry;
        this.metrics.lcp = lastEntry.startTime;
        this.recordEvent('LCP', lastEntry.startTime, 'paint');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.set('lcp', lcpObserver);

      // First Input Delay
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          this.recordEvent('FID', this.metrics.fid, 'interaction');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.set('fid', fidObserver);

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver(list => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = clsValue;
        this.recordEvent('CLS', clsValue, 'layout');
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.set('cls', clsObserver);
    }

    // Navigation timing
    if ('performance' in window) {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
        this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
        this.recordEvent('TTFB', this.metrics.ttfb, 'navigation');
        this.recordEvent('PageLoad', this.metrics.pageLoadTime, 'navigation');
      }
    }
  }

  /**
   * Setup custom performance metrics
   */
  private setupCustomMetrics(): void {
    // Memory usage tracking
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        this.metrics.memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        this.recordEvent('MemoryUsage', this.metrics.memoryUsage, 'interaction');
      }, 30000); // Check every 30 seconds
    }

    // Component render time tracking
    this.setupComponentTracking();
  }

  /**
   * Setup component render time tracking
   */
  private setupComponentTracking(): void {
    // Custom hook for React components
    if (typeof window !== 'undefined') {
      (window as any).trackComponentRender = (componentName: string, renderTime: number) => {
        this.recordEvent(`${componentName}Render`, renderTime, 'interaction', {
          component: componentName,
        });
      };
    }
  }

  /**
   * Setup error tracking
   */
  private setupErrorTracking(): void {
    let jsErrorCount = 0;
    let apiErrorCount = 0;

    // JavaScript errors
    window.addEventListener('error', event => {
      jsErrorCount++;
      this.metrics.jsErrors = jsErrorCount;
      this.recordEvent('JSError', 1, 'error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
      });
    });

    // API errors (custom implementation)
    if (typeof window !== 'undefined') {
      (window as any).trackApiError = (error: any) => {
        apiErrorCount++;
        this.metrics.apiErrors = apiErrorCount;
        this.recordEvent('APIError', 1, 'error', {
          status: error.status,
          url: error.url,
          message: error.message,
        });
      };
    }
  }

  /**
   * Setup user interaction tracking
   */
  private setupUserInteractions(): void {
    let lastClickTime = 0;
    let scrollEvents = 0;

    // Click to load time
    document.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' || target.closest('a')) {
        const clickTime = performance.now();
        lastClickTime = clickTime;

        // Track navigation clicks
        setTimeout(() => {
          const loadTime = performance.now() - clickTime;
          this.recordEvent('ClickToLoad', loadTime, 'interaction');
        }, 1000);
      }
    });

    // Scroll performance
    let scrollTimeout: NodeJS.Timeout;
    document.addEventListener('scroll', () => {
      scrollEvents++;
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        this.recordEvent('ScrollPerformance', scrollEvents, 'interaction');
        scrollEvents = 0;
      }, 1000);
    });
  }

  /**
   * Record a performance event
   */
  private recordEvent(
    name: string,
    value: number,
    category: PerformanceEvent['category'],
    metadata?: Record<string, any>
  ): void {
    const event: PerformanceEvent = {
      name,
      value,
      category,
      timestamp: Date.now(),
      metadata,
    };

    this.events.push(event);

    // Keep only last 100 events
    if (this.events.length > 100) {
      this.events = this.events.slice(-100);
    }

    // Send to analytics if configured
    this.sendToAnalytics(event);
  }

  /**
   * Send performance data to analytics
   */
  private sendToAnalytics(event: PerformanceEvent): void {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'performance', {
        event_category: event.category,
        event_label: event.name,
        value: Math.round(event.value),
        custom_parameters: event.metadata,
      });
    }

    // Send to custom analytics endpoint
    this.sendToCustomEndpoint(event);
  }

  /**
   * Send to custom analytics endpoint
   */
  private async sendToCustomEndpoint(event: PerformanceEvent): Promise<void> {
    try {
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.warn('Failed to send performance data:', error);
    }
  }

  /**
   * Get current performance metrics
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Get performance events
   */
  public getEvents(): PerformanceEvent[] {
    return [...this.events];
  }

  /**
   * Get performance score based on Core Web Vitals
   */
  public getPerformanceScore(): number {
    let score = 100;

    // LCP scoring (0-2.5s = good, 2.5-4s = needs improvement, >4s = poor)
    if (this.metrics.lcp) {
      if (this.metrics.lcp > 4000) score -= 30;
      else if (this.metrics.lcp > 2500) score -= 15;
    }

    // FID scoring (0-100ms = good, 100-300ms = needs improvement, >300ms = poor)
    if (this.metrics.fid) {
      if (this.metrics.fid > 300) score -= 30;
      else if (this.metrics.fid > 100) score -= 15;
    }

    // CLS scoring (0-0.1 = good, 0.1-0.25 = needs improvement, >0.25 = poor)
    if (this.metrics.cls) {
      if (this.metrics.cls > 0.25) score -= 30;
      else if (this.metrics.cls > 0.1) score -= 15;
    }

    return Math.max(0, score);
  }

  /**
   * Generate performance report
   */
  public generateReport(): any {
    const score = this.getPerformanceScore();
    const grade =
      score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';

    return {
      timestamp: new Date().toISOString(),
      score,
      grade,
      metrics: this.metrics,
      events: this.events.slice(-20), // Last 20 events
      recommendations: this.getRecommendations(),
    };
  }

  /**
   * Get performance recommendations
   */
  private getRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.metrics.lcp && this.metrics.lcp > 2500) {
      recommendations.push(
        'Optimize Largest Contentful Paint by improving image loading and server response times'
      );
    }

    if (this.metrics.fid && this.metrics.fid > 100) {
      recommendations.push(
        'Reduce First Input Delay by optimizing JavaScript execution and reducing main thread blocking'
      );
    }

    if (this.metrics.cls && this.metrics.cls > 0.1) {
      recommendations.push(
        'Improve Cumulative Layout Shift by setting explicit dimensions for images and avoiding layout shifts'
      );
    }

    if (this.metrics.memoryUsage && this.metrics.memoryUsage > 0.8) {
      recommendations.push(
        'Optimize memory usage by cleaning up event listeners and avoiding memory leaks'
      );
    }

    return recommendations;
  }

  /**
   * Cleanup performance monitoring
   */
  public destroy(): void {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers.clear();
    this.isInitialized = false;
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Export for use in components
export default performanceMonitor;
