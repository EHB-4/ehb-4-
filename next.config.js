/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    APP_NAME: 'EHB Technologies',
    APP_VERSION: '1.0.0',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/pages/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/dashboard',
        destination: '/dashboard/overview',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  webpack: config => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // Remove experimental features
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Use default .next directory instead of build
  distDir: '.next',
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  // Enable both app and pages directories
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // server: {
  //   port: 3001,
  // },
};

module.exports = nextConfig;
