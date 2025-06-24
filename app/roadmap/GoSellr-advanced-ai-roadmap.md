# GoSellr Advanced AI-Based Roadmap

---

## 👤 User Schema (Advanced AI-based Fields Added)

```ts
User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: enum('buyer', 'seller', 'affiliate', 'franchise', 'admin', 'rider', 'support');
  SQL: enum('Free', 'Basic', 'Normal', 'High', 'VIP');
  SQLExpiry: date;
  KYCStatus: enum('pending', 'verified', 'rejected');
  verificationLevel: number;
  earnings: number;
  totalOrders: number;
  registrationDate: date;
  lastLogin: date;
  trustScore: number;
  location: { country: string; city: string; coordinates: { lat: number, lng: number } };
  referredBy: string;
  activeStatus: boolean;
  languagePreference: string;
  walletBalance: { EHB: number; Crypto: number; LocalCurrency: number; };
}
```

---

## 📦 ProductOrService Schema (AI + SQL Integrated)

```ts
ProductOrService {
  id: string;
  title: string;
  description: string;
  mediaUrls: string[];
  category: string;
  subCategory: string;
  tags: string[];
  price: number;
  priceInEHBGC: number;
  SQL: enum('Free', 'Basic', 'Normal', 'High', 'VIP');
  sellerId: string;
  sellerSQL: string;
  stock: number;
  status: enum('pending', 'active', 'suspended', 'removed');
  ratings: number;
  totalReviews: number;
  views: number;
  deliveryOptions: enum('self', 'franchise', 'digital');
  isVerified: boolean;
  verificationDate: date;
  AIInsights: { demandScore: number; nearbySearchRank: number; complaintRisk: number; };
}
```

---

## 🛒 Order Schema (AI Rules, Wallets, and Franchises)

```ts
Order {
  id: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  franchiseId: string;
  amount: number;
  paymentMethod: enum('wallet', 'crypto', 'card', 'bank', 'cash');
  deliveryType: enum('franchise', 'self', 'digital');
  status: enum('pending', 'paid', 'in_process', 'delivered', 'completed', 'disputed', 'refunded');
  createdAt: date;
  expectedDeliveryDate: date;
  AIFlags: { delayRisk: number; fraudRisk: number; };
  referralCommission: number;
  coinsUsed: number;
  paymentStatus: enum('pending', 'confirmed', 'failed');
  deliveryRating: number;
}
```

---

## ⚠️ Complaint Schema (With AI Escalation & Fines)

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
  AIAnalysis: { responseTime: number; fault: enum('buyer', 'seller', 'rider', 'system', 'pending'); autoEscalateTime: date; };
  recordedVoice: string;
}
```

---

## 🏢 Franchise Schema (Earnings, Control, Geo-AI)

```ts
Franchise {
  id: string;
  area: string;
  city: string;
  ownerId: string;
  type: enum('sub', 'master', 'corporate');
  SQLHandled: string[];
  earnings: number;
  totalOrders: number;
  unresolvedComplaints: number;
  performanceRating: number;
  monthlyFine: number;
  history: string;
  lastActivity: date;
  zoneCoordinates: { lat: number; lng: number; radiusKm: number; };
  validatorNodeConnected: boolean;
}
```

---

## 🔍 Key AI/Blockchain Features Planned for GoSellr

| Feature                     | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| **SQL Auto-Upgrade**        | Based on order delivery, complaint resolution, user reviews. |
| **AI Seller Ranking**       | Nearby seller boost, delivery score, trust rank.             |
| **Blockchain Audit**        | All product/service orders and complaints can be traced.     |
| **Voice Complaint System**  | Franchises resolve disputes via audio proof.                 |
| **Trusty Wallet Deduction** | Auto-fines and commission split via smart contract.          |
| **Order Risk Analysis**     | Each order is AI-analyzed for fraud/delay/low-trust.         |
| **Smart Tags & Trending**   | Products auto-tagged and ranked via AI search.               |

---

## ✅ Advanced AI-Based REST API (GoSellr)

### 🔎 GET /api/products

- Params: category, SQL, location, tags, search, priceRange
- Returns: ProductOrService[]
- AI: Auto-sort, AIRanking, smart recommendations

### 🛒 POST /api/orders

- Body: productId, buyerId, paymentMethod, deliveryType, coinsUsed
- Returns: Order
- AI: Franchise auto-select, wallet/SQL validation, delay risk

### 👤 GET /api/users/:id

- Returns: User
- AI: Extended view for admin/franchise, trustScore, SQL upgrade path

### ⚠️ POST /api/complaints

- Body: orderId, reason, raisedBy, voiceNoteUrl
- Returns: Complaint
- AI: Franchise assignment, fault prediction, fine tracking

### 🏢 GET /api/franchises

- Params: area, type
- Returns: Franchise[]
- AI: Nearby franchises, performance analytics, area suggestion

### 📦 Future Additions

- GET /api/orders/:id
- POST /api/users/login
- POST /api/wallet/topup
- POST /api/products/search-ai
- POST /api/sql/request-upgrade

---

## 🧑‍💼 User Flows (AI + Blockchain Ready)

### Seller Onboarding Flow

1. Register account
2. Select role = Seller
3. Submit KYC (PSS)
4. Select category
5. Create listing
6. AI checks, SQL assigned
7. Manual verification (if needed)
8. Go live
9. SQL upgrades via EDR/test

### Buyer Order Flow

1. Register/Login
2. AI Search
3. Filter/select
4. Place order
5. Payment to escrow
6. Delivery assigned
7. Confirm delivery
8. Feedback

### Franchise Onboarding

1. Apply, KYC, area check
2. Payment, agreement
3. Dashboard access
4. Area/SQL assignment
5. Performance tracked

### Affiliate Earning Flow

1. Register, get referral link
2. Share, track, earn commission
3. Dashboard for earnings
4. Upgrade for more %

---

## ⚠️ Complaint Escalation Flow

- Sub-Franchise: 6hr
- Master: 6hr
- Corporate: 6hr
- Auto-close with fine if unresolved
- Fine % by tier

## 💸 Earning Split Logic

| Stakeholder         | Earning % |
| ------------------- | --------- |
| Company             | 20%       |
| Sub-Franchise       | 30%       |
| Master Franchise    | 20%       |
| Corporate Franchise | 10%       |
| Seller              | 20%       |

---

## 🔼 SQL Upgrade Logic

- Free → Basic: KYC
- Basic → Normal: Manual + fee
- Normal → High: Advanced + test + fee
- High → VIP: Top-level + premium fee
- AI auto-suggests upgrades, blocks on complaints/fines

---

## 🏪 Franchise Purchase Logic

- Area income, complaints, order volume, SQL coverage, rider activity
- Purchase flow: select area, view stats, pay, get NFT/key, dashboard access
- Earnings go to company until sold

---

## 🧩 Developer Portal Structure

- API Docs (Swagger/Postman)
- Integration Guides (web, mobile, payment, affiliate, webhooks)
- SDK Downloads (JS, Node, Flutter, React Native, Python)
- Changelog/Updates
- Support/Contact (chat, email, Telegram, Discord, ticket)
- Test User Accounts (buyer, seller, affiliate, franchise, admin)
- Playground Panel (live API, SQL upgrade, order, complaint demo)

---

## 📘 GoSellr Development Roadmap – Feature Tracker

| Feature                       | Status      | ETA        | Owner          | Priority |
| ----------------------------- | ----------- | ---------- | -------------- | -------- |
| AI-based Seller Verification  | In Progress | 2024-07-15 | PSS Team       | High     |
| Multi-currency Support        | Planned     | 2024-08-01 | Core Team      | Medium   |
| Franchise Analytics Dashboard | Completed   | 2024-06-01 | Franchise Team | High     |

---

## 🧠 Smart Tracking Enhancements

- Feature roadmap tab, filters, color badges, expandable cards, AI summary
- Sync with GitHub/Jira, webhook notifications, public/internal toggle

---

**Next: Upload next service data here for roadmap expansion.**
