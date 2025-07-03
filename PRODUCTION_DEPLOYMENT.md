# 🚀 GoSellr Production Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying GoSellr e-commerce platform to production.

## Prerequisites

### System Requirements

- **Node.js**: 18.x or higher
- **Database**: PostgreSQL 15+ or MongoDB 6+
- **Redis**: 7.x for caching and sessions
- **Nginx**: For reverse proxy and SSL termination
- **SSL Certificate**: For HTTPS

### Server Requirements

- **CPU**: 2+ cores
- **RAM**: 4GB+
- **Storage**: 50GB+ SSD
- **OS**: Ubuntu 20.04+ or CentOS 8+

## 🛠️ Deployment Options

### Option 1: Traditional Server Deployment

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Install Redis
sudo apt install redis-server -y

# Install Nginx
sudo apt install nginx -y

# Install PM2
sudo npm install -g pm2
```

#### 2. Application Deployment

```bash
# Clone repository
git clone https://github.com/your-username/gosellr.git
cd gosellr

# Install dependencies
npm ci --production

# Set environment variables
cp .env.example .env.production
# Edit .env.production with your production values

# Build application
npm run build

# Start with PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### Option 2: Docker Deployment

#### 1. Install Docker & Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 2. Deploy with Docker

```bash
# Set environment variables
cp .env.example .env.production
# Edit .env.production

# Build and start services
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps
```

### Option 3: Cloud Platform Deployment

#### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### AWS Deployment

```bash
# Using AWS Elastic Beanstalk
eb init gosellr
eb create gosellr-production
eb deploy
```

## 🔧 Configuration

### Environment Variables

Create `.env.production` with the following:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/gosellr

# Authentication
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key

# Payment Processing
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Email
SENDGRID_API_KEY=your-sendgrid-key
EMAIL_FROM=noreply@your-domain.com

# File Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=your-bucket-name

# Analytics
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

### Database Setup

```sql
-- PostgreSQL
CREATE DATABASE gosellr;
CREATE USER gosellr_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE gosellr TO gosellr_user;

-- Run migrations
npm run db:migrate
```

### SSL Certificate

```bash
# Using Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## 📊 Monitoring & Maintenance

### Health Checks

```bash
# Application health
curl https://your-domain.com/api/health

# Database health
npm run health-check

# System monitoring
pm2 monit
```

### Logs

```bash
# Application logs
pm2 logs gosellr

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Database logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

### Backup Strategy

```bash
# Database backup
pg_dump gosellr > backup_$(date +%Y%m%d_%H%M%S).sql

# Application backup
tar -czf gosellr_backup_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/gosellr
```

## 🔒 Security Checklist

- [ ] SSL certificate installed
- [ ] Environment variables secured
- [ ] Database password strong
- [ ] Firewall configured
- [ ] Rate limiting enabled
- [ ] Security headers set
- [ ] Regular backups scheduled
- [ ] Monitoring alerts configured
- [ ] Access logs enabled
- [ ] Error tracking setup

## 🚀 Performance Optimization

### Caching

```bash
# Redis configuration
sudo nano /etc/redis/redis.conf
# Set maxmemory 256mb
# Set maxmemory-policy allkeys-lru
```

### CDN Setup

- Configure Cloudflare or AWS CloudFront
- Set up image optimization
- Enable compression

### Database Optimization

```sql
-- Create indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
```

## 📈 Scaling

### Horizontal Scaling

```bash
# Add more PM2 instances
pm2 scale gosellr 4

# Load balancer configuration
# Use Nginx upstream with multiple servers
```

### Database Scaling

- Set up read replicas
- Implement connection pooling
- Use database sharding for large datasets

## 🔄 Updates & Maintenance

### Application Updates

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm ci --production

# Build application
npm run build

# Restart application
pm2 reload gosellr
```

### Database Migrations

```bash
# Run migrations
npm run db:migrate

# Verify migration status
npx prisma migrate status
```

## 🆘 Troubleshooting

### Common Issues

#### Application Won't Start

```bash
# Check logs
pm2 logs gosellr

# Check environment variables
pm2 env gosellr

# Restart application
pm2 restart gosellr
```

#### Database Connection Issues

```bash
# Test database connection
psql -h localhost -U gosellr_user -d gosellr

# Check PostgreSQL status
sudo systemctl status postgresql
```

#### Performance Issues

```bash
# Check system resources
htop

# Check application performance
pm2 monit

# Analyze slow queries
# Enable PostgreSQL slow query log
```

## 📞 Support

For deployment support:

- Check logs for error messages
- Verify environment variables
- Test database connectivity
- Review security configuration

## 🎉 Success Metrics

After deployment, verify:

- [ ] Application loads without errors
- [ ] Database connections work
- [ ] User registration/login functions
- [ ] Product catalog displays
- [ ] Payment processing works
- [ ] Email notifications send
- [ ] Analytics tracking works
- [ ] Mobile responsiveness
- [ ] Performance meets requirements

---

**GoSellr is now ready for production! 🚀**
