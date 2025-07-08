# EHB Deployment Guide

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- MongoDB instance
- Vercel account (for hosting)

## Environment Setup

### 1. Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL="mongodb://localhost:27017/ehb"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# External Services
REDIS_URL="redis://localhost:6379"
SENDGRID_API_KEY="your-sendgrid-key"

# Environment
NODE_ENV="production"
```

### 2. Database Setup

```bash
# Run database migrations
npx prisma migrate deploy

# Seed the database
npx prisma db seed
```

### 3. Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test the build
npm start
```

## Deployment Options

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker

```bash
# Build Docker image
docker build -t ehb-app .

# Run container
docker run -p 3000:3000 ehb-app
```

### Manual Deployment

1. Build the application
2. Upload files to your server
3. Install dependencies
4. Start the application with PM2 or similar

## Monitoring

### Health Checks

- Endpoint: `/api/health-check`
- Frequency: Every 30 seconds
- Alert on: Non-200 response

### Logs

- Application logs: `logs/app.log`
- Error logs: `logs/error.log`
- Performance logs: `logs/performance.log`

### Metrics

- Response time
- Error rate
- Memory usage
- Database connections

## Security Checklist

- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] Rate limiting configured
- [ ] Input validation implemented
- [ ] Authentication required
- [ ] CORS configured
- [ ] Database secured

## Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check DATABASE_URL
   - Verify MongoDB is running

2. **Authentication errors**
   - Verify NEXTAUTH_SECRET
   - Check NEXTAUTH_URL

3. **Build failures**
   - Clear node_modules and reinstall
   - Check for TypeScript errors

### Support

For deployment issues, check:

- Application logs
- Vercel deployment logs
- Database logs
- Network connectivity
