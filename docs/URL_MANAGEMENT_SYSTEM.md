# EHB URL Management System

## 🚀 Overview

EHB URL Management System ek comprehensive solution hai jo automatically EHB project ke sabhi pages ko manage karta hai, development agents ko assign karta hai, aur browser mein pages ko auto-open karta hai.

## ✨ Features

### 🔗 **URL Management**

- **Permanent URLs**: Har page ka permanent URL track karta hai
- **Auto-routing**: Pages ko automatically browser mein open karta hai
- **Status tracking**: Page completion aur development status track karta hai
- **Category management**: Pages ko categories mein organize karta hai

### 🤖 **Development Agent Management**

- **Auto-assignment**: Pages ko best available agents ko automatically assign karta hai
- **Expertise matching**: Agent ki expertise ke hisab se pages assign karta hai
- **Status tracking**: Agent availability aur workload track karta hai
- **Real-time updates**: Agent status real-time update hota hai

### 🌐 **Browser Integration**

- **Auto-opening**: Pages ko automatically browser mein open karta hai
- **Multi-browser support**: Chrome, Firefox, Edge, Safari support karta hai
- **Session management**: Active sessions ko track karta hai
- **Batch operations**: Multiple pages ko ek sath open kar sakta hai

## 📋 Available Pages

### 🏠 **Core Pages**

- **Home**: `/` - Main landing page
- **Dashboard**: `/dashboard` - EHB dashboard
- **Services**: `/services` - All services overview
- **Analytics**: `/analytics` - Analytics and reporting

### 🔐 **Authentication**

- **Login**: `/login` - User login
- **Register**: `/register` - User registration
- **Profile**: `/profile` - User profile
- **Settings**: `/settings` - Application settings

### 🛠️ **Core Services**

- **JPS**: `/jps` - Job Placement System (100% complete)
- **GoSellr**: `/gosellr` - E-commerce marketplace (95% complete)
- **Franchise**: `/franchise` - Franchise management (100% complete)
- **WMS**: `/wms` - World Medical Services (100% complete)
- **OLS**: `/ols` - Online Law Services (100% complete)
- **AGTS**: `/agts` - Advanced Global Travel Services (100% complete)

### 🔧 **Development Services**

- **PSS**: `/pss` - Personal Security System (75% complete)
- **EDR**: `/edr` - Emergency Decision Registration (60% complete)
- **AI Agents**: `/ai-agents` - AI agent system (65% complete)

### 💰 **Financial Services**

- **Wallet**: `/wallet` - Trusty Wallet (100% complete)
- **Cart**: `/cart` - Shopping cart (90% complete)
- **Orders**: `/orders` - Order management (85% complete)

### 👨‍💼 **Admin Services**

- **Admin Panel**: `/admin` - Admin panel (80% complete)
- **Development Portal**: `/development-portal` - Dev portal (75% complete)

## 🤖 Development Agents

### **Available Agents**

1. **Frontend Specialist** - React, Next.js, TypeScript, UI/UX
2. **Backend Developer** - Node.js, API, Database, Authentication
3. **AI/ML Engineer** - AI, Machine Learning, Analytics, Automation
4. **DevOps Engineer** - Deployment, Infrastructure, Monitoring, Security
5. **Full Stack Developer** - React, Node.js, Database, API, Deployment

### **Agent Status**

- 🟢 **Available**: Agent free hai aur new pages accept kar sakta hai
- 🟡 **Busy**: Agent currently kisi page pe kaam kar raha hai
- 🔴 **Offline**: Agent temporarily unavailable hai

## 🛠️ Usage

### **Command Line Interface**

```bash
# URL Manager CLI start karein
npm run url-manager

# Available commands
list                    # List all pages
list active             # List active pages only
list development        # List development pages only
agents                  # List development agents
status                  # Show system status
open <page-id>          # Open specific page
open-all                # Open all active pages
open-dev                # Open all development pages
search <query>          # Search pages
search-open <query>     # Search and open pages
help                    # Show help
exit                    # Exit CLI
```

### **Examples**

```bash
# JPS page open karein
open jps

# Wallet-related pages search karein
search wallet

# All active pages open karein
open-all

# Development pages open karein
open-dev
```

### **Web Dashboard**

URL Management Dashboard `/url-management` pe available hai:

```bash
# Dashboard access karein
http://localhost:3000/url-management
```

### **API Endpoints**

```javascript
// Get all pages
GET /api/url-management?action=getAllPages

// Get specific page
GET /api/url-management?action=getPage&pageId=jps

// Search pages
GET /api/url-management?action=searchPages&query=wallet

// Open page
POST /api/url-management
{
  "action": "openPage",
  "pageId": "jps"
}

// Assign agent
POST /api/url-management
{
  "action": "assignAgent",
  "pageId": "jps",
  "agentId": "agent-001"
}
```

## 🔧 Configuration

### **Browser Configuration**

```javascript
// lib/utils/autoBrowser.ts mein configure karein
const config = {
  autoOpen: true, // Auto browser opening
  defaultBrowser: 'chrome', // Default browser
  newTab: true, // Open in new tab
  incognito: false, // Incognito mode
};
```

### **URL Configuration**

```javascript
// lib/utils/urlManager.ts mein configure karein
const config = {
  baseUrl: 'localhost', // Base URL
  port: 3000, // Port number
  protocol: 'http', // Protocol
  environment: 'development', // Environment
};
```

## 📊 System Status

### **Real-time Monitoring**

- Total pages count
- Active pages count
- Development pages count
- Available agents count
- Active sessions count

### **Page Status Tracking**

- ✅ **Active**: Fully functional pages
- 🔧 **Development**: Under development pages
- 📋 **Planned**: Planned pages

### **Completion Tracking**

- Progress bars for each page
- Percentage completion
- Last updated timestamps

## 🚀 Quick Start

### **1. System Start**

```bash
# Development server start karein
npm run dev

# URL Manager CLI start karein (new terminal)
npm run url-manager
```

### **2. Dashboard Access**

```bash
# Browser mein dashboard open karein
http://localhost:3000/url-management
```

### **3. Quick Actions**

```bash
# All active pages open karein
npm run url-manager:open

# System status check karein
npm run url-manager:status

# Pages list dekhne ke liye
npm run url-manager:list
```

## 🔄 Auto-Assignment Logic

### **Agent Selection Criteria**

1. **Expertise Match**: Page tags aur agent expertise match
2. **Category Match**: Page category aur agent skills match
3. **Workload Balance**: Agents with fewer current pages preferred
4. **Availability**: Only available agents considered

### **Scoring System**

- Expertise match: +2 points per tag
- Category match: +1 point
- Workload balance: +1 point per free slot (max 10)

## 📈 Performance Features

### **Batch Operations**

- Multiple pages ek sath open kar sakta hai
- Parallel processing for better performance
- Smart delay between operations

### **Caching**

- Page data cached for faster access
- Agent status cached for quick lookups
- Session data cached for real-time updates

### **Error Handling**

- Graceful error handling for browser operations
- Fallback mechanisms for different platforms
- Retry logic for failed operations

## 🔒 Security Features

### **Access Control**

- API endpoints protected
- Agent assignment validation
- Session management security

### **Data Validation**

- Input validation for all operations
- URL sanitization
- Agent ID validation

## 📝 Development Guidelines

### **Adding New Pages**

```javascript
// lib/utils/urlManager.ts mein add karein
this.addPage({
  id: 'new-page',
  title: 'New Page',
  url: '/new-page',
  description: 'Description of new page',
  status: 'development',
  completion: 50,
  category: 'New Category',
  lastUpdated: new Date(),
  priority: 'medium',
  tags: ['new', 'feature'],
});
```

### **Adding New Agents**

```javascript
// lib/utils/autoBrowser.ts mein add karein
{
  id: 'agent-006',
  name: 'New Agent',
  expertise: ['skill1', 'skill2'],
  currentPages: [],
  status: 'available',
  lastActive: new Date()
}
```

## 🐛 Troubleshooting

### **Common Issues**

1. **Browser not opening**
   - Check if browser path is correct
   - Try different browser options
   - Check system permissions

2. **Agent assignment failing**
   - Check agent availability
   - Verify agent expertise
   - Check page requirements

3. **Pages not loading**
   - Verify server is running
   - Check URL configuration
   - Validate page IDs

### **Debug Mode**

```bash
# Debug mode mein run karein
DEBUG=true npm run url-manager
```

## 📞 Support

### **Documentation**

- API documentation: `/api/url-management`
- Component documentation: `components/URLManagementDashboard.tsx`
- CLI documentation: `scripts/url-manager.js`

### **Logs**

- System logs: `logs/url-manager.log`
- Error logs: `logs/url-manager-error.log`
- Access logs: `logs/url-manager-access.log`

## 🔮 Future Enhancements

### **Planned Features**

- **AI-powered routing**: Smart page routing based on user behavior
- **Advanced analytics**: Detailed usage analytics and insights
- **Multi-project support**: Support for multiple projects
- **Team collaboration**: Team-based agent assignment
- **Integration APIs**: Third-party integrations
- **Mobile support**: Mobile app for URL management

### **Performance Improvements**

- **WebSocket support**: Real-time updates
- **Service workers**: Offline support
- **Progressive web app**: PWA features
- **Advanced caching**: Intelligent caching strategies

---

**🎉 EHB URL Management System - Complete Digital Ecosystem Management!**
