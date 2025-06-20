import type { Metadata } from 'next';
import './globals.css';
import AIAssistantPanel from '@/components/ai-assistant-panel/AIAssistantPanel';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import AuthProvider from '@/components/auth/AuthProvider';

export const metadata: Metadata = {
  title: 'EHB-Next.js',
  description: 'EHB Next.js 04 - Ultra Fast Cursor AI Automation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AIAssistantPanel />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
