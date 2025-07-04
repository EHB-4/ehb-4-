#!/bin/bash

# Roman Urdu: JPS System Production Deployment Script
# Complete production deployment with database, environment, aur monitoring

set -e

# Roman Urdu: Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Roman Urdu: Configuration
PROJECT_NAME="jps-system"
DEPLOYMENT_ENV="production"
DATABASE_PROVIDER="postgresql"
REGION="us-east-1"

# Roman Urdu: Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Roman Urdu: Check prerequisites
check_prerequisites() {
    log_info "Checking deployment prerequisites..."
    
    # Roman Urdu: Check required tools
    local missing_tools=()
    
    if ! command -v node &> /dev/null; then
        missing_tools+=("Node.js")
    fi
    
    if ! command -v npm &> /dev/null; then
        missing_tools+=("npm")
    fi
    
    if ! command -v git &> /dev/null; then
        missing_tools+=("git")
    fi
    
    if ! command -v vercel &> /dev/null; then
        missing_tools+=("Vercel CLI")
    fi
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        log_error "Missing required tools: ${missing_tools[*]}"
        log_info "Please install missing tools and try again"
        exit 1
    fi
    
    log_success "All prerequisites are installed"
}

# Roman Urdu: Environment setup
setup_environment() {
    log_info "Setting up production environment..."
    
    # Roman Urdu: Create production environment file
    cat > .env.production << EOF
# Roman Urdu: Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# Roman Urdu: Next.js Configuration
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key"

# Roman Urdu: API Keys
ANTHROPIC_API_KEY="your-anthropic-key"
PERPLEXITY_API_KEY="your-perplexity-key"
OPENAI_API_KEY="your-openai-key"

# Roman Urdu: Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Roman Urdu: SMS Configuration
TWILIO_ACCOUNT_SID="your-twilio-sid"
TWILIO_AUTH_TOKEN="your-twilio-token"
TWILIO_PHONE_NUMBER="+1234567890"

# Roman Urdu: Payment Configuration
STRIPE_SECRET_KEY="your-stripe-secret"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable"

# Roman Urdu: Monitoring
SENTRY_DSN="your-sentry-dsn"
LOGTAIL_TOKEN="your-logtail-token"

# Roman Urdu: Security
JWT_SECRET="your-jwt-secret"
ENCRYPTION_KEY="your-encryption-key"

# Roman Urdu: Performance
REDIS_URL="redis://localhost:6379"
UPSTASH_REDIS_URL="your-upstash-redis-url"
EOF
    
    log_success "Production environment file created"
}

# Roman Urdu: Database setup
setup_database() {
    log_info "Setting up production database..."
    
    # Roman Urdu: Check if database URL is provided
    if [ -z "$DATABASE_URL" ]; then
        log_warning "DATABASE_URL not provided, using local database"
        DATABASE_URL="postgresql://localhost:5432/jps_production"
    fi
    
    # Roman Urdu: Install Prisma CLI
    npm install -g prisma
    
    # Roman Urdu: Generate Prisma client
    npx prisma generate
    
    # Roman Urdu: Run database migrations
    npx prisma migrate deploy
    
    # Roman Urdu: Seed database with initial data
    npx prisma db seed
    
    log_success "Database setup completed"
}

# Roman Urdu: Build application
build_application() {
    log_info "Building JPS application..."
    
    # Roman Urdu: Install dependencies
    npm ci --only=production
    
    # Roman Urdu: Run type checking
    npm run type-check
    
    # Roman Urdu: Run linting
    npm run lint
    
    # Roman Urdu: Run tests
    npm run test:ci
    
    # Roman Urdu: Build application
    npm run build
    
    log_success "Application build completed"
}

# Roman Urdu: Security checks
run_security_checks() {
    log_info "Running security checks..."
    
    # Roman Urdu: Check for vulnerabilities
    if npm audit --audit-level moderate; then
        log_success "Security audit passed"
    else
        log_warning "Security vulnerabilities found"
        log_info "Consider running: npm audit fix"
    fi
    
    # Roman Urdu: Check for secrets in code
    if grep -r "password\|secret\|key" . --exclude-dir=node_modules --exclude-dir=.git | grep -v ".env"; then
        log_warning "Potential secrets found in code"
    else
        log_success "No secrets found in code"
    fi
    
    # Roman Urdu: Check SSL configuration
    log_info "SSL configuration will be handled by Vercel"
}

# Roman Urdu: Performance optimization
optimize_performance() {
    log_info "Optimizing application performance..."
    
    # Roman Urdu: Bundle analysis
    npm run build:analyze
    
    # Roman Urdu: Image optimization
    npm run optimize-images
    
    # Roman Urdu: Generate sitemap
    npm run generate-sitemap
    
    # Roman Urdu: Generate robots.txt
    cat > public/robots.txt << EOF
User-agent: *
Allow: /

Sitemap: https://your-domain.vercel.app/sitemap.xml
EOF
    
    log_success "Performance optimization completed"
}

# Roman Urdu: Deploy to Vercel
deploy_to_vercel() {
    log_info "Deploying to Vercel..."
    
    # Roman Urdu: Check if already logged in to Vercel
    if ! vercel whoami &> /dev/null; then
        log_info "Please login to Vercel"
        vercel login
    fi
    
    # Roman Urdu: Deploy to production
    vercel --prod --confirm
    
    log_success "Deployment to Vercel completed"
}

# Roman Urdu: Setup monitoring
setup_monitoring() {
    log_info "Setting up monitoring and analytics..."
    
    # Roman Urdu: Setup Sentry for error tracking
    if [ -n "$SENTRY_DSN" ]; then
        log_info "Sentry DSN found, error tracking will be enabled"
    fi
    
    # Roman Urdu: Setup Logtail for logging
    if [ -n "$LOGTAIL_TOKEN" ]; then
        log_info "Logtail token found, logging will be enabled"
    fi
    
    # Roman Urdu: Setup health check endpoint
    cat > app/api/health/route.ts << 'EOF'
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';

export async function GET() {
  try {
    // Roman Urdu: Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Roman Urdu: Get basic stats
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
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
EOF
    
    log_success "Monitoring setup completed"
}

# Roman Urdu: Setup CI/CD
setup_cicd() {
    log_info "Setting up CI/CD pipeline..."
    
    # Roman Urdu: Create GitHub Actions workflow
    mkdir -p .github/workflows
    
    cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy JPS System

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run type checking
      run: npm run type-check
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Build application
      run: npm run build
    
    - name: Run security audit
      run: npm audit --audit-level moderate

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
EOF
    
    log_success "CI/CD pipeline setup completed"
}

# Roman Urdu: Post-deployment verification
verify_deployment() {
    log_info "Verifying deployment..."
    
    # Roman Urdu: Get deployment URL
    DEPLOYMENT_URL=$(vercel ls | grep "$PROJECT_NAME" | grep "https://" | head -1 | awk '{print $2}')
    
    if [ -z "$DEPLOYMENT_URL" ]; then
        log_error "Could not find deployment URL"
        return 1
    fi
    
    log_info "Deployment URL: $DEPLOYMENT_URL"
    
    # Roman Urdu: Check health endpoint
    if curl -f "$DEPLOYMENT_URL/api/health" > /dev/null 2>&1; then
        log_success "Health check passed"
    else
        log_error "Health check failed"
        return 1
    fi
    
    # Roman Urdu: Check main page
    if curl -f "$DEPLOYMENT_URL" > /dev/null 2>&1; then
        log_success "Main page is accessible"
    else
        log_error "Main page is not accessible"
        return 1
    fi
    
    log_success "Deployment verification completed"
}

# Roman Urdu: Setup backup strategy
setup_backup_strategy() {
    log_info "Setting up backup strategy..."
    
    # Roman Urdu: Create backup script
    cat > scripts/backup-database.sh << 'EOF'
#!/bin/bash

# Roman Urdu: Database backup script
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/jps_backup_$DATE.json"

mkdir -p "$BACKUP_DIR"

# Roman Urdu: Export database
npx prisma db pull --print > "$BACKUP_FILE"

echo "Backup created: $BACKUP_FILE"
EOF
    
    chmod +x scripts/backup-database.sh
    
    # Roman Urdu: Create automated backup cron job
    cat > scripts/setup-backup-cron.sh << 'EOF'
#!/bin/bash

# Roman Urdu: Setup daily backup cron job
(crontab -l 2>/dev/null; echo "0 2 * * * cd $(pwd) && ./scripts/backup-database.sh") | crontab -

echo "Daily backup cron job setup completed"
EOF
    
    chmod +x scripts/setup-backup-cron.sh
    
    log_success "Backup strategy setup completed"
}

# Roman Urdu: Generate deployment report
generate_deployment_report() {
    log_info "Generating deployment report..."
    
    cat > deployment-report.md << EOF
# JPS System Deployment Report

## Deployment Summary
- **Project**: $PROJECT_NAME
- **Environment**: $DEPLOYMENT_ENV
- **Deployment Date**: $(date)
- **Database**: $DATABASE_PROVIDER
- **Region**: $REGION

## Deployment Steps Completed
- ✅ Prerequisites check
- ✅ Environment setup
- ✅ Database setup
- ✅ Application build
- ✅ Security checks
- ✅ Performance optimization
- ✅ Vercel deployment
- ✅ Monitoring setup
- ✅ CI/CD pipeline
- ✅ Deployment verification
- ✅ Backup strategy

## Next Steps
1. Configure custom domain in Vercel
2. Set up SSL certificates
3. Configure monitoring alerts
4. Set up user authentication
5. Configure email/SMS services
6. Set up payment gateway
7. Configure backup automation

## Important URLs
- **Application**: https://your-domain.vercel.app
- **Health Check**: https://your-domain.vercel.app/api/health
- **Vercel Dashboard**: https://vercel.com/dashboard

## Environment Variables
Make sure to configure all required environment variables in Vercel dashboard.

## Monitoring
- Error tracking: Sentry
- Logging: Logtail
- Performance: Vercel Analytics

## Support
For issues or questions, contact the development team.
EOF
    
    log_success "Deployment report generated: deployment-report.md"
}

# Roman Urdu: Main deployment function
main() {
    log_info "Starting JPS System Production Deployment"
    log_info "=========================================="
    
    # Roman Urdu: Set up error handling
    trap 'log_error "Deployment failed. Please check the logs above."; exit 1' ERR
    
    # Roman Urdu: Run deployment steps
    check_prerequisites
    setup_environment
    setup_database
    build_application
    run_security_checks
    optimize_performance
    deploy_to_vercel
    setup_monitoring
    setup_cicd
    verify_deployment
    setup_backup_strategy
    generate_deployment_report
    
    log_success "JPS System Production Deployment Completed Successfully!"
    log_info "Deployment report: deployment-report.md"
    log_info "Next steps: Configure custom domain and set up monitoring alerts"
}

# Roman Urdu: Parse command line arguments
case "${1:-all}" in
    "check")
        check_prerequisites
        ;;
    "env")
        setup_environment
        ;;
    "db")
        setup_database
        ;;
    "build")
        build_application
        ;;
    "security")
        run_security_checks
        ;;
    "deploy")
        deploy_to_vercel
        ;;
    "verify")
        verify_deployment
        ;;
    "all"|*)
        main
        ;;
esac 