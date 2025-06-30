# 🚀 EHB Port Structure & Management Guide

## 📋 Overview

EHB Technologies ka complete port structure system automatically manage karta hai all services, pages, aur development tools ko. Ye system ensure karta hai ke har service apne dedicated port per run ho aur auto-launch functionality available ho.

## 🎯 Port Structure Summary

### **🏗️ Main Application Ports (Primary)**

| Port     | Service                    | Purpose                     | Auto-Launch | Status       |
| -------- | -------------------------- | --------------------------- | ----------- | ------------ |
| **3001** | **EHB Main App**           | Primary Next.js application | ✅ Yes      | 🟢 Active    |
| **3002** | **EHB Admin Panel**        | Administrative dashboard    | ✅ Yes      | 🟢 Active    |
| **3003** | **EHB Development Portal** | Developer resources         | ✅ Yes      | 🟢 Active    |
| **3004** | **EHB Analytics**          | Real-time analytics         | ✅ Yes      | 🟢 Active    |
| **3005** | **EHB AI Marketplace**     | AI services marketplace     | ✅ Yes      | 🟡 Under Dev |

### **🔧 Service-Specific Ports (Secondary)**

| Port     | Service                     | Purpose               | Progress | Priority  |
| -------- | --------------------------- | --------------------- | -------- | --------- |
| **4001** | **PSS (Personal Security)** | Identity verification | 75%      | 🔴 High   |
| **4002** | **EDR (Exam Decision)**     | Skill assessment      | 60%      | 🔴 High   |
| **4003** | **EMO (Management)**        | User dashboard        | 80%      | 🔴 High   |
| **4004** | **GoSellr**                 | E-commerce platform   | 40%      | 🔴 High   |
| **4005** | **JPS (Job Placement)**     | Job matching          | 0%       | 🟡 Medium |
| **4006** | **Franchise System**        | Franchise management  | 0%       | 🟡 Medium |
| **4007** | **AI Agents**               | AI automation         | 65%      | 🔴 High   |

### **🛠️ Support Services Ports (Tertiary)**

| Port     | Service                 | Purpose                 | Progress | Status      |
| -------- | ----------------------- | ----------------------- | -------- | ----------- |
| **5001** | **Wallet System**       | Payment processing      | 100%     | ✅ Complete |
| **5002** | **Analytics Engine**    | Data analysis           | 70%      | 🔄 Working  |
| **5003** | **Search Hub**          | Universal search        | 80%      | 🔄 Working  |
| **5004** | **Notification System** | Real-time notifications | 85%      | 🔄 Working  |
| **5005** | **Documentation**       | API docs & guides       | 90%      | 🔄 Working  |

### **🧪 Development & Testing Ports**

| Port     | Service                   | Purpose               | Auto-Launch | Status    |
| -------- | ------------------------- | --------------------- | ----------- | --------- |
| **6001** | **Storybook**             | Component development | ✅ Yes      | 🟢 Active |
| **6002** | **Testing Dashboard**     | Test results          | ✅ Yes      | 🟢 Active |
| **6003** | **Performance Monitor**   | Performance metrics   | ✅ Yes      | 🟢 Active |
| **6004** | **Accessibility Checker** | A11y testing          | ✅ Yes      | 🟢 Active |
| **6005** | **Code Quality**          | Linting & formatting  | ✅ Yes      | 🟢 Active |

## 🚀 Quick Start Commands

### **Main Application Start**

```bash
# Start all main services
npm run ehb:start

# Start individual services
npm run dev:main      # Port 3001 - Main App
npm run dev:admin     # Port 3002 - Admin Panel
npm run dev:portal    # Port 3003 - Development Portal
npm run dev:analytics # Port 3004 - Analytics
npm run dev:ai-marketplace # Port 3005 - AI Marketplace

# Start all services simultaneously
npm run dev:all
```

### **Port Management**

```bash
# Check status of all services
npm run ehb:status

# Stop all services
npm run ehb:stop

# Restart specific service
npm run ehb:restart 3001

# Monitor services
npm run ehb:monitor
```

### **Auto-Launch Features**

```bash
# Auto-launch all services with browsers
npm run auto:launch

# Auto-setup complete environment
npm run auto:setup

# Auto-monitor performance
npm run auto:monitor
```

## 🔄 Core Flow Architecture

### **1. Main User Flow**

```
User → Port 3001 (Main App) → Authentication → Dashboard → Services
```

### **2. Service Access Flow**

```
Dashboard → Service Selection → Port 4001-4007 → Service Interface
```

### **3. Admin Flow**

```
Admin → Port 3002 (Admin Panel) → System Management → All Services
```

### **4. Developer Flow**

```
Developer → Port 3003 (Dev Portal) → Documentation → Testing → Deployment
```

### **5. Analytics Flow**

```
All Services → Port 3004 (Analytics) → Data Collection → Insights → Reports
```

## 📊 Service Dependencies

### **High Priority Services (Complete First)**

1. **PSS (4001)** - Identity verification foundation
2. **EDR (4002)** - Skill assessment system
3. **GoSellr (4004)** - E-commerce platform
4. **AI Agents (4007)** - Automation backbone

### **Medium Priority Services (Complete Second)**

1. **JPS (4005)** - Job placement system
2. **Franchise System (4006)** - Business expansion

### **Support Services (Already Working)**

1. **Wallet System (5001)** - ✅ Complete
2. **Analytics Engine (5002)** - 🔄 Working
3. **Search Hub (5003)** - 🔄 Working
4. **Notification System (5004)** - 🔄 Working

## 🎯 Page Distribution by Port

### **Port 3001 - Main App**

- `/` - Home page
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/auth/*` - Authentication pages
- `/services` - Services overview

### **Port 3002 - Admin Panel**

- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/system` - System monitoring
- `/admin/content` - Content management
- `/admin/security` - Security controls

### **Port 3003 - Development Portal**

- `/development-portal` - Main portal
- `/api-docs` - API documentation
- `/developer-tools` - Development tools
- `/roadmap` - Project roadmap
- `/testing` - Testing resources

### **Port 3004 - Analytics**

- `/analytics` - Analytics dashboard
- `/reports` - Data reports
- `/performance` - Performance metrics
- `/insights` - Business insights

### **Port 3005 - AI Marketplace**

- `/ai-marketplace` - AI services
- `/agents` - AI agents
- `/services` - Service delivery
- `/monitoring` - Performance monitoring

## ⚡ Auto-Management Features

### **Automatic Port Detection**

- System automatically finds available ports
- Fallback ports: 3000, 3002, 3003, 3004, 3005
- Port conflict resolution

### **Auto-Launch Browsers**

- Different browsers for different services
- Admin Panel → Edge browser
- Development Portal → Chrome browser
- Main App → Default browser

### **Auto-Restart on Error**

- Automatic service restart on failure
- Maximum restart attempts: 10
- Restart delay: 3 seconds

### **Health Monitoring**

- Real-time service health checks
- Performance monitoring
- Error logging and reporting

## 🔧 Configuration

### **Port Configuration File**

Location: `config/ehb-port-structure.json`

```json
{
  "mainApplication": {
    "ports": {
      "3001": {
        "service": "EHB Main App",
        "autoLaunch": true,
        "browserUrl": "http://localhost:3001"
      }
    }
  }
}
```

### **Environment Variables**

```bash
PORT=3001                    # Service port
NODE_ENV=development         # Environment
NEXT_TELEMETRY_DISABLED=1    # Disable telemetry
```

## 📈 Performance Optimization

### **Port Management Best Practices**

1. **Dedicated Ports**: Each service has its own port
2. **Port Isolation**: Services don't interfere with each other
3. **Auto-Fallback**: Automatic port switching if conflicts
4. **Resource Management**: Efficient memory and CPU usage

### **Development Workflow**

1. **Start Services**: `npm run ehb:start`
2. **Monitor Status**: `npm run ehb:status`
3. **Access Services**: Auto-launched browsers
4. **Stop Services**: `npm run ehb:stop`

## 🚨 Troubleshooting

### **Common Issues**

#### **Port Already in Use**

```bash
# Check what's using the port
netstat -ano | findstr :3001

# Kill the process
taskkill /F /PID <PID>

# Or use the port manager
npm run ehb:restart 3001
```

#### **Service Won't Start**

```bash
# Check logs
npm run ehb:status

# Restart service
npm run ehb:restart 3001

# Clean restart
npm run ehb:stop
npm run ehb:start
```

#### **Browser Won't Launch**

```bash
# Manual browser launch
start http://localhost:3001

# Check browser settings
# Ensure default browser is set
```

### **Performance Issues**

```bash
# Monitor performance
npm run auto:monitor

# Check resource usage
npm run ehb:status

# Restart services
npm run ehb:restart
```

## 🎯 Next Steps

### **Immediate Actions (This Week)**

1. ✅ Complete PSS (Port 4001) - 75% → 100%
2. ✅ Complete EDR (Port 4002) - 60% → 100%
3. ✅ Enhance GoSellr (Port 4004) - 40% → 80%
4. ✅ Optimize AI Agents (Port 4007) - 65% → 90%

### **Short Term (Next Month)**

1. 🚧 Start JPS (Port 4005) - 0% → 50%
2. 🚧 Start Franchise System (Port 4006) - 0% → 30%
3. 🔄 Complete AI Marketplace (Port 3005) - 40% → 100%

### **Long Term (Next Quarter)**

1. 🎯 All services 100% complete
2. 🎯 Production deployment ready
3. 🎯 Full automation system
4. 🎯 Performance optimization

## 📞 Support

### **Documentation**

- 📖 [API Documentation](./api-documentation.md)
- 📖 [Development Guide](./development-guide.md)
- 📖 [Deployment Guide](./deployment-guide.md)

### **Contact**

- 🛠️ Technical Issues: Check logs in `logs/ehb-port-manager.log`
- 📧 Support: Use development portal at `http://localhost:3003`
- 🚨 Emergency: Use admin panel at `http://localhost:3002`

---

**🎉 EHB Port Management System - Complete Automation & Efficiency!**
