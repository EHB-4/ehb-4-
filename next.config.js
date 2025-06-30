/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },

  images: {
    domains: ['localhost', 'your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },

  compress: true,

  async redirects() {
    return [
      // Port 8080 -> Development Portal
      {
        source: '/',
        destination: '/development-portal',
        permanent: false,
        has: [
          {
            type: 'header',
            key: 'host',
            value: 'localhost:8080',
          },
        ],
      },
      // Port 5000 -> Admin Panel
      {
        source: '/',
        destination: '/admin-panel',
        permanent: false,
        has: [
          {
            type: 'header',
            key: 'host',
            value: 'localhost:5000',
          },
        ],
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
