#!/bin/bash

# GoSellr Database Setup Script
echo "🗄️ Setting up GoSellr Database..."

# PostgreSQL Setup
echo "📦 Installing PostgreSQL..."
sudo apt update
sudo apt install postgresql postgresql-contrib -y

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
echo "🔧 Creating database and user..."
sudo -u postgres psql << EOF
CREATE DATABASE gosellr;
CREATE USER gosellr_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE gosellr TO gosellr_user;
ALTER USER gosellr_user CREATEDB;
\q
EOF

# Install Redis
echo "📦 Installing Redis..."
sudo apt install redis-server -y
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Configure Redis
echo "🔧 Configuring Redis..."
sudo sed -i 's/# maxmemory <bytes>/maxmemory 256mb/' /etc/redis/redis.conf
sudo sed -i 's/# maxmemory-policy noeviction/maxmemory-policy allkeys-lru/' /etc/redis/redis.conf
sudo systemctl restart redis-server

echo "✅ Database setup complete!"
echo "📝 Database URL: postgresql://gosellr_user:secure_password_123@localhost:5432/gosellr"
echo "📝 Redis URL: redis://localhost:6379" 