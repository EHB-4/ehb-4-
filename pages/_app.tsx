import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Navigation from '@/components/layout/Navigation';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
}
