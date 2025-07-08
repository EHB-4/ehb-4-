#!/usr/bin/env node

/**
 * Production Setup Script for EHB Platform
 * Configures the environment for production deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ProductionSetup {
  constructor() {
    this.rootDir = process.cwd();
    this.config = {
      domain: 'ehb-platform.com',
      services: {
        frontend: { port: 3000, subdomain: 'app' },
        backend: { port: 5000, subdomain: 'api' },
        admin: { port: 8000, subdomain: 'admin' },
        portal: { port: 8080, subdomain: 'portal' }
      }
    };
  }

  async setup() {
    console.log('🚀 Setting up EHB Platform for Production...');
    
    try {
      // Step 1: Validate environment
      await this.validateEnvironment();
      
      // Step 2: Create production environment file
      await this.createProductionEnv();
      
      // Step 3: Update Next.js configuration
      await this.updateNextConfig();
      
      // Step 4: Create Nginx configuration
      await this.createNginxConfig();
      
      // Step 5: Create PM2 ecosystem file
      await this.createPM2Config();
      
      // Step 6: Create deployment scripts
      await this.createDeploymentScripts();
      
      // Step 7: Set up SSL certificates
      await this.setupSSL();
      
      console.log('✅ Production setup completed successfully!');
      this.printSetupInfo();
      
    } catch (error) {
      console.error('❌ Production setup failed:', error.message);
      process.exit(1);
    }
  }

  async validateEnvironment() {
    console.log('🔍 Validating environment...');
    
    // Check if required files exist
    const requiredFiles = [
      'package.json',
      'next.config.js',
      'tsconfig.json',
      'tailwind.config.js'
    ];
    
    for (const file of requiredFiles) {
      if (!fs.existsSync(path.join(this.rootDir, file))) {
        throw new Error(`Required file missing: ${file}`);
      }
    }
    
    // Check Node.js version
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    
    if (majorVersion < 18) {
      throw new Error('Node.js 18 or higher is required');
    }
    
    console.log('✅ Environment validation passed');
  }

  async createProductionEnv() {
    console.log('📝 Creating production environment file...');
    
    const envContent = `# Production Environment Configuration
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://api.${this.config.domain}
NEXTAUTH_URL=https://${this.config.domain}
NEXTAUTH_SECRET=${this.generateSecret(32)}

# Database - Production PostgreSQL
DATABASE_URL="postgresql://ehb_user:secure_password@ehb-db.cluster.amazonaws.com:5432/ehb_platform"

# AWS Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=ehb-platform-assets
AWS_CLOUDFRONT_DISTRIBUTION_ID=your-cloudfront-distribution-id

# Redis Configuration
REDIS_URL=redis://ehb-redis.amazonaws.com:6379

# Email Service
EMAIL_PROVIDER=resend
RESEND_API_KEY=your-resend-api-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
JWT_SECRET=${this.generateSecret(32)}
ENCRYPTION_KEY=${this.generateSecret(32)}

# Monitoring
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=info

# External Services
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
OPENAI_API_KEY=your-openai-api-key

# Performance
NEXT_TELEMETRY_DISABLED=1
COMPRESSION_ENABLED=true
CACHE_ENABLED=true

# CORS
CORS_ORIGIN=https://${this.config.domain},https://admin.${this.config.domain},https://portal.${this.config.domain}

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
`;
    
    const envPath = path.join(this.rootDir, '.env.production');
    fs.writeFileSync(envPath, envContent);
    
    console.log('✅ Production environment file created');
  }

  async updateNextConfig() {
    console.log('⚙️ Updating Next.js configuration...');
    
    const nextConfigPath = path.join(this.rootDir, 'next.config.js');
    const nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },

  images: {
    domains: ['localhost', '${this.config.domain}', 'admin.${this.config.domain}', 'portal.${this.config.domain}'],
    formats: ['image/webp', 'image/avif'],
  },

  compress: true,
  
  output: 'standalone',

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.${this.config.domain}/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
`;
    
    fs.writeFileSync(nextConfigPath, nextConfigContent);
    
    console.log('✅ Next.js configuration updated');
  }

  async createNginxConfig() {
    console.log('🌐 Creating Nginx configuration...');
    
    const nginxDir = path.join(this.rootDir, 'nginx');
    if (!fs.existsSync(nginxDir)) {
      fs.mkdirSync(nginxDir, { recursive: true });
    }
    
    const nginxConfig = `events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }
    
    upstream backend {
        server backend:5000;
    }
    
    upstream admin {
        server admin-panel:3000;
    }
    
    upstream portal {
        server dev-portal:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general:10m rate=30r/s;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Frontend
    server {
        listen 80;
        server_name ${this.config.domain};
        
        location / {
            limit_req zone=general burst=20 nodelay;
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # Backend API
    server {
        listen 80;
        server_name api.${this.config.domain};
        
        location / {
            limit_req zone=api burst=10 nodelay;
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # Admin Panel
    server {
        listen 80;
        server_name admin.${this.config.domain};
        
        location / {
            limit_req zone=general burst=20 nodelay;
            proxy_pass http://admin;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }

    # Development Portal
    server {
        listen 80;
        server_name portal.${this.config.domain};
        
        location / {
            limit_req zone=general burst=20 nodelay;
            proxy_pass http://portal;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}`;
    
    const nginxPath = path.join(nginxDir, 'nginx.conf');
    fs.writeFileSync(nginxPath, nginxConfig);
    
    console.log('✅ Nginx configuration created');
  }

  async createPM2Config() {
    console.log('📊 Creating PM2 configuration...');
    
    const pm2Config = `module.exports = {
  apps: [
    {
      name: 'ehb-frontend',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/frontend-err.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs']
    },
    {
      name: 'ehb-backend',
      script: 'node',
      args: 'ehb-backend/index.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './logs/backend-err.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true,
      max_memory_restart: '1G',
      min_uptime: '10s',
      max_restarts: 10,
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'logs']
    }
  ]
};`;
    
    const pm2Path = path.join(this.rootDir, 'ecosystem.config.js');
    fs.writeFileSync(pm2Path, pm2Config);
    
    console.log('✅ PM2 configuration created');
  }

  async createDeploymentScripts() {
    console.log('📜 Creating deployment scripts...');
    
    const scriptsDir = path.join(this.rootDir, 'scripts');
    if (!fs.existsSync(scriptsDir)) {
      fs.mkdirSync(scriptsDir, { recursive: true });
    }
    
    // Create logs directory
    const logsDir = path.join(this.rootDir, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    // Deployment script
    const deployScript = `#!/bin/bash

echo "🚀 Deploying EHB Platform..."

# Build the application
echo "📦 Building application..."
npm run build

# Start services with PM2
echo "🔄 Starting services..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

echo "✅ Deployment completed!"
echo "📊 Check status: pm2 status"
echo "📋 View logs: pm2 logs"`;
    
    const deployPath = path.join(scriptsDir, 'deploy.sh');
    fs.writeFileSync(deployPath, deployScript);
    fs.chmodSync(deployPath, '755');
    
    console.log('✅ Deployment scripts created');
  }

  async setupSSL() {
    console.log('🔒 Setting up SSL certificates...');
    
    const sslDir = path.join(this.rootDir, 'nginx', 'ssl');
    if (!fs.existsSync(sslDir)) {
      fs.mkdirSync(sslDir, { recursive: true });
    }
    
    console.log('📝 SSL directory created');
    console.log('ℹ️ To enable SSL, run: certbot --nginx -d ${this.config.domain} -d api.${this.config.domain} -d admin.${this.config.domain} -d portal.${this.config.domain}');
  }

  generateSecret(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  printSetupInfo() {
    console.log('\n🎉 Production Setup Summary:');
    console.log('============================');
    console.log(`Domain: ${this.config.domain}`);
    console.log(`Frontend: https://${this.config.domain}`);
    console.log(`Backend API: https://api.${this.config.domain}`);
    console.log(`Admin Panel: https://admin.${this.config.domain}`);
    console.log(`Dev Portal: https://portal.${this.config.domain}`);
    console.log('\n📋 Next Steps:');
    console.log('1. Update .env.production with your actual values');
    console.log('2. Configure your domain DNS records');
    console.log('3. Set up SSL certificates with Certbot');
    console.log('4. Deploy with: npm run deploy:production');
    console.log('\n📊 Monitor your deployment:');
    console.log('- PM2: pm2 status');
    console.log('- Logs: pm2 logs');
    console.log('- Health: curl https://api.${this.config.domain}/health');
  }
}

// Run setup
if (require.main === module) {
  const setup = new ProductionSetup();
  setup.setup().catch(console.error);
}

module.exports = ProductionSetup; 