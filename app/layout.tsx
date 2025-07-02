import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import EHBNavigation from '@/components/layout/EHBNavigation';
import SmartNavigation from '@/components/layout/SmartNavigation';
import ServiceBreadcrumbs from '@/components/layout/SmartNavigation';
import ServiceAutoRedirect from '@/components/auto/ServiceAutoRedirect';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EHB Technologies - Complete Digital Ecosystem',
  description:
    'EHB Technologies provides a comprehensive suite of digital services including job placement, franchise management, healthcare, legal services, travel, education, and more.',
  keywords:
    'EHB, Technologies, Digital Services, Job Placement, Franchise, Healthcare, Legal Services, Travel, Education, Wallet, AI, Blockchain',
  authors: [{ name: 'EHB Technologies Team' }],
  creator: 'EHB Technologies',
  publisher: 'EHB Technologies',
  robots: 'index, follow',
  openGraph: {
    title: 'EHB Technologies - Complete Digital Ecosystem',
    description: 'Comprehensive suite of digital services for modern businesses and individuals',
    url: 'https://ehb-technologies.com',
    siteName: 'EHB Technologies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EHB Technologies',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EHB Technologies - Complete Digital Ecosystem',
    description: 'Comprehensive suite of digital services for modern businesses and individuals',
    images: ['/twitter-image.jpg'],
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://ehb-technologies.com'),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const themeColor = '#3B82F6';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body
        className={`${inter.className} font-sans antialiased h-full bg-gray-50 dark:bg-gray-900`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EHBNavigation />
          <SmartNavigation showAutoRedirect={true} />
          <ServiceBreadcrumbs />
          <ServiceAutoRedirect showNotification={true} autoRedirect={true} />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">E</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      EHB Technologies
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Complete digital ecosystem providing comprehensive services for modern
                    businesses and individuals.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <span className="sr-only">Twitter</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/services"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        All Services
                      </a>
                    </li>
                    <li>
                      <a
                        href="/dashboard"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="/development-portal"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        Development Portal
                      </a>
                    </li>
                    <li>
                      <a
                        href="/roadmap"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        Roadmap
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
                    Contact
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-gray-600 dark:text-gray-400">info@ehb.com</li>
                    <li className="text-gray-600 dark:text-gray-400">+92 300 1234567</li>
                    <li className="text-gray-600 dark:text-gray-400">Karachi, Pakistan</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-center text-gray-400 dark:text-gray-500 text-sm">
                  © 2024 EHB Technologies. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
          <Toaster position="top-right" richColors closeButton duration={4000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
