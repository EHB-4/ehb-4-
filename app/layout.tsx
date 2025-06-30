import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import AuthProvider from '../components/auth/AuthProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'EHB - Next Generation Digital Ecosystem',
    template: '%s | EHB',
  },
  description:
    'EHB Next.js 04 - Ultra Fast Cursor AI Automation with comprehensive digital services including e-commerce, healthcare, education, and AI tools.',
  keywords: ['EHB', 'Next.js', 'AI', 'E-commerce', 'Healthcare', 'Education', 'Digital Services'],
  authors: [{ name: 'EHB Team' }],
  creator: 'EHB Development Team',
  publisher: 'EHB',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ehb-platform.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ehb-platform.com',
    title: 'EHB - Next Generation Digital Ecosystem',
    description: 'Comprehensive digital services platform with AI-powered solutions',
    siteName: 'EHB Platform',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EHB Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EHB - Next Generation Digital Ecosystem',
    description: 'Comprehensive digital services platform with AI-powered solutions',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} font-sans antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" richColors closeButton duration={4000} />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
