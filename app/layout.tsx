import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EHB Next.js 04 - Frontend Development',
  description: 'EHB Next.js 04 Frontend Development Platform',
  keywords: 'EHB, Next.js, Frontend, Development',
  authors: [{ name: 'EHB Team' }],
  creator: 'EHB Technologies',
  publisher: 'EHB Technologies',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} font-sans antialiased`}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
