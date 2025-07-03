#!/bin/bash

# GoSellr AWS Deployment Script
echo "🚀 Deploying GoSellr to AWS..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "📦 Installing AWS CLI..."
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Create Docker image
echo "🐳 Creating Docker image..."
docker build -t gosellr .

# Tag image for ECR
echo "🏷️ Tagging image..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
docker tag gosellr:latest $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/gosellr:latest

# Push to ECR
echo "📤 Pushing to ECR..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/gosellr:latest

# Deploy to ECS
echo "☁️ Deploying to ECS..."
aws ecs update-service --cluster gosellr-cluster --service gosellr-service --force-new-deployment

echo "🎉 AWS deployment complete!"
echo "📝 Your GoSellr e-commerce platform is now live on AWS!" 