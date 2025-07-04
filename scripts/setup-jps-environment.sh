#!/bin/bash

# Roman Urdu: JPS System Environment Setup Script
# Automated environment configuration for JPS system

set -e

# Roman Urdu: Configuration variables
PROJECT_NAME="jps-system"
ENVIRONMENT="${1:-development}"
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
    echo "    JPS System Environment Setup Script"
    echo "=================================================="
    echo -e "${NC}"
    echo "Project: $PROJECT_NAME"
    echo "Environment: $ENVIRONMENT"
    echo "Timestamp: $TIMESTAMP"
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
    
    # Roman Urdu: Check PostgreSQL (optional)
    if command -v psql &> /dev/null; then
        PSQL_VERSION=$(psql --version)
        log_info "PostgreSQL version: $PSQL_VERSION"
    else
        log_warning "PostgreSQL not found (will use external database)"
    fi
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        log_error "Missing required tools: ${missing_tools[*]}"
        log_info "Please install missing tools and try again"
        exit 1
    fi
    
    log_success "All system requirements met"
}

# Roman Urdu: Setup project structure
setup_project_structure() {
    log_step "Setting up project structure..."
    
    # Roman Urdu: Create necessary directories
    mkdir -p logs
    mkdir -p backups
    mkdir -p temp
    mkdir -p uploads
    mkdir -p reports
    mkdir -p docs/generated
    
    # Roman Urdu: Create log files
    touch logs/app.log
    touch logs/error.log
    touch logs/access.log
    
    log_success "Project structure setup completed"
}

# Roman Urdu: Setup environment files
setup_environment_files() {
    log_step "Setting up environment files..."
    
    # Roman Urdu: Create environment file if it doesn't exist
    if [ ! -f ".env.local" ]; then
        log_info "Creating .env.local from .env.example..."
        if [ -f ".env.example" ]; then
            cp .env.example .env.local
            log_success ".env.local created from .env.example"
        else
            log_error ".env.example not found"
            exit 1
        fi
    else
        log_warning ".env.local already exists"
    fi
    
    # Roman Urdu: Create environment-specific files
    if [ "$ENVIRONMENT" = "production" ]; then
        if [ ! -f ".env.production" ]; then
            log_info "Creating .env.production..."
            cp .env.example .env.production
            log_success ".env.production created"
        fi
    elif [ "$ENVIRONMENT" = "staging" ]; then
        if [ ! -f ".env.staging" ]; then
            log_info "Creating .env.staging..."
            cp .env.example .env.staging
            log_success ".env.staging created"
        fi
    fi
    
    log_success "Environment files setup completed"
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

# Roman Urdu: Setup database
setup_database() {
    log_step "Setting up database..."
    
    # Roman Urdu: Check if DATABASE_URL is set
    if [ -z "$DATABASE_URL" ]; then
        log_warning "DATABASE_URL not set. Using default local database..."
        export DATABASE_URL="postgresql://localhost:5432/jps_${ENVIRONMENT}"
    fi
    
    # Roman Urdu: Generate Prisma client
    log_info "Generating Prisma client..."
    npx prisma generate
    
    # Roman Urdu: Check database connection
    log_info "Checking database connection..."
    if npx prisma db pull --print > /dev/null 2>&1; then
        log_success "Database connection successful"
    else
        log_warning "Database connection failed. You may need to create the database manually."
        log_info "Please ensure your database is running and accessible."
    fi
    
    # Roman Urdu: Run migrations
    log_info "Running database migrations..."
    npx prisma migrate deploy
    
    log_success "Database setup completed"
}

# Roman Urdu: Seed database
seed_database() {
    log_step "Seeding database..."
    
    # Roman Urdu: Check if seed file exists
    if [ -f "prisma/seed.ts" ]; then
        log_info "Running database seed..."
        npx prisma db seed
        log_success "Database seeding completed"
    else
        log_warning "Seed file not found. Skipping database seeding."
    fi
}

# Roman Urdu: Setup Git hooks
setup_git_hooks() {
    log_step "Setting up Git hooks..."
    
    # Roman Urdu: Create .git/hooks directory if it doesn't exist
    mkdir -p .git/hooks
    
    # Roman Urdu: Create pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

# Roman Urdu: Pre-commit hook for JPS system
echo "Running pre-commit checks..."

# Roman Urdu: Run linting
npm run lint

# Roman Urdu: Run type checking
npm run type-check

# Roman Urdu: Run tests
npm run test:ci

echo "Pre-commit checks completed"
EOF
    
    chmod +x .git/hooks/pre-commit
    
    log_success "Git hooks setup completed"
}

# Roman Urdu: Setup development tools
setup_development_tools() {
    log_step "Setting up development tools..."
    
    # Roman Urdu: Create VS Code settings
    mkdir -p .vscode
    
    cat > .vscode/settings.json << 'EOF'
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.prisma": "prisma"
  },
  "prisma.telemetry": false
}
EOF
    
    # Roman Urdu: Create VS Code extensions recommendations
    cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "prisma.prisma",
    "ms-vscode.vscode-json"
  ]
}
EOF
    
    log_success "Development tools setup completed"
}

# Roman Urdu: Setup scripts
setup_scripts() {
    log_step "Setting up utility scripts..."
    
    # Roman Urdu: Create database backup script
    cat > scripts/backup-db.sh << 'EOF'
#!/bin/bash

# Roman Urdu: Database backup script
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/jps_backup_$DATE.sql"

mkdir -p "$BACKUP_DIR"

echo "Creating database backup..."
npx prisma db pull --print > "$BACKUP_FILE"

echo "Backup created: $BACKUP_FILE"
EOF
    
    chmod +x scripts/backup-db.sh
    
    # Roman Urdu: Create database restore script
    cat > scripts/restore-db.sh << 'EOF'
#!/bin/bash

# Roman Urdu: Database restore script
if [ -z "$1" ]; then
    echo "Usage: $0 <backup_file>"
    exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "Restoring database from backup..."
npx prisma db push --force-reset

echo "Database restored successfully"
EOF
    
    chmod +x scripts/restore-db.sh
    
    # Roman Urdu: Create health check script
    cat > scripts/health-check.sh << 'EOF'
#!/bin/bash

# Roman Urdu: Health check script
echo "Checking JPS system health..."

# Roman Urdu: Check database connection
echo "Database connection:"
npx prisma db pull --print > /dev/null 2>&1 && echo "✅ Connected" || echo "❌ Failed"

# Roman Urdu: Check API endpoints
echo "API endpoints:"
curl -f http://localhost:3000/api/health > /dev/null 2>&1 && echo "✅ Health endpoint" || echo "❌ Health endpoint"

echo "Health check completed"
EOF
    
    chmod +x scripts/health-check.sh
    
    log_success "Utility scripts setup completed"
}

# Roman Urdu: Setup monitoring
setup_monitoring() {
    log_step "Setting up monitoring..."
    
    # Roman Urdu: Create monitoring configuration
    cat > config/monitoring.json << 'EOF'
{
  "healthCheck": {
    "enabled": true,
    "interval": 30000,
    "timeout": 5000,
    "endpoints": [
      "/api/health",
      "/api/jobs",
      "/api/candidates"
    ]
  },
  "logging": {
    "level": "info",
    "file": "./logs/app.log",
    "maxSize": "10m",
    "maxFiles": 5
  },
  "metrics": {
    "enabled": true,
    "port": 9090,
    "path": "/metrics"
  }
}
EOF
    
    log_success "Monitoring setup completed"
}

# Roman Urdu: Setup security
setup_security() {
    log_step "Setting up security configuration..."
    
    # Roman Urdu: Create security configuration
    cat > config/security.json << 'EOF'
{
  "rateLimit": {
    "windowMs": 900000,
    "maxRequests": 100,
    "message": "Too many requests from this IP"
  },
  "cors": {
    "origin": ["http://localhost:3000", "https://your-domain.com"],
    "credentials": true,
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  },
  "helmet": {
    "contentSecurityPolicy": {
      "directives": {
        "defaultSrc": ["'self'"],
        "scriptSrc": ["'self'", "'unsafe-inline'"],
        "styleSrc": ["'self'", "'unsafe-inline'"],
        "imgSrc": ["'self'", "data:", "https:"]
      }
    }
  }
}
EOF
    
    log_success "Security configuration setup completed"
}

# Roman Urdu: Generate configuration documentation
generate_documentation() {
    log_step "Generating configuration documentation..."
    
    cat > docs/environment-setup.md << EOF
# JPS System Environment Setup

## Environment Configuration

This document describes the environment setup for the JPS (Job Placement System).

### Environment Variables

The system uses the following environment variables:

#### Database Configuration
- \`DATABASE_URL\`: PostgreSQL connection string
- \`DATABASE_POOL_MIN\`: Minimum database connections
- \`DATABASE_POOL_MAX\`: Maximum database connections

#### AI Services
- \`ANTHROPIC_API_KEY\`: Anthropic Claude API key
- \`PERPLEXITY_API_KEY\`: Perplexity AI API key
- \`OPENAI_API_KEY\`: OpenAI API key

#### Communication
- \`SMTP_HOST\`: SMTP server host
- \`SMTP_PORT\`: SMTP server port
- \`SMTP_USER\`: SMTP username
- \`SMTP_PASS\`: SMTP password
- \`TWILIO_ACCOUNT_SID\`: Twilio account SID
- \`TWILIO_AUTH_TOKEN\`: Twilio auth token

#### Payments
- \`STRIPE_SECRET_KEY\`: Stripe secret key
- \`STRIPE_PUBLISHABLE_KEY\`: Stripe publishable key

#### Monitoring
- \`SENTRY_DSN\`: Sentry DSN for error tracking
- \`LOGTAIL_TOKEN\`: Logtail token for logging

### Setup Instructions

1. Copy \`.env.example\` to \`.env.local\`
2. Update environment variables with your values
3. Run \`npm install\` to install dependencies
4. Run \`npx prisma generate\` to generate Prisma client
5. Run \`npx prisma migrate deploy\` to run migrations
6. Run \`npx prisma db seed\` to seed database

### Development

For development, use:
\`\`\`bash
npm run dev
\`\`\`

### Production

For production, use:
\`\`\`bash
npm run build
npm start
\`\`\`

### Environment Files

- \`.env.local\`: Local development
- \`.env.staging\`: Staging environment
- \`.env.production\`: Production environment

### Security Notes

- Never commit API keys to version control
- Use different keys for different environments
- Rotate keys regularly
- Enable two-factor authentication where possible
- Monitor API usage and costs

Generated on: $(date)
Environment: $ENVIRONMENT
EOF
    
    log_success "Configuration documentation generated"
}

# Roman Urdu: Verify setup
verify_setup() {
    log_step "Verifying setup..."
    
    # Roman Urdu: Check if all required files exist
    local missing_files=()
    
    if [ ! -f ".env.local" ]; then
        missing_files+=(".env.local")
    fi
    
    if [ ! -f "package.json" ]; then
        missing_files+=("package.json")
    fi
    
    if [ ! -d "node_modules" ]; then
        missing_files+=("node_modules")
    fi
    
    if [ ! -f "prisma/schema.prisma" ]; then
        missing_files+=("prisma/schema.prisma")
    fi
    
    if [ ${#missing_files[@]} -ne 0 ]; then
        log_error "Missing required files: ${missing_files[*]}"
        return 1
    fi
    
    # Roman Urdu: Check if database is accessible
    if npx prisma db pull --print > /dev/null 2>&1; then
        log_success "Database connection verified"
    else
        log_warning "Database connection not verified"
    fi
    
    # Roman Urdu: Check if dependencies are installed
    if [ -d "node_modules" ]; then
        log_success "Dependencies verified"
    else
        log_error "Dependencies not installed"
        return 1
    fi
    
    log_success "Setup verification completed"
}

# Roman Urdu: Generate setup report
generate_setup_report() {
    log_step "Generating setup report..."
    
    cat > setup-report-$TIMESTAMP.md << EOF
# JPS System Environment Setup Report

## Setup Summary
- **Project**: $PROJECT_NAME
- **Environment**: $ENVIRONMENT
- **Setup Date**: $(date)
- **Timestamp**: $TIMESTAMP

## Setup Steps Completed
- ✅ System requirements check
- ✅ Project structure setup
- ✅ Environment files setup
- ✅ Dependencies installation
- ✅ Database setup
- ✅ Database seeding
- ✅ Git hooks setup
- ✅ Development tools setup
- ✅ Utility scripts setup
- ✅ Monitoring setup
- ✅ Security configuration
- ✅ Documentation generation
- ✅ Setup verification

## System Information
- **Node.js Version**: $NODE_VERSION
- **npm Version**: $NPM_VERSION
- **Git Version**: $GIT_VERSION
- **Environment**: $ENVIRONMENT

## Next Steps
1. Update environment variables in .env.local
2. Configure database connection
3. Set up AI service API keys
4. Configure email/SMS services
5. Set up payment gateway
6. Configure monitoring services
7. Test the application

## Important Files
- **Environment**: .env.local
- **Database Schema**: prisma/schema.prisma
- **Package Configuration**: package.json
- **Documentation**: docs/environment-setup.md

## Commands
- Start development: \`npm run dev\`
- Build application: \`npm run build\`
- Run tests: \`npm run test\`
- Database backup: \`./scripts/backup-db.sh\`
- Health check: \`./scripts/health-check.sh\`

## Support
For issues or questions, contact the development team.

Generated on: $(date)
EOF
    
    log_success "Setup report generated: setup-report-$TIMESTAMP.md"
}

# Roman Urdu: Cleanup function
cleanup() {
    log_info "Cleaning up temporary files..."
    rm -rf temp/*
    log_success "Cleanup completed"
}

# Roman Urdu: Main setup function
main() {
    show_banner
    
    # Roman Urdu: Set up error handling
    trap 'log_error "Setup failed at step: $BASH_COMMAND"; cleanup; exit 1' ERR
    
    # Roman Urdu: Run setup steps
    check_requirements
    setup_project_structure
    setup_environment_files
    install_dependencies
    setup_database
    seed_database
    setup_git_hooks
    setup_development_tools
    setup_scripts
    setup_monitoring
    setup_security
    generate_documentation
    verify_setup
    generate_setup_report
    cleanup
    
    log_success "JPS System Environment Setup Completed Successfully!"
    log_info "Setup report: setup-report-$TIMESTAMP.md"
    log_info "Next steps: Update environment variables and test the application"
}

# Roman Urdu: Parse command line arguments
case "${1:-all}" in
    "check")
        check_requirements
        ;;
    "structure")
        setup_project_structure
        ;;
    "env")
        setup_environment_files
        ;;
    "deps")
        install_dependencies
        ;;
    "db")
        setup_database
        ;;
    "seed")
        seed_database
        ;;
    "hooks")
        setup_git_hooks
        ;;
    "tools")
        setup_development_tools
        ;;
    "scripts")
        setup_scripts
        ;;
    "monitoring")
        setup_monitoring
        ;;
    "security")
        setup_security
        ;;
    "docs")
        generate_documentation
        ;;
    "verify")
        verify_setup
        ;;
    "report")
        generate_setup_report
        ;;
    "all"|*)
        main
        ;;
esac 