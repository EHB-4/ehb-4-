# EHB Frontend Dependencies Setup for Windows
Write-Host "🚀 EHB Frontend Dependencies Setup" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# UI Components & Styling
Write-Host "`n📦 Installing UI Components..." -ForegroundColor Yellow
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-toast
npm install @radix-ui/react-tabs @radix-ui/react-select @radix-ui/react-checkbox
npm install @radix-ui/react-avatar @radix-ui/react-progress @radix-ui/react-slider
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install @headlessui/react @heroicons/react

# Form Handling & Validation
Write-Host "`n📝 Installing Form Libraries..." -ForegroundColor Yellow
npm install react-hook-form @hookform/resolvers zod
npm install react-select react-datepicker

# State Management
Write-Host "`n🔄 Installing State Management..." -ForegroundColor Yellow
npm install zustand @tanstack/react-query
npm install redux @reduxjs/toolkit react-redux

# Charts & Data Visualization
Write-Host "`n📊 Installing Chart Libraries..." -ForegroundColor Yellow
npm install recharts chart.js react-chartjs-2
npm install @nivo/core @nivo/line @nivo/bar @nivo/pie

# File Upload & Media
Write-Host "`n📁 Installing File Upload Libraries..." -ForegroundColor Yellow
npm install react-dropzone react-image-crop
npm install @uploadthing/react uploadthing

# Authentication & Security
Write-Host "`n🔐 Installing Authentication..." -ForegroundColor Yellow
npm install next-auth @auth/prisma-adapter
npm install @next-auth/prisma-adapter

# Payment Integration
Write-Host "`n💳 Installing Payment Libraries..." -ForegroundColor Yellow
npm install @stripe/stripe-js @stripe/react-stripe-js
npm install paypal-js @paypal/react-paypal-js

# Maps & Location
Write-Host "`n🗺️ Installing Maps Libraries..." -ForegroundColor Yellow
npm install @googlemaps/js-api-loader
npm install mapbox-gl react-map-gl
npm install leaflet react-leaflet

# Real-time Features
Write-Host "`n⚡ Installing Real-time Libraries..." -ForegroundColor Yellow
npm install socket.io-client
npm install @supabase/supabase-js

# Testing & Quality
Write-Host "`n🧪 Installing Testing Libraries..." -ForegroundColor Yellow
npm install @testing-library/user-event @testing-library/dom
npm install msw jest-environment-jsdom
npm install @storybook/react @storybook/addon-essentials

Write-Host "`n✅ All frontend dependencies installed successfully!" -ForegroundColor Green
Write-Host "`n🎯 Next steps:" -ForegroundColor Cyan
Write-Host "1. Set up your .env.local file with API keys" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to start development" -ForegroundColor White
Write-Host "3. Check 'FRONTEND_GUIDE.md' for detailed instructions" -ForegroundColor White 