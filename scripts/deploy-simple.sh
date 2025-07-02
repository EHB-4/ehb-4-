#!/bin/bash

# Simple EHB Platform Deployment Script
# This script builds and deploys the application using Docker

set -e

echo "🚀 Starting EHB Platform Deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Stop any existing containers
log "Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Build the Docker image
log "Building Docker image..."
docker build -t ehb-platform .

if [ $? -eq 0 ]; then
    success "Docker image built successfully!"
else
    echo "❌ Docker build failed!"
    exit 1
fi

# Run the container
log "Starting application container..."
docker run -d \
    --name ehb-platform \
    -p 3000:3000 \
    -e NODE_ENV=production \
    -e PORT=3000 \
    ehb-platform

if [ $? -eq 0 ]; then
    success "Application container started successfully!"
else
    echo "❌ Failed to start application container!"
    exit 1
fi

# Wait for application to start
log "Waiting for application to start..."
sleep 10

# Check if application is running
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    success "Application is running successfully!"
    echo ""
    echo "🎉 EHB Platform is now live!"
    echo "📍 URL: http://localhost:3000"
    echo "🔧 To view logs: docker logs ehb-platform"
    echo "🛑 To stop: docker stop ehb-platform"
    echo "🗑️  To remove: docker rm ehb-platform"
else
    warning "Application might still be starting up..."
    echo "📍 URL: http://localhost:3000"
    echo "🔧 Check logs: docker logs ehb-platform"
fi

echo ""
echo "📊 Deployment Summary:"
echo "✅ Docker image built"
echo "✅ Container started"
echo "✅ Application deployed"
echo ""
echo "🚀 EHB Platform is ready for production!" 