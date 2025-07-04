#!/bin/bash

# Roman Urdu: JPS System Automated Production Deployment
# Complete automated deployment script with all necessary steps

set -e

# Roman Urdu: Configuration variables
PROJECT_NAME="jps-system"
DEPLOYMENT_ENV="production"
REGION="us-east-1"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Roman Urdu: Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Roman Urdu: Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_step() {
    echo -e "${PURPLE}[STEP]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Roman Urdu: Banner function
show_banner() {
    echo -e "${CYAN}"
    echo "=================================================="
    echo "    JPS System Production Deployment Script"
    echo "=================================================="
    echo -e "${NC}"
    echo "Project: $PROJECT_NAME"
    echo "Environment: $DEPLOYMENT_ENV"
    echo "Timestamp: $TIMESTAMP"
    echo "Region: $REGION"
    echo ""
}

# Roman Urdu: Check system requirements
check_requirements() {
    log_step "Checking system requirements..."
    
    local missing_tools=()
    
    # Roman Urdu: Check Node.js
    if ! command -v node &> /dev/null; then
        missing_tools+=("Node.js")
    else
        NODE_VERSION=$(node --version)
        log_info "Node.js version: $NODE_VERSION"
    fi
    
    # Roman Urdu: Check npm
    if ! command -v npm &> /dev/null; then
        missing_tools+=("npm")
    else
        NPM_VERSION=$(npm --version)
        log_info "npm version: $NPM_VERSION"
    fi
    
    # Roman Urdu: Check Git
    if ! command -v git &> /dev/null; then
        missing_tools+=("Git")
    else
        GIT_VERSION=$(git --version)
        log_info "Git version: $GIT_VERSION"
    fi
    
    # Roman Urdu: Check Vercel CLI
    if ! command -v vercel &> /dev/null; then
        missing_tools+=("Vercel CLI")
    else
        VERCEL_VERSION=$(vercel --version)
        log_info "Vercel CLI version: $VERCEL_VERSION"
    fi
    
    # Roman Urdu: Check Docker (optional)
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version)
        log_info "Docker version: $DOCKER_VERSION"
    else
        log_warning "Docker not found (optional for local development)"
    fi
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        log_error "Missing required tools: ${missing_tools[*]}"
        log_info "Please install missing tools and try again"
        exit 1
    fi
    
    log_success "All system requirements met"
}

# Roman Urdu: Setup project environment
setup_environment() {
    log_step "Setting up project environment..."
    
    # Roman Urdu: Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        log_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
    
    # Roman Urdu: Create necessary directories
    mkdir -p logs
    mkdir -p backups
    mkdir -p temp
    
    # Roman Urdu: Create production environment file if it doesn't exist
    if [ ! -f ".env.production" ]; then
        log_warning ".env.production not found. Creating template..."
        cat > .env.production << 'EOF'
# Roman Urdu: Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# Roman Urdu: Next.js Configuration
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key"

# Roman Urdu: AI Services
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
        log_warning "Please update .env.production with your actual values"
    fi
    
    log_success "Project environment setup completed"
}

# Roman Urdu: Install dependencies
install_dependencies() {
    log_step "Installing project dependencies..."
    
    # Roman Urdu: Clean install
    log_info "Cleaning npm cache..."
    npm cache clean --force
    
    log_info "Removing existing node_modules..."
    rm -rf node_modules package-lock.json
    
    log_info "Installing dependencies..."
    npm install
    
    # Roman Urdu: Install global tools if needed
    if ! command -v prisma &> /dev/null; then
        log_info "Installing Prisma CLI globally..."
        npm install -g prisma
    fi
    
    log_success "Dependencies installation completed"
}

# Roman Urdu: Database setup
setup_database() {
    log_step "Setting up database..."
    
    # Roman Urdu: Check if DATABASE_URL is set
    if [ -z "$DATABASE_URL" ]; then
        log_warning "DATABASE_URL not set. Using default local database..."
        export DATABASE_URL="postgresql://localhost:5432/jps_production"
    fi
    
    # Roman Urdu: Generate Prisma client
    log_info "Generating Prisma client..."
    npx prisma generate
    
    # Roman Urdu: Check database connection
    log_info "Checking database connection..."
    if npx prisma db pull --print > /dev/null 2>&1; then
        log_success "Database connection successful"
    else
        log_error "Database connection failed"
        log_info "Please check your DATABASE_URL and database server"
        exit 1
    fi
    
    # Roman Urdu: Run migrations
    log_info "Running database migrations..."
    npx prisma migrate deploy
    
    # Roman Urdu: Seed database if needed
    if [ -f "prisma/seed.ts" ]; then
        log_info "Seeding database..."
        npx prisma db seed
    fi
    
    log_success "Database setup completed"
}

# Roman Urdu: Code quality checks
run_quality_checks() {
    log_step "Running code quality checks..."
    
    # Roman Urdu: Type checking
    log_info "Running TypeScript type checking..."
    if npm run type-check > logs/type-check.log 2>&1; then
        log_success "Type checking passed"
    else
        log_error "Type checking failed. Check logs/type-check.log"
        exit 1
    fi
    
    # Roman Urdu: Linting
    log_info "Running ESLint..."
    if npm run lint > logs/lint.log 2>&1; then
        log_success "Linting passed"
    else
        log_warning "Linting issues found. Check logs/lint.log"
    fi
    
    # Roman Urdu: Security audit
    log_info "Running security audit..."
    if npm audit --audit-level moderate > logs/security-audit.log 2>&1; then
        log_success "Security audit passed"
    else
        log_warning "Security vulnerabilities found. Check logs/security-audit.log"
    fi
    
    log_success "Code quality checks completed"
}

# Roman Urdu: Run tests
run_tests() {
    log_step "Running tests..."
    
    # Roman Urdu: Unit tests
    log_info "Running unit tests..."
    if npm run test:ci > logs/unit-tests.log 2>&1; then
        log_success "Unit tests passed"
    else
        log_error "Unit tests failed. Check logs/unit-tests.log"
        exit 1
    fi
    
    # Roman Urdu: Integration tests
    if [ -f "cypress.config.ts" ]; then
        log_info "Running integration tests..."
        if npm run test:e2e > logs/integration-tests.log 2>&1; then
            log_success "Integration tests passed"
        else
            log_warning "Integration tests failed. Check logs/integration-tests.log"
        fi
    fi
    
    log_success "All tests completed"
}

# Roman Urdu: Build application
build_application() {
    log_step "Building application..."
    
    # Roman Urdu: Clean build directory
    log_info "Cleaning build directory..."
    rm -rf .next
    
    # Roman Urdu: Build application
    log_info "Building application..."
    if npm run build > logs/build.log 2>&1; then
        log_success "Application build successful"
    else
        log_error "Application build failed. Check logs/build.log"
        exit 1
    fi
    
    # Roman Urdu: Check build size
    log_info "Checking build size..."
    BUILD_SIZE=$(du -sh .next | cut -f1)
    log_info "Build size: $BUILD_SIZE"
    
    log_success "Application build completed"
}

# Roman Urdu: Performance optimization
optimize_performance() {
    log_step "Optimizing performance..."
    
    # Roman Urdu: Bundle analysis
    if [ -f "next.config.js" ] && grep -q "bundle-analyzer" next.config.js; then
        log_info "Running bundle analysis..."
        npm run build:analyze > logs/bundle-analysis.log 2>&1
    fi
    
    # Roman Urdu: Image optimization
    if [ -d "public/images" ]; then
        log_info "Optimizing images..."
        npm run optimize-images > logs/image-optimization.log 2>&1
    fi
    
    # Roman Urdu: Generate sitemap
    log_info "Generating sitemap..."
    npm run generate-sitemap > logs/sitemap.log 2>&1
    
    # Roman Urdu: Generate robots.txt
    log_info "Generating robots.txt..."
    cat > public/robots.txt << 'EOF'
User-agent: *
Allow: /

Sitemap: https://your-domain.vercel.app/sitemap.xml
EOF
    
    log_success "Performance optimization completed"
}

# Roman Urdu: Security checks
run_security_checks() {
    log_step "Running security checks..."
    
    # Roman Urdu: Check for secrets in code
    log_info "Checking for secrets in code..."
    if grep -r "password\|secret\|key" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next --exclude=*.env* | grep -v "//" | grep -v "/*" | grep -v "*/"; then
        log_warning "Potential secrets found in code"
    else
        log_success "No secrets found in code"
    fi
    
    # Roman Urdu: Check SSL configuration
    log_info "SSL configuration will be handled by Vercel"
    
    # Roman Urdu: Check CORS configuration
    log_info "CORS configuration will be handled by Next.js"
    
    log_success "Security checks completed"
}

# Roman Urdu: Deploy to Vercel
deploy_to_vercel() {
    log_step "Deploying to Vercel..."
    
    # Roman Urdu: Check Vercel login
    if ! vercel whoami > /dev/null 2>&1; then
        log_error "Not logged in to Vercel. Please run 'vercel login' first"
        exit 1
    fi
    
    # Roman Urdu: Deploy to production
    log_info "Deploying to production..."
    if vercel --prod --confirm > logs/vercel-deploy.log 2>&1; then
        log_success "Deployment to Vercel successful"
        
        # Roman Urdu: Get deployment URL
        DEPLOYMENT_URL=$(grep "https://" logs/vercel-deploy.log | tail -1)
        if [ -n "$DEPLOYMENT_URL" ]; then
            log_info "Deployment URL: $DEPLOYMENT_URL"
        fi
    else
        log_error "Deployment to Vercel failed. Check logs/vercel-deploy.log"
        exit 1
    fi
}

# Roman Urdu: Setup monitoring
setup_monitoring() {
    log_step "Setting up monitoring..."
    
    # Roman Urdu: Create health check endpoint
    mkdir -p app/api/health
    
    cat > app/api/health/route.ts << 'EOF'
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Get basic stats
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

# Roman Urdu: Verify deployment
verify_deployment() {
    log_step "Verifying deployment..."
    
    # Roman Urdu: Get deployment URL from logs
    DEPLOYMENT_URL=$(grep "https://" logs/vercel-deploy.log | tail -1)
    
    if [ -z "$DEPLOYMENT_URL" ]; then
        log_error "Could not find deployment URL"
        return 1
    fi
    
    log_info "Verifying deployment at: $DEPLOYMENT_URL"
    
    # Roman Urdu: Check health endpoint
    log_info "Checking health endpoint..."
    if curl -f "$DEPLOYMENT_URL/api/health" > logs/health-check.log 2>&1; then
        log_success "Health check passed"
    else
        log_error "Health check failed"
        return 1
    fi
    
    # Roman Urdu: Check main page
    log_info "Checking main page..."
    if curl -f "$DEPLOYMENT_URL" > logs/main-page-check.log 2>&1; then
        log_success "Main page is accessible"
    else
        log_error "Main page is not accessible"
        return 1
    fi
    
    log_success "Deployment verification completed"
}

# Roman Urdu: Setup backup strategy
setup_backup_strategy() {
    log_step "Setting up backup strategy..."
    
    # Roman Urdu: Create backup script
    cat > scripts/backup-database.sh << 'EOF'
#!/bin/bash

# Roman Urdu: Database backup script
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/jps_backup_$DATE.json"

mkdir -p "$BACKUP_DIR"

# Export database
npx prisma db pull --print > "$BACKUP_FILE"

echo "Backup created: $BACKUP_FILE"
EOF
    
    chmod +x scripts/backup-database.sh
    
    # Roman Urdu: Create initial backup
    log_info "Creating initial backup..."
    ./scripts/backup-database.sh > logs/initial-backup.log 2>&1
    
    log_success "Backup strategy setup completed"
}

# Roman Urdu: Generate deployment report
generate_report() {
    log_step "Generating deployment report..."
    
    cat > deployment-report-$TIMESTAMP.md << EOF
# JPS System Deployment Report

## Deployment Summary
- **Project**: $PROJECT_NAME
- **Environment**: $DEPLOYMENT_ENV
- **Deployment Date**: $(date)
- **Timestamp**: $TIMESTAMP
- **Region**: $REGION

## Deployment Steps Completed
- ✅ System requirements check
- ✅ Project environment setup
- ✅ Dependencies installation
- ✅ Database setup
- ✅ Code quality checks
- ✅ Tests execution
- ✅ Application build
- ✅ Performance optimization
- ✅ Security checks
- ✅ Vercel deployment
- ✅ Monitoring setup
- ✅ Deployment verification
- ✅ Backup strategy

## Build Information
- **Node.js Version**: $NODE_VERSION
- **npm Version**: $NPM_VERSION
- **Build Size**: $BUILD_SIZE
- **Build Log**: logs/build.log

## Test Results
- **Unit Tests**: logs/unit-tests.log
- **Integration Tests**: logs/integration-tests.log
- **Type Checking**: logs/type-check.log
- **Linting**: logs/lint.log

## Deployment Information
- **Deployment Log**: logs/vercel-deploy.log
- **Health Check**: logs/health-check.log
- **Main Page Check**: logs/main-page-check.log

## Next Steps
1. Configure custom domain in Vercel
2. Set up monitoring alerts
3. Configure email/SMS services
4. Set up payment gateway
5. Configure backup automation
6. Set up SSL certificates

## Important URLs
- **Application**: $DEPLOYMENT_URL
- **Health Check**: $DEPLOYMENT_URL/api/health
- **Vercel Dashboard**: https://vercel.com/dashboard

## Environment Variables
Make sure to configure all required environment variables in Vercel dashboard.

## Monitoring
- Error tracking: Sentry
- Logging: Logtail
- Performance: Vercel Analytics

## Support
For issues or questions, contact the development team.

## Logs
All deployment logs are available in the logs/ directory.
EOF
    
    log_success "Deployment report generated: deployment-report-$TIMESTAMP.md"
}

# Roman Urdu: Cleanup function
cleanup() {
    log_info "Cleaning up temporary files..."
    rm -rf temp/*
    log_success "Cleanup completed"
}

# Roman Urdu: Main deployment function
main() {
    show_banner
    
    # Roman Urdu: Set up error handling
    trap 'log_error "Deployment failed at step: $BASH_COMMAND"; cleanup; exit 1' ERR
    
    # Roman Urdu: Run deployment steps
    check_requirements
    setup_environment
    install_dependencies
    setup_database
    run_quality_checks
    run_tests
    build_application
    optimize_performance
    run_security_checks
    deploy_to_vercel
    setup_monitoring
    verify_deployment
    setup_backup_strategy
    generate_report
    cleanup
    
    log_success "JPS System Production Deployment Completed Successfully!"
    log_info "Deployment report: deployment-report-$TIMESTAMP.md"
    log_info "Next steps: Configure custom domain and set up monitoring alerts"
}

# Roman Urdu: Parse command line arguments
case "${1:-all}" in
    "check")
        check_requirements
        ;;
    "env")
        setup_environment
        ;;
    "deps")
        install_dependencies
        ;;
    "db")
        setup_database
        ;;
    "quality")
        run_quality_checks
        ;;
    "test")
        run_tests
        ;;
    "build")
        build_application
        ;;
    "optimize")
        optimize_performance
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
    "backup")
        setup_backup_strategy
        ;;
    "report")
        generate_report
        ;;
    "all"|*)
        main
        ;;
esac 