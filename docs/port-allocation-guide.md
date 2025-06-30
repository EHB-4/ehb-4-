# EHB Port Allocation Guide

## 🎯 Port Allocation Strategy

Your EHB ecosystem is organized across multiple ports for better separation of concerns and scalability:

| Service        | Port | Name               | Description                    | URL                   |
| -------------- | ---- | ------------------ | ------------------------------ | --------------------- |
| 🏠 **Home**    | 3000 | EHB Home           | Main frontend application      | http://localhost:3000 |
| 🔧 **Backend** | 8000 | EHB Backend        | Backend API server             | http://localhost:8000 |
| 🚀 **Portal**  | 8080 | Development Portal | Development and testing portal | http://localhost:8080 |
| ⚙️ **Admin**   | 5000 | Admin Panel        | Administrative dashboard       | http://localhost:5000 |

## 🚀 Quick Start Commands

### Start All Services

```bash
npm run dev:all
```

### Start Individual Services

```bash
# Start EHB Home
npm run dev:home

# Start Backend API
npm run dev:backend

# Start Development Portal
npm run dev:portal

# Start Admin Panel
npm run dev:admin
```

### Open Services in Browser

```bash
# Open EHB Home
npm run open:home

# Open Backend API
npm run open:backend

# Open Development Portal
npm run open:portal

# Open Admin Panel
npm run open:admin
```

## 🛠️ Port Management

### Check Service Status

```bash
npm run ehb:status
```

### Monitor Services (Real-time)

```bash
npm run ehb:monitor
```

### Start All Services

```bash
npm run ehb:start
```

### Stop All Services

```bash
npm run ehb:stop
```

### Restart All Services

```bash
npm run ehb:restart
```

## 📋 Service Details

### 🏠 EHB Home (Port 3000)

- **Purpose**: Main frontend application
- **Features**: User interface, navigation, main functionality
- **Access**: http://localhost:3000

### 🔧 EHB Backend (Port 8000)

- **Purpose**: Backend API server
- **Features**:
  - Authentication endpoints
  - User management
  - Product management
  - Order management
  - AI Marketplace API
  - Wallet services
  - Analytics
- **Health Check**: http://localhost:8000/health
- **API Docs**: http://localhost:8000/api

### 🚀 Development Portal (Port 8080)

- **Purpose**: Development and testing portal
- **Features**:
  - Development tools
  - Testing interfaces
  - Debug utilities
  - API testing
- **Access**: http://localhost:8080

### ⚙️ Admin Panel (Port 5000)

- **Purpose**: Administrative dashboard
- **Features**:
  - User management
  - System monitoring
  - Configuration settings
  - Analytics dashboard
- **Access**: http://localhost:5000

## 🔧 Configuration

### Port Configuration File

Location: `config/port-allocation.json`

This file contains all port configurations and can be used by other tools and scripts.

### Environment Variables

You can override default ports using environment variables:

```bash
# Set custom ports
export EHB_HOME_PORT=3000
export EHB_BACKEND_PORT=8000
export EHB_PORTAL_PORT=8080
export EHB_ADMIN_PORT=5000
```

## 🐛 Troubleshooting

### Port Already in Use

If a port is already in use, the port manager will automatically:

1. Detect the conflict
2. Kill the existing process
3. Start the new service

### Manual Port Management

```bash
# Check what's using a port
netstat -ano | findstr :3000

# Kill process on specific port
npm run ehb:stop
```

### Service Not Starting

1. Check if dependencies are installed: `npm install`
2. Check logs: `logs/port-manager.log`
3. Restart services: `npm run ehb:restart`

## 📊 Monitoring

### Real-time Monitoring

```bash
npm run ehb:monitor
```

This will show:

- Service status (🟢 Running / 🔴 Stopped)
- Port usage
- Real-time updates

### Log Files

- Port Manager Logs: `logs/port-manager.log`
- Backend Logs: Console output
- Next.js Logs: Console output

## 🔄 Development Workflow

### Typical Development Session

1. **Start all services**: `npm run dev:all`
2. **Open browsers**: `npm run open:home`
3. **Monitor**: `npm run ehb:monitor` (in separate terminal)
4. **Develop**: Make changes to your code
5. **Test**: Access different services as needed
6. **Stop**: `npm run ehb:stop` when done

### Individual Development

```bash
# Work on frontend only
npm run dev:home

# Work on backend only
npm run dev:backend

# Work on admin panel only
npm run dev:admin
```

## 🎯 Best Practices

1. **Always use the port manager** for starting/stopping services
2. **Monitor services** during development
3. **Check status** before starting new services
4. **Use the correct URLs** for each service
5. **Keep logs clean** by restarting services when needed

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review the logs
3. Restart the services
4. Check port conflicts

---

**Happy Coding! 🚀**
