import Analytics from '@analytics/google-analytics';

export const analytics = Analytics({
  app: 'ehb-next',
  plugins: [
    googleAnalytics({
      measurementIds: [process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID],
    }),
  ],
});

export const trackPageView = (url: string) => {
  analytics.page();
};

export const trackEvent = (eventName: string, properties?: any) => {
  analytics.track(eventName, properties);
};
