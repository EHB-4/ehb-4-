#!/bin/bash

echo "========================================"
echo "    EHB Auto System Startup Script"
echo "========================================"
echo

echo "[1/5] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js found"

echo
echo "[2/5] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"

echo
echo "[3/5] Installing automation dependencies..."
npm install puppeteer nodemailer
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install automation dependencies"
    exit 1
fi
echo "✅ Automation dependencies installed"

echo
echo "[4/5] Starting development server..."
npm run dev &
DEV_PID=$!

echo
echo "[5/5] Waiting for server to start..."
sleep 10

echo
echo "========================================"
echo "    Starting Auto Master System"
echo "========================================"
echo
echo "🚀 Initializing automation system..."
echo "📊 This will automatically:"
echo "   - Test all pages for errors"
echo "   - Monitor system performance"
echo "   - Send email alerts for issues"
echo "   - Generate detailed reports"
echo
echo "Press Ctrl+C to stop the system"
echo

# Function to cleanup on exit
cleanup() {
    echo
    echo "🛑 Stopping auto system..."
    kill $DEV_PID 2>/dev/null
    echo "========================================"
    echo "    Auto System Stopped"
    echo "========================================"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start the auto master system
node scripts/ehb-auto-master.js --monitor

# Cleanup if we get here
cleanup 