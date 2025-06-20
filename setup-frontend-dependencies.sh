#!/bin/bash

echo "🚀 EHB Frontend Dependencies Setup"
echo "=================================="

# UI Components & Styling
echo "📦 Installing UI Components..."
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-toast
npm install @radix-ui/react-tabs @radix-ui/react-select @radix-ui/react-checkbox
npm install @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-slider
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install @headlessui/react @heroicons/react

# Form Handling & Validation
echo "📝 Installing Form Libraries..."
npm install react-hook-form @hookform/resolvers zod
npm install react-select react-datepicker

# State Management
echo "🔄 Installing State Management..."
npm install zustand @tanstack/react-query
npm install redux @reduxjs/toolkit react-redux

# Charts & Data Visualization
echo "📊 Installing Chart Libraries..."
npm install recharts chart.js react-chartjs-2
npm install @nivo/core @nivo/line @nivo/bar @nivo/pie

# File Upload & Media
echo "📁 Installing File Upload Libraries..."
npm install react-dropzone react-image-crop
npm install @uploadthing/react uploadthing

# Authentication & Security
echo "🔐 Installing Authentication..."
npm install next-auth @auth/prisma-adapter
npm install @next-auth/prisma-adapter

# Payment Integration
echo "💳 Installing Payment Libraries..."
npm install @stripe/stripe-js @stripe/react-stripe-js
npm install paypal-js @paypal/react-paypal-js

# Maps & Location
echo "🗺️ Installing Maps Libraries..."
npm install @googlemaps/js-api-loader
npm install mapbox-gl react-map-gl
npm install leaflet react-leaflet

# Real-time Features
echo "⚡ Installing Real-time Libraries..."
npm install socket.io-client
npm install @supabase/supabase-js

# Testing & Quality
echo "🧪 Installing Testing Libraries..."
npm install @testing-library/user-event @testing-library/dom
npm install msw jest-environment-jsdom
npm install @storybook/react @storybook/addon-essentials

echo "✅ All frontend dependencies installed successfully!"
echo "🎯 Next steps:"
echo "1. Set up your .env.local file with API keys"
echo "2. Run 'npm run dev' to start development"
echo "3. Check 'FRONTEND_GUIDE.md' for detailed instructions" 