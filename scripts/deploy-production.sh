#!/bin/bash

# EHB Platform Production Deployment Script
# This script handles the complete production deployment process

set -e  # Exit on any error

# Configuration
APP_NAME="ehb-platform"
DEPLOY_DIR="/var/www/ehb-platform"
BACKUP_DIR="/var/backups/ehb-platform"
LOG_DIR="/var/log/ehb-platform"
GIT_REPO="https://github.com/ehb-platform/nextjs-app.git"
BRANCH="main"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        error "This script should not be run as root"
        exit 1
    fi
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    # Check if required commands exist
    commands=("git" "node" "npm" "docker" "docker-compose" "pm2")
    for cmd in "${commands[@]}"; do
        if ! command -v $cmd &> /dev/null; then
            error "$cmd is not installed"
            exit 1
        fi
    done
    
    # Check if directories exist
    if [[ ! -d "$DEPLOY_DIR" ]]; then
        log "Creating deployment directory..."
        sudo mkdir -p "$DEPLOY_DIR"
        sudo chown $USER:$USER "$DEPLOY_DIR"
    fi
    
    if [[ ! -d "$BACKUP_DIR" ]]; then
        log "Creating backup directory..."
        sudo mkdir -p "$BACKUP_DIR"
        sudo chown $USER:$USER "$BACKUP_DIR"
    fi
    
    if [[ ! -d "$LOG_DIR" ]]; then
        log "Creating log directory..."
        sudo mkdir -p "$LOG_DIR"
        sudo chown $USER:$USER "$LOG_DIR"
    fi
    
    success "Prerequisites check completed"
}

# Create backup of current deployment
create_backup() {
    log "Creating backup of current deployment..."
    
    if [[ -d "$DEPLOY_DIR" ]] && [[ "$(ls -A $DEPLOY_DIR)" ]]; then
        BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
        BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"
        
        cp -r "$DEPLOY_DIR" "$BACKUP_PATH"
        log "Backup created: $BACKUP_PATH"
    else
        warning "No existing deployment to backup"
    fi
}

# Clone or pull latest code
update_code() {
    log "Updating application code..."
    
    if [[ -d "$DEPLOY_DIR/.git" ]]; then
        cd "$DEPLOY_DIR"
        git fetch origin
        git reset --hard origin/$BRANCH
        log "Code updated from git repository"
    else
        git clone -b $BRANCH "$GIT_REPO" "$DEPLOY_DIR"
        log "Code cloned from git repository"
    fi
}

# Install dependencies
install_dependencies() {
    log "Installing dependencies..."
    cd "$DEPLOY_DIR"
    
    # Clean install
    rm -rf node_modules package-lock.json
    npm ci --production
    
    success "Dependencies installed"
}

# Build application
build_application() {
    log "Building application..."
    cd "$DEPLOY_DIR"
    
    # Generate Prisma client
    npx prisma generate
    
    # Build Next.js application
    npm run build
    
    success "Application built successfully"
}

# Run database migrations
run_migrations() {
    log "Running database migrations..."
    cd "$DEPLOY_DIR"
    
    # Check if database is accessible
    if npx prisma db push --accept-data-loss; then
        success "Database migrations completed"
    else
        error "Database migration failed"
        exit 1
    fi
}

# Deploy with Docker
deploy_docker() {
    log "Deploying with Docker..."
    cd "$DEPLOY_DIR"
    
    # Build and start containers
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    
    # Wait for containers to be healthy
    log "Waiting for containers to be healthy..."
    sleep 30
    
    # Check container status
    if docker-compose ps | grep -q "Up"; then
        success "Docker deployment completed"
    else
        error "Docker deployment failed"
        exit 1
    fi
}

# Deploy with PM2
deploy_pm2() {
    log "Deploying with PM2..."
    cd "$DEPLOY_DIR"
    
    # Stop existing processes
    pm2 stop $APP_NAME 2>/dev/null || true
    pm2 delete $APP_NAME 2>/dev/null || true
    
    # Start with PM2
    pm2 start ecosystem.config.js --env production
    
    # Save PM2 configuration
    pm2 save
    
    # Setup PM2 startup script
    pm2 startup
    
    success "PM2 deployment completed"
}

# Run health checks
run_health_checks() {
    log "Running health checks..."
    cd "$DEPLOY_DIR"
    
    # Wait for application to start
    sleep 10
    
    # Run health check script
    if node scripts/health-check.js; then
        success "Health checks passed"
    else
        error "Health checks failed"
        return 1
    fi
}

# Rollback function
rollback() {
    error "Deployment failed, rolling back..."
    
    # Find latest backup
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR" | head -1)
    
    if [[ -n "$LATEST_BACKUP" ]]; then
        log "Rolling back to: $LATEST_BACKUP"
        
        # Stop current deployment
        cd "$DEPLOY_DIR"
        docker-compose down 2>/dev/null || true
        pm2 stop $APP_NAME 2>/dev/null || true
        
        # Restore from backup
        rm -rf "$DEPLOY_DIR"
        cp -r "$BACKUP_DIR/$LATEST_BACKUP" "$DEPLOY_DIR"
        
        # Restart services
        cd "$DEPLOY_DIR"
        docker-compose up -d 2>/dev/null || pm2 start ecosystem.config.js --env production
        
        success "Rollback completed"
    else
        error "No backup found for rollback"
    fi
}

# Main deployment function
deploy() {
    local deployment_method="$1"
    
    log "Starting production deployment..."
    log "Deployment method: $deployment_method"
    
    # Create backup
    create_backup
    
    # Update code
    update_code
    
    # Install dependencies
    install_dependencies
    
    # Build application
    build_application
    
    # Run migrations
    run_migrations
    
    # Deploy based on method
    case $deployment_method in
        "docker")
            deploy_docker
            ;;
        "pm2")
            deploy_pm2
            ;;
        *)
            error "Invalid deployment method: $deployment_method"
            exit 1
            ;;
    esac
    
    # Run health checks
    if run_health_checks; then
        success "Production deployment completed successfully!"
    else
        rollback
        exit 1
    fi
}

# Show usage
usage() {
    echo "Usage: $0 [docker|pm2]"
    echo ""
    echo "Deployment methods:"
    echo "  docker  - Deploy using Docker Compose"
    echo "  pm2     - Deploy using PM2 process manager"
    echo ""
    echo "Examples:"
    echo "  $0 docker"
    echo "  $0 pm2"
}

# Main script execution
main() {
    # Check if running as root
    check_root
    
    # Check prerequisites
    check_prerequisites
    
    # Parse command line arguments
    if [[ $# -eq 0 ]]; then
        usage
        exit 1
    fi
    
    local deployment_method="$1"
    
    # Validate deployment method
    if [[ "$deployment_method" != "docker" && "$deployment_method" != "pm2" ]]; then
        error "Invalid deployment method: $deployment_method"
        usage
        exit 1
    fi
    
    # Start deployment
    deploy "$deployment_method"
}

# Run main function with all arguments
main "$@" 