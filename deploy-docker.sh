#!/bin/bash

echo "🐳 Starting Docker deployment..."

# Build and start containers
docker-compose -f docker-compose.prod.yml up -d --build

echo "✅ Docker deployment completed!"