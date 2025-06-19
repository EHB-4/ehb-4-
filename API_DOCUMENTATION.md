# 🧠 EHB Next.js 04 - Complete API Documentation

## 📋 Table of Contents

- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Testing Instructions](#testing-instructions)
- [Seed Data](#seed-data)

---

## 🔐 Authentication

### Authentication Method

- **Provider**: NextAuth.js with Credentials Provider
- **Strategy**: JWT (JSON Web Tokens)
- **Session Management**: Server-side sessions

### Authentication Required Endpoints

Most endpoints require authentication via NextAuth session. Unauthenticated requests return `401 Unauthorized`.

---

## 🌍 Environment Variables

### Required Environment Variables

```bash
# Database
DATABASE_URL="mongodb://localhost:27017/ehb-nextjs-04"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Blockchain/Web3
NEXT_PUBLIC_CONTRACT_ADDRESS="0x0000000000000000000000000000000000000000"
NEXT_PUBLIC_MOONBEAM_RPC=""
NEXT_PUBLIC_BSC_RPC=""
NEXT_PUBLIC_POLKADOT_RPC=""
NEXT_PUBLIC_MOONBEAM_WSS=""
NEXT_PUBLIC_BSC_WSS=""
NEXT_PUBLIC_POLKADOT_WSS=""
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=""
MOONBEAM_RPC_URL=""
POLKADOT_WS="wss://rpc.polkadot.io"
ETHEREUM_RPC_URL=""

# External APIs
OPENAI_API_KEY=""
PAYONEER_API_KEY=""
PAYONEER_PARTNER_ID=""
PAYONEER_API_URL=""
SHOPIFY_API_KEY=""
SHOPIFY_API_SECRET=""
SHOPIFY_ACCESS_TOKEN=""
SHOPIFY_SHOP_DOMAIN=""
SHOPIFY_API_URL=""

# Redis/Cache
REDIS_URL="redis://localhost:6379"
UPSTASH_REDIS_URL=""
UPSTASH_REDIS_TOKEN=""

# Healthcare
FHIR_SERVER_URL=""
FHIR_AUTH_TOKEN=""

# KYC/Identity
ONFIDO_API_TOKEN=""

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=""

# Payoneer Legacy
PAYONEER_USERNAME=""
PAYONEER_PASSWORD=""
```

---

## 🗄️ Database Models

### Prisma Schema (MongoDB)

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String?
  email String? @unique
  role  String @default("user")
}
```

### Additional Collections (MongoDB Native)

- `users` - User profiles and settings
- `certificates` - User certificates and achievements
- `studyResources` - Educational resources
- `medicalRecords` - Healthcare records
- `prescriptions` - Medical prescriptions
- `assignments` - Educational assignments
- `grades` - Student grades
- `wallet` - User wallet and transactions
- `orders` - E-commerce orders
- `products` - Product catalog
- `advertisements` - EHB Ads system
- `payoneerRequests` - Payment requests
- `openAIRequests` - AI service usage

---

## 🚀 API Endpoints

### 🔐 Authentication Endpoints

#### `GET/POST /api/auth/[...nextauth]`

- **Description**: NextAuth.js authentication handler
- **Authentication**: Not required
- **Methods**: GET, POST
- **Usage**: Handles sign-in, sign-out, and session management

#### `GET /api/auth/test`

- **Description**: Test authentication status
- **Authentication**: Required
- **Response**: Session information or unauthenticated status

#### `POST /api/auth/register`

- **Description**: User registration
- **Authentication**: Not required
- **Body**: `{ email, password, name }`
- **Response**: Created user (password excluded)

### 👤 User Management

#### `GET /api/user/profile`

- **Description**: Get user profile
- **Authentication**: Required
- **Response**: User profile data

#### `PUT /api/user/profile`

- **Description**: Update user profile
- **Authentication**: Required
- **Body**: `{ name?, role?, phone?, address? }`
- **Validation**: Zod schema validation

#### `GET /api/user/settings`

- **Description**: Get user settings
- **Authentication**: Required
- **Response**: User preferences

#### `POST /api/user/settings`

- **Description**: Update user settings
- **Authentication**: Required
- **Body**: Settings object

### 💰 Wallet & Transactions

#### `GET /api/wallet`

- **Description**: Get wallet balance and information
- **Authentication**: Required
- **Response**: Wallet data with balance

#### `PUT /api/wallet`

- **Description**: Perform wallet actions (lock, unlock, etc.)
- **Authentication**: Required
- **Body**: `{ action, amount, loyaltyType? }`
- **Actions**: lock, unlock, transfer

#### `GET /api/wallet/transactions`

- **Description**: Get transaction history
- **Authentication**: Required
- **Query Parameters**: `page`, `limit`, `sortBy`, `sortOrder`
- **Response**: Paginated transaction list

### 🏥 Healthcare

#### `GET /api/medical-records`

- **Description**: Get medical records
- **Authentication**: Required
- **Query Parameters**: `patientId` or `doctorId`
- **Response**: Medical records with patient/doctor info

#### `POST /api/medical-records`

- **Description**: Create medical record
- **Authentication**: Required
- **Body**: Medical record schema
- **Validation**: Zod schema validation

#### `GET /api/prescriptions`

- **Description**: Get prescriptions
- **Authentication**: Required
- **Query Parameters**: `patientId` or `doctorId`
- **Response**: Valid prescriptions

#### `POST /api/prescriptions`

- **Description**: Create prescription
- **Authentication**: Required
- **Body**: Prescription schema
- **Validation**: Zod schema validation

### 🎓 Education

#### `GET /api/assignments`

- **Description**: Get assignments
- **Authentication**: Required
- **Query Parameters**: `courseId` or `tutorId`
- **Response**: Assignments with submissions

#### `POST /api/assignments`

- **Description**: Create assignment
- **Authentication**: Required
- **Body**: Assignment schema
- **Validation**: Zod schema validation

#### `GET /api/grades`

- **Description**: Get grades
- **Authentication**: Required
- **Query Parameters**: `studentId`, `courseId`, or `assignmentId`
- **Response**: Grades with related data

#### `POST /api/grades`

- **Description**: Create grade
- **Authentication**: Required
- **Body**: Grade schema
- **Validation**: Zod schema validation

### 🛒 E-commerce

#### `GET /api/products`

- **Description**: Get products
- **Authentication**: Not required
- **Response**: Product list

#### `POST /api/products`

- **Description**: Create product
- **Authentication**: Required
- **Body**: Product data
- **Response**: Created product

#### `DELETE /api/products`

- **Description**: Delete product
- **Authentication**: Required
- **Body**: `{ id }`
- **Response**: Success status

#### `GET /api/products/[id]`

- **Description**: Get specific product
- **Authentication**: Not required
- **Response**: Product details

#### `PUT /api/products/[id]`

- **Description**: Update product
- **Authentication**: Required
- **Body**: Product data
- **Response**: Updated product

#### `DELETE /api/products/[id]`

- **Description**: Delete specific product
- **Authentication**: Required
- **Response**: Success status

#### `GET /api/orders`

- **Description**: Get orders
- **Authentication**: Required
- **Response**: Order list

#### `POST /api/orders`

- **Description**: Create order
- **Authentication**: Required
- **Body**: Order data
- **Response**: Created order

#### `PUT /api/orders`

- **Description**: Update order
- **Authentication**: Required
- **Body**: `{ id, ...updates }`
- **Response**: Updated order

#### `DELETE /api/orders`

- **Description**: Delete order
- **Authentication**: Required
- **Body**: `{ id }`
- **Response**: Success status

### 🛒 Shopping Features

#### `GET /api/cart`

- **Description**: Get cart items
- **Authentication**: Required
- **Response**: Cart contents

#### `POST /api/cart`

- **Description**: Add to cart
- **Authentication**: Required
- **Body**: Cart item data
- **Response**: Updated cart

#### `GET /api/wishlist`

- **Description**: Get wishlist
- **Authentication**: Required
- **Response**: Wishlist items

#### `POST /api/wishlist`

- **Description**: Add to wishlist
- **Authentication**: Required
- **Body**: Wishlist item data
- **Response**: Updated wishlist

#### `POST /api/checkout`

- **Description**: Process checkout
- **Authentication**: Required
- **Body**: Checkout data
- **Response**: Order confirmation

### 💳 Payment Integration

#### `POST /api/payoneer`

- **Description**: Payoneer payment operations
- **Authentication**: Required
- **Body**: `{ action, amount?, currency?, recipient_id?, description? }`
- **Actions**: create_account, get_balance, transfer, get_transactions

#### `GET /api/payoneer`

- **Description**: Get Payoneer requests and account
- **Authentication**: Required
- **Query Parameters**: `action`, `limit`, `offset`
- **Response**: Requests and account data

### 🏪 E-commerce Platforms

#### `POST /api/shopify`

- **Description**: Shopify operations
- **Authentication**: Required
- **Body**: `{ action, shopId?, productId?, data? }`
- **Actions**: create_shop, get_products, create_product, update_product, delete_product, get_orders, get_customers

### 🔗 Blockchain Integration

#### `GET /api/moonbeam`

- **Description**: Moonbeam blockchain queries
- **Authentication**: Not required
- **Query Parameters**: `address`, `txHash`, or `blockNumber`
- **Response**: Blockchain data

#### `POST /api/moonbeam`

- **Description**: Moonbeam blockchain operations
- **Authentication**: Required
- **Body**: `{ action, tokenAddress?, recipient?, amount?, spender? }`
- **Actions**: get_balance, transfer, approve, get_allowance

### 🤖 AI Services

#### `POST /api/openai`

- **Description**: OpenAI API integration
- **Authentication**: Required
- **Rate Limiting**: Yes (Redis-based)
- **Body**: OpenAI request schema
- **Response**: AI-generated content

#### `POST /api/ai-router`

- **Description**: AI intent routing
- **Authentication**: Required
- **Body**: `{ message, language }`
- **Response**: AI-processed response

### 📊 Analytics & Monitoring

#### `GET /api/analytics`

- **Description**: Get analytics data
- **Authentication**: Required
- **Response**: Analytics metrics

#### `GET /api/health`

- **Description**: Health check
- **Authentication**: Not required
- **Response**: Server status

#### `GET /api/health-check`

- **Description**: Detailed health check
- **Authentication**: Not required
- **Response**: System health information

#### `GET /api/health/db`

- **Description**: Database health check
- **Authentication**: Not required
- **Response**: Database connection status

### 🔄 Data Synchronization

#### `POST /api/sync`

- **Description**: Data synchronization
- **Authentication**: Required
- **Body**: `{ entityType, lastSyncTimestamp, filters? }`
- **Entity Types**: user, wallet, order, appointment, course
- **Response**: Sync data with pagination

#### `GET /api/sync`

- **Description**: Get sync data
- **Authentication**: Required
- **Query Parameters**: `entityType`, `lastSyncTimestamp`
- **Response**: Sync data

### 📱 Notifications

#### `GET /api/notifications`

- **Description**: Get notifications
- **Authentication**: Required
- **Response**: User notifications

#### `POST /api/notifications`

- **Description**: Create notification
- **Authentication**: Required
- **Body**: Notification data
- **Response**: Created notification

### 🔍 Search

#### `GET /api/search`

- **Description**: Search functionality
- **Authentication**: Required
- **Query Parameters**: `q` (query), `type`
- **Response**: Search results

### 📝 Feedback

#### `POST /api/feedback`

- **Description**: Submit feedback
- **Authentication**: Not required
- **Body**: `{ feedback }`
- **Response**: Success status

### 🏢 Admin

#### `GET /api/admin`

- **Description**: Admin dashboard data
- **Authentication**: Required (Admin role)
- **Response**: Admin statistics

#### `POST /api/admin`

- **Description**: Admin actions
- **Authentication**: Required (Admin role)
- **Body**: `{ action, data }`
- **Actions**: updateOrderStatus, updateProduct

### 🏥 Healthcare Services

#### `GET /api/doctors`

- **Description**: Get doctors
- **Authentication**: Required
- **Response**: Doctor list

#### `GET /api/appointments`

- **Description**: Get appointments
- **Authentication**: Required
- **Response**: Appointment list

#### `GET /api/availability`

- **Description**: Get availability
- **Authentication**: Required
- **Response**: Availability data

### 🎓 Educational Services

#### `GET /api/courses`

- **Description**: Get courses
- **Authentication**: Required
- **Response**: Course list

#### `GET /api/enrollments`

- **Description**: Get enrollments
- **Authentication**: Required
- **Response**: Enrollment list

#### `GET /api/tutors`

- **Description**: Get tutors
- **Authentication**: Required
- **Response**: Tutor list

### 🏪 Business Services

#### `GET /api/shops`

- **Description**: Get shops
- **Authentication**: Required
- **Response**: Shop list

#### `GET /api/inventory`

- **Description**: Get inventory
- **Authentication**: Required
- **Response**: Inventory items

#### `POST /api/inventory`

- **Description**: Add inventory item
- **Authentication**: Required
- **Body**: Inventory item data
- **Response**: Created item

#### `DELETE /api/inventory`

- **Description**: Delete inventory item
- **Authentication**: Required
- **Body**: `{ id }`
- **Response**: Success status

### 🏢 Franchise System

#### `GET /api/franchise`

- **Description**: Get franchise data
- **Authentication**: Required
- **Response**: Franchise information

### 📺 EHB Services

#### `GET /api/ehb-ads`

- **Description**: Get EHB ads
- **Authentication**: Required
- **Response**: Advertisement list

#### `POST /api/ehb-ads/verify`

- **Description**: Verify advertisement
- **Authentication**: Required (Admin/Franchise)
- **Body**: `{ adId, action, reason? }`
- **Response**: Verification result

#### `POST /api/ehb-ads/report`

- **Description**: Report advertisement
- **Authentication**: Required
- **Body**: `{ adId, reason, reportType }`
- **Response**: Report created

#### `GET /api/ehb-tube`

- **Description**: Get EHB Tube content
- **Authentication**: Required
- **Response**: Video content

### 🎓 OBS System

#### `GET /api/obs/certificate-log`

- **Description**: Get certificate logs
- **Authentication**: Required
- **Response**: Certificate history

### 🔐 KYC Services

#### `GET /api/kyc`

- **Description**: Get KYC status
- **Authentication**: Required
- **Response**: KYC information

### 🎯 PSS System

#### `POST /api/pss/sql/log`

- **Description**: SQL log migration
- **Authentication**: Required
- **Response**: Migration status

#### `POST /api/pss/sql/downgrade`

- **Description**: SQL downgrade
- **Authentication**: Required
- **Response**: Downgrade status

### 🎓 SQL System

#### `POST /api/sql/upgrade`

- **Description**: SQL upgrade
- **Authentication**: Required
- **Response**: Upgrade status

### 🏢 AM System

#### `GET /api/am`

- **Description**: AM system data
- **Authentication**: Required
- **Response**: AM information

### 🎯 Token System

#### `GET /api/token`

- **Description**: Token information
- **Authentication**: Required
- **Response**: Token data

### 🏢 GoSellr

#### `GET /api/gosellr`

- **Description**: GoSellr data
- **Authentication**: Required
- **Response**: GoSellr information

### 🏢 EHB AI Marketplace

#### `GET /api/ehb-ai-marketplace`

- **Description**: AI marketplace data
- **Authentication**: Required
- **Response**: Marketplace information

### 🏢 EHB Dashboard

#### `GET /api/ehb-dashboard`

- **Description**: EHB dashboard data
- **Authentication**: Required
- **Response**: Dashboard metrics

### 🏢 EHB Wallet

#### `GET /api/ehb-wallet`

- **Description**: EHB wallet data
- **Authentication**: Required
- **Response**: Wallet information

### 🏢 EHB Home Page

#### `GET /api/ehb-home-page`

- **Description**: Home page data
- **Authentication**: Required
- **Response**: Home page content

### 🏢 EHB Company Info

#### `GET /api/ehb-company-info`

- **Description**: Company information
- **Authentication**: Required
- **Response**: Company data

### 🏢 EHB AI Agent

#### `GET /api/ehb-ai-agent`

- **Description**: AI agent data
- **Authentication**: Required
- **Response**: Agent information

### 🏢 EHB Franchise

#### `GET /api/ehb-franchise`

- **Description**: Franchise data
- **Authentication**: Required
- **Response**: Franchise information

### 🏢 EHB Tube

#### `GET /api/ehb-tube`

- **Description**: EHB Tube data
- **Authentication**: Required
- **Response**: Tube content

### 🏢 EHB Ads

#### `GET /api/ehb-ads`

- **Description**: EHB Ads data
- **Authentication**: Required
- **Response**: Ads information

### 🏢 EHB AI Market Place

#### `GET /api/ehb-ai-market-place`

- **Description**: AI market place data
- **Authentication**: Required
- **Response**: Market place information

### 🏢 EHB Dashboard

#### `GET /api/ehb-dashboard`

- **Description**: EHB dashboard data
- **Authentication**: Required
- **Response**: Dashboard information

### 🏢 EHB Wallet

#### `GET /api/ehb-wallet`

- **Description**: EHB wallet data
- **Authentication**: Required
- **Response**: Wallet information

### 🏢 EHB Home Page

#### `GET /api/ehb-home-page`

- **Description**: Home page data
- **Authentication**: Required
- **Response**: Home page information

### 🏢 EHB Company Info

#### `GET /api/ehb-company-info`

- **Description**: Company information
- **Authentication**: Required
- **Response**: Company data

### 🏢 EHB AI Agent

#### `GET /api/ehb-ai-agent`

- **Description**: AI agent data
- **Authentication**: Required
- **Response**: Agent information

### 🏢 EHB Franchise

#### `GET /api/ehb-franchise`

- **Description**: Franchise data
- **Authentication**: Required
- **Response**: Franchise information

### 🏢 EHB Tube

#### `GET /api/ehb-tube`

- **Description**: EHB Tube data
- **Authentication**: Required
- **Response**: Tube content

### 🏢 EHB Ads

#### `GET /api/ehb-ads`

- **Description**: EHB Ads data
- **Authentication**: Required
- **Response**: Ads information

### 🏢 EHB AI Market Place

#### `GET /api/ehb-ai-market-place`

- **Description**: AI market place data
- **Authentication**: Required
- **Response**: Market place information

---

## 🧪 Testing Instructions

### Postman Collection Setup

1. **Import Environment Variables**

   ```json
   {
     "baseUrl": "http://localhost:3000",
     "authToken": "{{sessionToken}}"
   }
   ```

2. **Authentication Flow**

   ```
   POST {{baseUrl}}/api/auth/register
   Body: {
     "email": "test@example.com",
     "password": "test123",
     "name": "Test User"
   }
   ```

3. **Get Session Token**

   ```
   POST {{baseUrl}}/api/auth/[...nextauth]
   Body: {
     "email": "test@example.com",
     "password": "test123"
   }
   ```

4. **Set Authorization Header**
   ```
   Authorization: Bearer {{authToken}}
   ```

### Example API Calls

#### Health Check

```bash
curl -X GET http://localhost:3000/api/health
```

#### Get User Profile (Authenticated)

```bash
curl -X GET http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Create Product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Test Product",
    "price": 99.99,
    "description": "Test description"
  }'
```

#### Wallet Operations

```bash
curl -X PUT http://localhost:3000/api/wallet \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "action": "lock",
    "amount": 100
  }'
```

---

## 🌱 Seed Data

### Default Test User

```json
{
  "email": "test@example.com",
  "password": "test123",
  "name": "Test User"
}
```

### Sample Certificates

- SQL Basics Certification (85% score)
- Advanced SQL Certification (92% score)

### Sample Study Resources

- SQL Fundamentals Guide (Beginner level)
- Advanced SQL Exercises (Advanced level)

### Database Setup

```bash
# Run seed script
npx prisma db seed

# Or manually
npm run seed
```

---

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- MongoDB
- Redis (for rate limiting)
- Docker (optional)

### Installation

```bash
npm install
npm run dev
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

---

## 📊 API Statistics

- **Total Endpoints**: 80+
- **Authentication Required**: 85%
- **Rate Limited**: 10%
- **External Integrations**: 15+
- **Database Collections**: 20+

---

## 🚨 Important Notes

1. **Authentication**: Most endpoints require valid NextAuth session
2. **Rate Limiting**: OpenAI and some payment endpoints have rate limits
3. **Validation**: All POST/PUT requests use Zod schema validation
4. **Error Handling**: Consistent error response format
5. **CORS**: Configured for development and production
6. **Security**: JWT tokens, input validation, and role-based access

---

## 📞 Support

For API support and questions:

- Check the logs in `/logs/` directory
- Review error responses for detailed information
- Use the health check endpoints for system status
- Monitor rate limiting headers in responses

---

_Last Updated: December 2024_
_Version: 1.0.0_
