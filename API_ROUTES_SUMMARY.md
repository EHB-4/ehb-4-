# 🧠 EHB Next.js 04 - API Routes Summary

## 📊 Quick Statistics

- **Total API Routes**: 80+
- **Authentication Required**: 85%
- **HTTP Methods**: GET, POST, PUT, DELETE
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js with JWT

---

## 🔐 Authentication Routes

| Method   | Path                      | Auth Required | Description                |
| -------- | ------------------------- | ------------- | -------------------------- |
| GET/POST | `/api/auth/[...nextauth]` | ❌            | NextAuth.js handler        |
| GET      | `/api/auth/test`          | ✅            | Test authentication status |
| POST     | `/api/auth/register`      | ❌            | User registration          |

---

## 👤 User Management Routes

| Method | Path                 | Auth Required | Description          |
| ------ | -------------------- | ------------- | -------------------- |
| GET    | `/api/user/profile`  | ✅            | Get user profile     |
| PUT    | `/api/user/profile`  | ✅            | Update user profile  |
| GET    | `/api/user/settings` | ✅            | Get user settings    |
| POST   | `/api/user/settings` | ✅            | Update user settings |

---

## 💰 Wallet & Financial Routes

| Method | Path                       | Auth Required | Description                  |
| ------ | -------------------------- | ------------- | ---------------------------- |
| GET    | `/api/wallet`              | ✅            | Get wallet balance           |
| PUT    | `/api/wallet`              | ✅            | Wallet actions (lock/unlock) |
| GET    | `/api/wallet/transactions` | ✅            | Transaction history          |
| POST   | `/api/payoneer`            | ✅            | Payoneer operations          |
| GET    | `/api/payoneer`            | ✅            | Payoneer requests            |

---

## 🏥 Healthcare Routes

| Method | Path                   | Auth Required | Description           |
| ------ | ---------------------- | ------------- | --------------------- |
| GET    | `/api/medical-records` | ✅            | Get medical records   |
| POST   | `/api/medical-records` | ✅            | Create medical record |
| GET    | `/api/prescriptions`   | ✅            | Get prescriptions     |
| POST   | `/api/prescriptions`   | ✅            | Create prescription   |
| GET    | `/api/doctors`         | ✅            | Get doctors           |
| GET    | `/api/appointments`    | ✅            | Get appointments      |
| GET    | `/api/availability`    | ✅            | Get availability      |

---

## 🎓 Education Routes

| Method | Path               | Auth Required | Description       |
| ------ | ------------------ | ------------- | ----------------- |
| GET    | `/api/assignments` | ✅            | Get assignments   |
| POST   | `/api/assignments` | ✅            | Create assignment |
| GET    | `/api/grades`      | ✅            | Get grades        |
| POST   | `/api/grades`      | ✅            | Create grade      |
| GET    | `/api/courses`     | ✅            | Get courses       |
| GET    | `/api/enrollments` | ✅            | Get enrollments   |
| GET    | `/api/tutors`      | ✅            | Get tutors        |

---

## 🛒 E-commerce Routes

| Method | Path                 | Auth Required | Description             |
| ------ | -------------------- | ------------- | ----------------------- |
| GET    | `/api/products`      | ❌            | Get products            |
| POST   | `/api/products`      | ✅            | Create product          |
| DELETE | `/api/products`      | ✅            | Delete product          |
| GET    | `/api/products/[id]` | ❌            | Get specific product    |
| PUT    | `/api/products/[id]` | ✅            | Update product          |
| DELETE | `/api/products/[id]` | ✅            | Delete specific product |
| GET    | `/api/orders`        | ✅            | Get orders              |
| POST   | `/api/orders`        | ✅            | Create order            |
| PUT    | `/api/orders`        | ✅            | Update order            |
| DELETE | `/api/orders`        | ✅            | Delete order            |
| GET    | `/api/cart`          | ✅            | Get cart                |
| POST   | `/api/cart`          | ✅            | Add to cart             |
| GET    | `/api/wishlist`      | ✅            | Get wishlist            |
| POST   | `/api/wishlist`      | ✅            | Add to wishlist         |
| POST   | `/api/checkout`      | ✅            | Process checkout        |

---

## 🏪 Business & Inventory Routes

| Method | Path             | Auth Required | Description           |
| ------ | ---------------- | ------------- | --------------------- |
| GET    | `/api/inventory` | ✅            | Get inventory         |
| POST   | `/api/inventory` | ✅            | Add inventory item    |
| DELETE | `/api/inventory` | ✅            | Delete inventory item |
| GET    | `/api/shops`     | ✅            | Get shops             |
| POST   | `/api/shopify`   | ✅            | Shopify operations    |

---

## 🔗 Blockchain & Web3 Routes

| Method | Path                   | Auth Required | Description         |
| ------ | ---------------------- | ------------- | ------------------- |
| GET    | `/api/moonbeam`        | ❌            | Moonbeam queries    |
| POST   | `/api/moonbeam`        | ✅            | Moonbeam operations |
| GET    | `/api/moonbeam/tokens` | ✅            | Token operations    |

---

## 🤖 AI & Machine Learning Routes

| Method | Path             | Auth Required | Description        |
| ------ | ---------------- | ------------- | ------------------ |
| POST   | `/api/openai`    | ✅            | OpenAI integration |
| POST   | `/api/ai-router` | ✅            | AI intent routing  |

---

## 📊 Analytics & Monitoring Routes

| Method | Path                | Auth Required | Description           |
| ------ | ------------------- | ------------- | --------------------- |
| GET    | `/api/analytics`    | ✅            | Get analytics         |
| GET    | `/api/health`       | ❌            | Health check          |
| GET    | `/api/health-check` | ❌            | Detailed health check |
| GET    | `/api/health/db`    | ❌            | Database health       |

---

## 🔄 Data Sync Routes

| Method | Path        | Auth Required | Description          |
| ------ | ----------- | ------------- | -------------------- |
| POST   | `/api/sync` | ✅            | Data synchronization |
| GET    | `/api/sync` | ✅            | Get sync data        |

---

## 📱 Notification Routes

| Method | Path                 | Auth Required | Description         |
| ------ | -------------------- | ------------- | ------------------- |
| GET    | `/api/notifications` | ✅            | Get notifications   |
| POST   | `/api/notifications` | ✅            | Create notification |

---

## 🔍 Search Routes

| Method | Path          | Auth Required | Description          |
| ------ | ------------- | ------------- | -------------------- |
| GET    | `/api/search` | ✅            | Search functionality |

---

## 📝 Feedback Routes

| Method | Path            | Auth Required | Description     |
| ------ | --------------- | ------------- | --------------- |
| POST   | `/api/feedback` | ❌            | Submit feedback |

---

## 🏢 Admin Routes

| Method | Path         | Auth Required | Description     |
| ------ | ------------ | ------------- | --------------- |
| GET    | `/api/admin` | ✅            | Admin dashboard |
| POST   | `/api/admin` | ✅            | Admin actions   |

---

## 🏢 EHB Platform Routes

| Method | Path                       | Auth Required | Description      |
| ------ | -------------------------- | ------------- | ---------------- |
| GET    | `/api/ehb-ads`             | ✅            | EHB ads          |
| POST   | `/api/ehb-ads/verify`      | ✅            | Verify ads       |
| POST   | `/api/ehb-ads/report`      | ✅            | Report ads       |
| GET    | `/api/ehb-tube`            | ✅            | EHB Tube content |
| GET    | `/api/ehb-franchise`       | ✅            | Franchise data   |
| GET    | `/api/ehb-wallet`          | ✅            | EHB wallet       |
| GET    | `/api/ehb-dashboard`       | ✅            | EHB dashboard    |
| GET    | `/api/ehb-home-page`       | ✅            | Home page data   |
| GET    | `/api/ehb-company-info`    | ✅            | Company info     |
| GET    | `/api/ehb-ai-agent`        | ✅            | AI agent data    |
| GET    | `/api/ehb-ai-marketplace`  | ✅            | AI marketplace   |
| GET    | `/api/ehb-ai-market-place` | ✅            | AI market place  |

---

## 🎓 OBS System Routes

| Method | Path                       | Auth Required | Description      |
| ------ | -------------------------- | ------------- | ---------------- |
| GET    | `/api/obs/certificate-log` | ✅            | Certificate logs |

---

## 🔐 KYC Routes

| Method | Path       | Auth Required | Description |
| ------ | ---------- | ------------- | ----------- |
| GET    | `/api/kyc` | ✅            | KYC status  |

---

## 🎯 PSS & SQL Routes

| Method | Path                     | Auth Required | Description       |
| ------ | ------------------------ | ------------- | ----------------- |
| POST   | `/api/pss/sql/log`       | ✅            | SQL log migration |
| POST   | `/api/pss/sql/downgrade` | ✅            | SQL downgrade     |
| POST   | `/api/sql/upgrade`       | ✅            | SQL upgrade       |

---

## 🏢 AM System Routes

| Method | Path      | Auth Required | Description    |
| ------ | --------- | ------------- | -------------- |
| GET    | `/api/am` | ✅            | AM system data |

---

## 🎯 Token Routes

| Method | Path         | Auth Required | Description       |
| ------ | ------------ | ------------- | ----------------- |
| GET    | `/api/token` | ✅            | Token information |

---

## 🏢 GoSellr Routes

| Method | Path           | Auth Required | Description  |
| ------ | -------------- | ------------- | ------------ |
| GET    | `/api/gosellr` | ✅            | GoSellr data |

---

## 🏢 Profile Routes

| Method | Path           | Auth Required | Description    |
| ------ | -------------- | ------------- | -------------- |
| GET    | `/api/profile` | ✅            | Get profile    |
| PUT    | `/api/profile` | ✅            | Update profile |

---

## 🌍 Environment Variables Required

### Database

```bash
DATABASE_URL="mongodb://localhost:27017/ehb-nextjs-04"
```

### Authentication

```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### API Configuration

```bash
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Blockchain/Web3

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS="0x0000000000000000000000000000000000000000"
NEXT_PUBLIC_MOONBEAM_RPC=""
NEXT_PUBLIC_BSC_RPC=""
NEXT_PUBLIC_POLKADOT_RPC=""
MOONBEAM_RPC_URL=""
POLKADOT_WS="wss://rpc.polkadot.io"
ETHEREUM_RPC_URL=""
```

### External APIs

```bash
OPENAI_API_KEY=""
PAYONEER_API_KEY=""
PAYONEER_PARTNER_ID=""
PAYONEER_API_URL=""
SHOPIFY_API_KEY=""
SHOPIFY_API_SECRET=""
SHOPIFY_ACCESS_TOKEN=""
SHOPIFY_SHOP_DOMAIN=""
SHOPIFY_API_URL=""
```

### Redis/Cache

```bash
REDIS_URL="redis://localhost:6379"
UPSTASH_REDIS_URL=""
UPSTASH_REDIS_TOKEN=""
```

### Healthcare

```bash
FHIR_SERVER_URL=""
FHIR_AUTH_TOKEN=""
```

### KYC/Identity

```bash
ONFIDO_API_TOKEN=""
```

### Analytics

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=""
```

---

## 🗄️ Database Collections

### Prisma Models

- `User` - User accounts and profiles

### MongoDB Collections

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

## 🧪 Testing with Postman

### 1. Setup Environment

```json
{
  "baseUrl": "http://localhost:3000",
  "authToken": "{{sessionToken}}"
}
```

### 2. Authentication Flow

```bash
# Register user
POST {{baseUrl}}/api/auth/register
{
  "email": "test@example.com",
  "password": "test123",
  "name": "Test User"
}

# Sign in
POST {{baseUrl}}/api/auth/[...nextauth]
{
  "email": "test@example.com",
  "password": "test123"
}
```

### 3. Example API Calls

#### Health Check

```bash
GET {{baseUrl}}/api/health
```

#### Get User Profile

```bash
GET {{baseUrl}}/api/user/profile
Authorization: Bearer {{authToken}}
```

#### Create Product

```bash
POST {{baseUrl}}/api/products
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "name": "Test Product",
  "price": 99.99,
  "description": "Test description"
}
```

#### Wallet Operations

```bash
PUT {{baseUrl}}/api/wallet
Authorization: Bearer {{authToken}}
Content-Type: application/json

{
  "action": "lock",
  "amount": 100
}
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

---

## 🚨 Important Notes

1. **Authentication**: Most endpoints require valid NextAuth session
2. **Rate Limiting**: OpenAI and payment endpoints have rate limits
3. **Validation**: All POST/PUT requests use Zod schema validation
4. **Error Handling**: Consistent error response format
5. **CORS**: Configured for development and production
6. **Security**: JWT tokens, input validation, and role-based access

---

## 📞 Support

- Check logs in `/logs/` directory
- Review error responses for details
- Use health check endpoints for system status
- Monitor rate limiting headers

---

_Generated by Cursor AI - December 2024_
_Total Routes Detected: 80+_
