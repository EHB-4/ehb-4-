#!/bin/bash

echo "🚀 Starting deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
npm ci --only=production

# Build the application
npm run build

# Restart the application
pm2 restart ehb-nextjs-app

echo "✅ Deployment completed!"