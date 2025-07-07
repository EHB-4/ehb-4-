# EHB SQL Level System - Complete Documentation

## Overview

EHB SQL (Service Quality Level) System is a comprehensive trust and quality management framework that categorizes users into 5 levels based on their trust, performance, and commitment. The system integrates AI scoring, blockchain verification, and affiliate rewards.

## 🏗️ System Architecture

### Database Schema

The SQL Level System uses the following Prisma models:

```prisma
// User model with SQL Level fields
model User {
  // ... existing fields ...

  // SQL Level System
  sqlLevel      Int      @default(0)
  sqlStatus     SQLStatus @default(FREE)
  sqlIssuedBy   String?
  sqlVerifiedAt DateTime?
  sqlExpiryDate DateTime?
  aiScore       Int      @default(0)
  fraudScore    Float    @default(0)
  complaintCount Int     @default(0)
  badgeNftHash  String?

  // Relations
  sqlProfile     SQLProfile?
  sqlHistory     SQLHistory[]
  skillTests     SkillTest[]
  coinLocks      CoinLock[]
  upgradeRequests SQLUpgradeRequest[]
}

// SQL Level specific models
model SQLProfile {
  id          String   @id @default(cuid())
  userId      String   @unique
  level       Int      @default(0)
  isActive    Boolean  @default(true)
  benefits    String[]
  restrictions String[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model SQLHistory {
  id          String   @id @default(cuid())
  userId      String
  oldLevel    Int
  newLevel    Int
  reason      String
  aiScore     Int
  blockchainHash String?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model SkillTest {
  id          String   @id @default(cuid())
  userId      String
  testType    SkillTestType
  score       Int
  passed      Boolean
  testData    Json?
  createdAt   DateTime @default(now())

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model CoinLock {
  id          String   @id @default(cuid())
  userId      String
  amount      Float
  duration    Int // months
  startDate   DateTime @default(now())
  endDate     DateTime
  status      CoinLockStatus @default(ACTIVE)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model SQLUpgradeRequest {
  id          String   @id @default(cuid())
  userId      String
  fromLevel   Int
  toLevel     Int
  status      UpgradeRequestStatus @default(PENDING)
  documents   Json?
  notes       String?
  reviewedBy  String?
  reviewedAt  DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## 🔢 SQL Level Breakdown

| Level | Title  | Requirements                | Benefits         | Coin Lock  |
| ----- | ------ | --------------------------- | ---------------- | ---------- |
| 0     | Free   | Signup only                 | Basic access     | None       |
| 1     | Basic  | PSS KYC + 1 referral        | Enhanced access  | 100 EHBGC  |
| 2     | Normal | 2 Referrals + Skill test    | Full access      | 500 EHBGC  |
| 3     | High   | 5 Active users + Sales      | Premium features | 1500 EHBGC |
| 4     | VIP    | 10 Active users + Franchise | Elite status     | 5000 EHBGC |

## 🚀 API Endpoints

### 1. Get SQL Level Info

```http
GET /api/sql/get-level
```

**Response:**

```json
{
  "currentLevel": 1,
  "issuedBy": "PSS Verification Team",
  "issuedAt": "2024-01-15T00:00:00.000Z",
  "expiryDate": "2025-01-15T00:00:00.000Z",
  "verificationStatus": "verified",
  "benefits": ["Enhanced marketplace access", "Franchise eligibility"],
  "restrictions": ["No validator access"],
  "aiScore": 75,
  "fraudScore": 0.05,
  "complaintCount": 1,
  "badgeNftHash": "0x123...",
  "upgradeEligibility": {
    "eligible": true,
    "requirements": {
      "aiScore": { "current": 75, "required": 150 },
      "coinLock": { "current": 100, "required": 500 }
    }
  },
  "activeCoinLocks": 1,
  "totalLockedAmount": 100,
  "recentSkillTests": [
    {
      "type": "MCQ",
      "score": 85,
      "passed": true,
      "date": "2024-01-10T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Progress

```http
GET /api/sql/progress
```

**Response:**

```json
{
  "currentLevel": 1,
  "progress": 65,
  "nextLevelRequirements": [
    {
      "description": "Achieve AI Score of 150+",
      "completed": false,
      "current": 75,
      "required": 150,
      "progress": 50
    }
  ],
  "aiScore": 75,
  "totalLockedAmount": 100,
  "passedSkillTests": 1,
  "totalSkillTests": 1,
  "recentActivity": [
    {
      "fromLevel": 0,
      "toLevel": 1,
      "reason": "PSS verification completed",
      "date": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

### 3. Submit Upgrade Request

```http
POST /api/sql/upgrade
Content-Type: application/json

{
  "targetLevel": 2,
  "documents": {
    "skillTest": "test-results.pdf",
    "kyc": "identity-docs.pdf"
  },
  "notes": "Ready for next level upgrade"
}
```

### 4. Skill Test

```http
POST /api/sql/skill-test
Content-Type: application/json

{
  "testType": "MCQ",
  "answers": {
    "q1": "a",
    "q2": "b"
  },
  "projectData": null
}
```

## 🎨 Frontend Components

### 1. SQLUserInfo Component

Displays current SQL level information, benefits, restrictions, and financial status.

**Props:**

```typescript
interface SQLUserInfoProps {
  currentLevel: number;
  issuedBy: string;
  issuedAt: string;
  expiryDate?: string;
  verificationStatus: 'verified' | 'pending' | 'expired';
  benefits: string[];
  restrictions: string[];
  aiScore: number;
  fraudScore: number;
  complaintCount: number;
  badgeNftHash?: string;
  upgradeEligibility?: any;
  activeCoinLocks: number;
  totalLockedAmount: number;
  recentSkillTests: any[];
  className?: string;
}
```

### 2. SQLProgress Component

Shows progress towards the next SQL level with requirements tracking.

**Props:**

```typescript
interface SQLProgressProps {
  currentLevel: SQLLevel;
  progress: number; // 0-100
  nextLevelRequirements?: {
    description: string;
    completed: boolean;
  }[];
  className?: string;
}
```

### 3. SQLUpgradeSteps Component

Displays upgrade steps and their completion status.

**Props:**

```typescript
interface SQLUpgradeStepsProps {
  currentLevel: SQLLevel;
  targetLevel: SQLLevel;
  steps: UpgradeStep[];
  onStepClick?: (stepId: string) => void;
  className?: string;
}
```

## 🔧 Setup Instructions

### 1. Database Setup

```bash
# Generate Prisma client
npm run sql-generate

# Run migrations
npm run sql-migrate

# Seed sample data
npm run sql-seed
```

### 2. Complete Setup

```bash
# Run complete SQL Level setup
npm run sql-setup
```

### 3. Testing

```bash
# Test the system
npm run sql-test
```

## 🧠 AI Score Calculation

The AI score is calculated based on multiple factors:

```typescript
function calculateAIScore(user: any): number {
  let score = 0;

  // Base score
  score += 25;

  // Skill test score (20 points per passed test)
  const passedTests = user.skillTests.filter(test => test.passed).length;
  score += passedTests * 20;

  // Coin lock score (max 15 points)
  const totalLocked = user.coinLocks.reduce((sum, lock) => sum + lock.amount, 0);
  score += Math.min(totalLocked / 100, 15);

  // Complaint penalty (-10 points per complaint)
  score -= user.complaintCount * 10;

  // Fraud penalty (50% reduction if fraud score > 0.7)
  if (user.fraudScore > 0.7) {
    score *= 0.5;
  }

  return Math.max(0, Math.min(500, Math.round(score)));
}
```

## 🔐 Security Features

1. **Multi-layer Verification**: PSS + EDR + EMO
2. **Blockchain Integration**: Immutable audit trail
3. **AI Fraud Detection**: Real-time monitoring
4. **6-Monthly Reviews**: Automatic re-verification
5. **Coin Locking**: Financial commitment requirement

## 📊 Analytics & Reporting

The system provides comprehensive analytics:

- SQL level distribution
- Upgrade success rates
- Fraud detection metrics
- User engagement patterns
- Financial impact analysis

## 🔄 Integration Points

### 1. Affiliate System

- SQL level affects commission rates
- Higher levels unlock more referral tiers
- Bonus multipliers based on SQL level

### 2. Franchise System

- SQL level required for franchise purchase
- Higher levels get better franchise terms
- Validator eligibility for VIP users

### 3. Marketplace Integration

- Search ranking affected by SQL level
- Feature access based on level
- Transaction limits and fees

## 🚀 Future Enhancements

1. **AI Forecasting**: Predict SQL level improvements
2. **Voice-based Upgrades**: AI assistant integration
3. **Country-specific Policies**: Local compliance
4. **Advanced Analytics**: Machine learning insights
5. **Mobile App**: Native mobile experience

## 📝 Troubleshooting

### Common Issues

1. **Database Migration Errors**

   ```bash
   npx prisma migrate reset
   npm run sql-migrate
   ```

2. **API Endpoint Errors**
   - Check authentication
   - Verify database connection
   - Review Prisma client generation

3. **Frontend Component Errors**
   - Check TypeScript types
   - Verify API responses
   - Review component props

### Support

For technical support, refer to:

- API Documentation: `/docs/api.md`
- Database Schema: `prisma/schema.prisma`
- Component Library: `components/SQL/`

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Status**: Production Ready
