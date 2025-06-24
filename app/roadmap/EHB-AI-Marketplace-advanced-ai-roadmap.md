# EHB AI Marketplace — Advanced AI-Based Roadmap

---

## 📄 Reference

[Google Doc: EHB AI Marketplace — Advanced AI-Based Model](https://docs.google.com/document/d/10PBkq38R5rMlOr4TeooDmfMzzwIZ4a6cM0lBnZfK4Jg/edit?tab=t.0#heading=h.el0nrjsvnvy6)

---

## 👤 User Schema (AI-based Fields)

```ts
User {
  id: string;
  name: string;
  email: string;
  role: enum('buyer', 'seller', 'affiliate', 'admin', 'marketplace_manager', 'support');
  KYCStatus: enum('pending', 'verified', 'rejected');
  trustScore: number;
  registrationDate: date;
  lastLogin: date;
  walletBalance: { EHB: number; Crypto: number; LocalCurrency: number; };
  activeStatus: boolean;
  languagePreference: string;
  referredBy: string;
}
```

---

## 🛒 AI Marketplace Listing Schema

```ts
MarketplaceListing {
  id: string;
  title: string;
  description: string;
  mediaUrls: string[];
  category: string;
  tags: string[];
  price: number;
  sellerId: string;
  status: enum('pending', 'active', 'suspended', 'removed');
  ratings: number;
  totalReviews: number;
  views: number;
  isVerified: boolean;
  verificationDate: date;
  AIInsights: {
    demandScore: number;
    trendingRank: number;
    complaintRisk: number;
  };
}
```

---

## 🛒 Order Schema (AI Marketplace)

```ts
Order {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  amount: number;
  paymentMethod: enum('wallet', 'crypto', 'card', 'bank', 'cash');
  status: enum('pending', 'paid', 'in_process', 'delivered', 'completed', 'disputed', 'refunded');
  createdAt: date;
  expectedDeliveryDate: date;
  AIFlags: {
    delayRisk: number;
    fraudRisk: number;
  };
  referralCommission: number;
  coinsUsed: number;
  paymentStatus: enum('pending', 'confirmed', 'failed');
  deliveryRating: number;
}
```

---

## ⚠️ Complaint Schema (AI Marketplace)

```ts
Complaint {
  id: string;
  orderId: string;
  raisedBy: string;
  assignedTo: string;
  status: enum('open', 'resolved', 'escalated', 'closed', 'auto-escalated');
  reason: string;
  resolution: string;
  fine: number;
  createdAt: date;
  resolvedAt: date;
  AIAnalysis: {
    responseTime: number;
    fault: enum('buyer', 'seller', 'system', 'pending');
    autoEscalateTime: date;
  };
  recordedVoice: string;
}
```

---

## 🧩 Key AI/Blockchain Features (Marketplace)

| Feature                   | Description                                  |
| ------------------------- | -------------------------------------------- |
| **AI Seller Ranking**     | AI-based trust, trending, and demand scoring |
| **Blockchain Audit**      | Orders and complaints traceable on-chain     |
| **Escrow Wallet**         | Secure payment, auto-release on delivery     |
| **Order Risk Analysis**   | AI flags for fraud/delay                     |
| **Smart Tags & Trending** | AI auto-tags, trending products              |

---

## ✅ Advanced AI-Based REST API (Marketplace)

### 🔎 GET /api/marketplace/listings

- Params: category, tags, search, priceRange
- Returns: MarketplaceListing[]
- AI: Auto-sort, trending, smart recommendations

### 🛒 POST /api/marketplace/orders

- Body: listingId, buyerId, paymentMethod, coinsUsed
- Returns: Order
- AI: Wallet/validation, delay risk

### 👤 GET /api/marketplace/users/:id

- Returns: User
- AI: trustScore, KYC, referral

### ⚠️ POST /api/marketplace/complaints

- Body: orderId, reason, raisedBy, voiceNoteUrl
- Returns: Complaint
- AI: Assignment, fault prediction

---

## 🧑‍💼 User Flows (AI Marketplace)

### Seller Onboarding Flow

1. Register account
2. Select role = Seller
3. Submit KYC
4. Create listing
5. AI checks, status assigned
6. Go live

### Buyer Order Flow

1. Register/Login
2. Search/Filter
3. Place order
4. Payment to escrow
5. Delivery assigned
6. Confirm delivery
7. Feedback

### Affiliate Earning Flow

1. Register, get referral link
2. Share, track, earn commission
3. Dashboard for earnings

---

## ⚠️ Complaint Escalation Flow

- 6hr resolve, auto-escalate, fine if unresolved

## 💸 Earning Split Logic

| Stakeholder | Earning % |
| ----------- | --------- |
| Company     | 30%       |
| Seller      | 60%       |
| Affiliate   | 10%       |

---

## 🧩 Developer Portal Structure (Marketplace)

- API Docs (Swagger/Postman)
- Integration Guides (web, mobile, payment, affiliate)
- SDK Downloads (JS, Node, Flutter, Python)
- Changelog/Updates
- Support/Contact
- Test User Accounts
- Playground Panel
- **SCO (Service/Company Onboarding) Tab**
  - Real-time onboarding progress bar for each service/company
  - Data structure: see below

---

## 🆕 SCO (Service/Company Onboarding) Section

```yaml
SCOEntry:
  companyName: 'EHB'
  serviceName: 'AI Marketplace'
  onboardingSteps:
    - step: 'Initial Data Collection'
      status: 'completed'
      owner: 'Ali'
      startedAt: '2024-06-20'
      completedAt: '2024-06-21'
      blockers: []
    - step: 'API Schema Design'
      status: 'in_progress'
      owner: 'Sara'
      startedAt: '2024-06-22'
      completedAt: null
      blockers: ['Waiting for product data']
    - step: 'Frontend Integration'
      status: 'not_started'
      owner: 'UI Team'
      startedAt: null
      completedAt: null
      blockers: []
  progress: 40
  currentStatus: 'API Schema Design in progress'
  expectedGoLive: '2024-07-10'
  notes: 'Product data required for next step'
```

---

**Next: Upload next service data here for roadmap expansion.**
