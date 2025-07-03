#!/bin/bash

# GoSellr Production Deployment Script
echo "🚀 Starting GoSellr Production Deployment..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# 2. Build the application
echo "🔨 Building application..."
npm run build

# 3. Run tests
echo "🧪 Running tests..."
npm run test

# 4. Check for build errors
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Please fix errors before deployment."
    exit 1
fi

# 5. Start production server
echo "🌐 Starting production server..."
npm start

echo "🎉 GoSellr deployed successfully!" 