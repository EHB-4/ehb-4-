# EHB Platform - Production Deployment Guide

This guide provides comprehensive instructions for deploying the EHB Platform to production environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Deployment Methods](#deployment-methods)
5. [Monitoring & Health Checks](#monitoring--health-checks)
6. [Security Considerations](#security-considerations)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **PostgreSQL**: 15.x or higher
- **Redis**: 7.x or higher
- **Docker**: 20.x or higher (optional)
- **PM2**: Latest version (optional)

### Server Requirements

- **CPU**: 2+ cores
- **RAM**: 4GB+ (8GB recommended)
- **Storage**: 50GB+ SSD
- **Network**: Stable internet connection

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ehb-platform/nextjs-app.git
cd nextjs-app
```

### 2. Install Dependencies

```bash
npm ci --production
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
cp env.production.example .env.local
```

Edit `.env.local` with your production values:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ehb_platform"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Email
RESEND_API_KEY="your-resend-api-key"

# Redis
REDIS_URL="redis://localhost:6379"
```

## Database Setup

### PostgreSQL Installation

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### CentOS/RHEL

```bash
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Database Configuration

1. **Create Database User**

```bash
sudo -u postgres psql
CREATE USER ehb_user WITH PASSWORD 'secure_password';
CREATE DATABASE ehb_platform OWNER ehb_user;
GRANT ALL PRIVILEGES ON DATABASE ehb_platform TO ehb_user;
\q
```

2. **Run Migrations**

```bash
npx prisma generate
npx prisma db push
```

3. **Seed Database (Optional)**

```bash
npm run db:seed
```

## Deployment Methods

### Method 1: Docker Deployment (Recommended)

#### 1. Build and Deploy

```bash
# Build the application
npm run build

# Deploy with Docker Compose
docker-compose up -d
```

#### 2. Verify Deployment

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f app
```

#### 3. Health Check

```bash
curl http://localhost:3000/health
```

### Method 2: PM2 Deployment

#### 1. Install PM2

```bash
npm install -g pm2
```

#### 2. Build Application

```bash
npm run build
```

#### 3. Deploy with PM2

```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

#### 4. Monitor Application

```bash
pm2 status
pm2 logs ehb-platform
```

### Method 3: Manual Deployment

#### 1. Build Application

```bash
npm run build
```

#### 2. Start Application

```bash
npm start
```

#### 3. Use Process Manager (Optional)

```bash
# Using systemd
sudo systemctl start ehb-platform
sudo systemctl enable ehb-platform
```

## Monitoring & Health Checks

### Health Check Script

Run the built-in health check:

```bash
node scripts/health-check.js
```

### Monitoring Setup

#### 1. PM2 Monitoring

```bash
pm2 monit
```

#### 2. Application Metrics

```bash
# View application metrics
curl http://localhost:3000/api/health

# View system metrics
curl http://localhost:3000/api/metrics
```

#### 3. Log Monitoring

```bash
# View application logs
tail -f logs/app.log

# View error logs
tail -f logs/error.log
```

### Automated Health Checks

Set up cron jobs for automated monitoring:

```bash
# Add to crontab
*/5 * * * * cd /path/to/app && node scripts/health-check.js >> logs/health.log 2>&1
```

## Security Considerations

### 1. Environment Variables

- Never commit `.env.local` to version control
- Use strong, unique passwords
- Rotate secrets regularly
- Use environment-specific configurations

### 2. Database Security

```sql
-- Create read-only user for analytics
CREATE USER ehb_readonly WITH PASSWORD 'readonly_password';
GRANT CONNECT ON DATABASE ehb_platform TO ehb_readonly;
GRANT USAGE ON SCHEMA public TO ehb_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO ehb_readonly;
```

### 3. Network Security

- Configure firewall rules
- Use HTTPS only
- Implement rate limiting
- Set up WAF (Web Application Firewall)

### 4. Application Security

```bash
# Security audit
npm audit

# Fix vulnerabilities
npm audit fix
```

## Performance Optimization

### 1. Database Optimization

```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_analytics_date ON analytics(created_at);
```

### 2. Caching Strategy

```bash
# Redis configuration
redis-cli config set maxmemory 256mb
redis-cli config set maxmemory-policy allkeys-lru
```

### 3. CDN Setup

Configure CDN for static assets:

```bash
# Upload static files to CDN
aws s3 sync .next/static s3://your-cdn-bucket/static
```

### 4. Load Balancing

Set up load balancer configuration:

```nginx
upstream ehb_backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
    server 127.0.0.1:3002;
}
```

## SSL/TLS Configuration

### 1. Let's Encrypt Setup

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d ehb-platform.com -d www.ehb-platform.com
```

### 2. Auto-renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Add to crontab
0 12 * * * /usr/bin/certbot renew --quiet
```

## Backup Strategy

### 1. Database Backups

```bash
# Create backup script
#!/bin/bash
BACKUP_DIR="/var/backups/ehb-platform"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump ehb_platform > $BACKUP_DIR/db_backup_$DATE.sql

# Add to crontab (daily backup)
0 2 * * * /path/to/backup-script.sh
```

### 2. Application Backups

```bash
# Backup application files
tar -czf /var/backups/ehb-platform/app_backup_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/ehb-platform
```

## Troubleshooting

### Common Issues

#### 1. Application Won't Start

```bash
# Check logs
pm2 logs ehb-platform

# Check port availability
netstat -tulpn | grep :3000

# Check environment variables
node -e "console.log(process.env.NODE_ENV)"
```

#### 2. Database Connection Issues

```bash
# Test database connection
psql $DATABASE_URL -c "SELECT 1"

# Check PostgreSQL status
sudo systemctl status postgresql
```

#### 3. Memory Issues

```bash
# Check memory usage
free -h

# Check Node.js memory
node --max-old-space-size=4096 scripts/start.js
```

#### 4. Performance Issues

```bash
# Check CPU usage
top

# Check disk usage
df -h

# Check network connections
netstat -an | grep :3000
```

### Debug Mode

Enable debug mode for troubleshooting:

```bash
# Set debug environment variable
export DEBUG=ehb-platform:*

# Start application in debug mode
npm run dev
```

## Maintenance

### Regular Maintenance Tasks

1. **Weekly**
   - Review application logs
   - Check disk space
   - Update dependencies

2. **Monthly**
   - Security updates
   - Performance review
   - Backup verification

3. **Quarterly**
   - SSL certificate renewal
   - Database optimization
   - Infrastructure review

### Update Procedures

```bash
# 1. Create backup
npm run backup

# 2. Pull latest code
git pull origin main

# 3. Install dependencies
npm ci --production

# 4. Run migrations
npx prisma db push

# 5. Build application
npm run build

# 6. Restart application
pm2 restart ehb-platform
```

## Support

For additional support:

- **Documentation**: [docs.ehb-platform.com](https://docs.ehb-platform.com)
- **Issues**: [GitHub Issues](https://github.com/ehb-platform/nextjs-app/issues)
- **Discord**: [EHB Community](https://discord.gg/ehb-platform)

---

**Last Updated**: December 2024
**Version**: 1.0.0
