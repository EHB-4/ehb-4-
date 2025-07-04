# JPS System Production Deployment Guide

## Roman Urdu: JPS System Production Deployment Guide
Complete guide for deploying JPS (Job Placement System) to production environment.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Application Deployment](#application-deployment)
5. [Security Configuration](#security-configuration)
6. [Monitoring Setup](#monitoring-setup)
7. [Performance Optimization](#performance-optimization)
8. [Backup Strategy](#backup-strategy)
9. [Troubleshooting](#troubleshooting)
10. [Maintenance](#maintenance)

## Prerequisites

### Required Tools
- Node.js 18+ 
- npm 9+
- Git
- Vercel CLI
- PostgreSQL database
- Domain name (optional)

### Required Accounts
- Vercel account
- Database provider (Supabase, PlanetScale, etc.)
- Email service (SendGrid, AWS SES)
- SMS service (Twilio)
- Payment gateway (Stripe)
- Monitoring service (Sentry)

## Environment Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd jps-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create `.env.production` file:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Next.js
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key"

# AI Services
ANTHROPIC_API_KEY="your-anthropic-key"
PERPLEXITY_API_KEY="your-perplexity-key"
OPENAI_API_KEY="your-openai-key"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# SMS
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Payments
STRIPE_SECRET_KEY="your-stripe-secret"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable"

# Monitoring
SENTRY_DSN="your-sentry-dsn"
LOGTAIL_TOKEN="your-logtail-token"

# Security
JWT_SECRET="your-jwt-secret"
ENCRYPTION_KEY="your-encryption-key"

# Performance
REDIS_URL="redis://localhost:6379"
UPSTASH_REDIS_URL="your-upstash-redis-url"
```

## Database Configuration

### 1. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

### 2. Database Backup
```bash
# Create backup
npx prisma db pull --print > backup_$(date +%Y%m%d).sql

# Restore backup
npx prisma db push --force-reset
```

### 3. Database Monitoring
```sql
-- Check database health
SELECT 
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats 
WHERE schemaname = 'public';

-- Check slow queries
SELECT 
  query,
  calls,
  total_time,
  mean_time
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;
```

## Application Deployment

### 1. Build Application
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm run test:ci

# Build
npm run build
```

### 2. Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod --confirm
```

### 3. Custom Domain Setup
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings > Domains
4. Add your custom domain
5. Configure DNS records

### 4. SSL Configuration
Vercel automatically provides SSL certificates for all domains.

## Security Configuration

### 1. Environment Variables Security
- Never commit `.env` files to Git
- Use Vercel's environment variable management
- Rotate secrets regularly
- Use strong, unique passwords

### 2. API Security
```typescript
// Rate limiting middleware
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 3. CORS Configuration
```typescript
// CORS setup
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['https://your-domain.com'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### 4. Content Security Policy
```typescript
// CSP headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  next();
});
```

## Monitoring Setup

### 1. Error Tracking (Sentry)
```typescript
// Sentry configuration
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 2. Logging (Logtail)
```typescript
// Logtail configuration
import { Logtail } from '@logtail/node';

const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

export const logger = {
  info: (message: string, data?: any) => logtail.info(message, data),
  error: (message: string, error?: any) => logtail.error(message, error),
  warn: (message: string, data?: any) => logtail.warn(message, data),
};
```

### 3. Health Check Endpoint
```typescript
// Health check API
export async function GET() {
  try {
    // Database check
    await prisma.$queryRaw`SELECT 1`;
    
    // Get stats
    const stats = await prisma.$transaction([
      prisma.job.count(),
      prisma.candidate.count(),
      prisma.placement.count()
    ]);
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      stats: {
        jobs: stats[0],
        candidates: stats[1],
        placements: stats[2]
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
```

### 4. Performance Monitoring
```typescript
// Performance monitoring
import { performance } from 'perf_hooks';

export function withPerformanceMonitoring(handler: Function) {
  return async (req: Request, res: Response) => {
    const start = performance.now();
    
    try {
      const result = await handler(req, res);
      const duration = performance.now() - start;
      
      logger.info('API Performance', {
        endpoint: req.url,
        method: req.method,
        duration: `${duration.toFixed(2)}ms`
      });
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      
      logger.error('API Error', {
        endpoint: req.url,
        method: req.method,
        duration: `${duration.toFixed(2)}ms`,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      
      throw error;
    }
  };
}
```

## Performance Optimization

### 1. Image Optimization
```typescript
// Next.js Image optimization
import Image from 'next/image';

export function OptimizedImage({ src, alt, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      {...props}
    />
  );
}
```

### 2. Code Splitting
```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});
```

### 3. Caching Strategy
```typescript
// API response caching
export async function GET() {
  const cacheKey = 'jobs-list';
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }
  
  const jobs = await prisma.job.findMany();
  await redis.setex(cacheKey, 300, JSON.stringify(jobs)); // 5 minutes cache
  
  return NextResponse.json(jobs);
}
```

### 4. Bundle Analysis
```bash
# Analyze bundle size
npm run build:analyze

# Check bundle size
npm run build:size
```

## Backup Strategy

### 1. Database Backup
```bash
#!/bin/bash
# backup-database.sh

BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/jps_backup_$DATE.json"

mkdir -p "$BACKUP_DIR"

# Export database
npx prisma db pull --print > "$BACKUP_FILE"

echo "Backup created: $BACKUP_FILE"
```

### 2. Automated Backups
```bash
# Setup daily backup cron job
(crontab -l 2>/dev/null; echo "0 2 * * * cd /path/to/jps && ./scripts/backup-database.sh") | crontab -
```

### 3. Backup Verification
```bash
# Verify backup integrity
npx prisma validate --schema=backup_schema.prisma
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues
```bash
# Check database connection
npx prisma db pull

# Reset database
npx prisma migrate reset

# Check database logs
docker logs postgres-container
```

#### 2. Build Failures
```bash
# Clear cache
rm -rf .next
rm -rf node_modules/.cache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 3. Environment Variables
```bash
# Check environment variables
vercel env ls

# Set environment variable
vercel env add DATABASE_URL
```

#### 4. Performance Issues
```bash
# Check bundle size
npm run build:analyze

# Check database queries
npx prisma studio

# Monitor memory usage
node --inspect npm run dev
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Check Prisma logs
DEBUG=prisma:* npm run dev
```

## Maintenance

### 1. Regular Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Update Prisma
npx prisma update
```

### 2. Database Maintenance
```sql
-- Vacuum database
VACUUM ANALYZE;

-- Check for dead tuples
SELECT schemaname, tablename, n_dead_tup, n_live_tup 
FROM pg_stat_user_tables;

-- Reindex tables
REINDEX TABLE jobs;
REINDEX TABLE candidates;
REINDEX TABLE placements;
```

### 3. Log Rotation
```bash
# Rotate logs
logrotate /etc/logrotate.d/jps-system
```

### 4. Performance Monitoring
```bash
# Monitor system resources
htop
iotop
nethogs

# Monitor application
pm2 monit
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Security audit completed
- [ ] Performance benchmarks met
- [ ] Database migrations ready
- [ ] Environment variables configured
- [ ] SSL certificates valid
- [ ] Domain DNS configured

### Post-Deployment
- [ ] Health check endpoint responding
- [ ] Database connection working
- [ ] Email/SMS services tested
- [ ] Payment gateway configured
- [ ] Monitoring alerts set up
- [ ] Backup strategy verified
- [ ] Performance metrics normal

### Ongoing Maintenance
- [ ] Weekly security updates
- [ ] Monthly performance review
- [ ] Quarterly backup verification
- [ ] Annual security audit
- [ ] Regular dependency updates

## Support and Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

### Monitoring Tools
- [Sentry](https://sentry.io) - Error tracking
- [Logtail](https://logtail.com) - Log management
- [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring

### Security Tools
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Security vulnerabilities
- [OWASP ZAP](https://owasp.org/www-project-zap/) - Security testing
- [Snyk](https://snyk.io) - Dependency scanning

---

**Note**: This guide assumes you have basic knowledge of Node.js, Next.js, and database management. For production deployments, always follow security best practices and consult with your DevOps team. 