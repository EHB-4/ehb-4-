# 📢 EHB Aid — Verified Ads & Classified Listings Platform

## 🧭 Core Objective

EHB Aid is a **fully verified, fraud-protected advertising system** for global listings — products, services, opportunities, gigs, announcements, and more. Every ad is **AI-analyzed, PSS-verified, and SQL-tagged** to prevent scams, fake posts, and misleading offers.

## 🧰 Core Features

### 1. 🔐 Verified Ad Posting System

| Feature                     | Description                                                                 |
| --------------------------- | --------------------------------------------------------------------------- |
| PSS-Based Verification      | Every ad must be posted by a **PSS-verified user/company**                  |
| Document Proof Required     | Relevant legal/ownership documents mandatory (auto-analyzed by AI)          |
| SQL-Level Enforcement       | SQL level defines the posting limit, duration, and visibility               |
| AI-Scam Detection           | Ad content scanned using NLP for fraud, keyword flags, and misleading terms |
| Manual & Auto Review System | AI auto-approve Normal/VIP, manual hold for Basic or flagged ads            |

### 2. 📊 Ad Categories Supported

- Products for Sale (New/Used)
- Property Listings (Buy, Rent, Lease)
- Job Openings (via JPS)
- Service Promotions (local professionals)
- Events & Announcements
- Franchise Offers
- Public Notices
- Educational Program Ads (via HPS/OBS)

### 3. 🧠 AI-Powered Ad Management

| Module                  | Function                                              |
| ----------------------- | ----------------------------------------------------- |
| Auto-Category Detection | AI reads text/image to auto-classify the ad           |
| Content Enhancement     | AI suggests better titles, descriptions, images       |
| SQL Trust Score Boost   | Ads from higher SQL users get better rankings         |
| Prohibited Terms Scan   | Auto-reject blacklisted words, illegal services, etc. |
| Duplicate Detection     | Similar ad recognition to prevent spam listings       |

### 4. 🧭 Ad Visibility & Reach

| Rule                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| SQL-Based Visibility | Free/Basic ads shown in local areas only           |
| Normal/High Ads      | Shown nationally or across SQL-allowed regions     |
| VIP Ads              | Global visibility, auto-prioritized in AI search   |
| Sponsored Placement  | Boosted visibility via paid promotion or coin lock |

### 5. 🧩 EHB Ecosystem Integration

- **GoSellr**: Ads linked to product/shop listings
- **JPS**: Ads linked to verified job postings
- **EMO**: Businesses can manage ads from one panel
- **Franchise**: Local agents can approve, manage, or suspend area ads

### 6. 🛡️ Security & Moderation

- Auto AI-flagging for fraud, scams, harassment, spam
- Franchise-level moderation rights (SQL permission required)
- Escalation flow: Franchise → Company Review Team
- Instant ban on PSS-failed or fake user accounts

## 👥 User Types & Access

| User Type         | Permissions                                        |
| ----------------- | -------------------------------------------------- |
| General User      | View ads, post Free/Basic ads (limited)            |
| Verified Seller   | Can post higher level ads, link to GoSellr store   |
| Company/Franchise | Can post unlimited ads in their region or category |
| Admin             | Can manage all ad categories, stats, violations    |

## 🎛️ Admin & Franchise Dashboard

| Module                   | Description                                     |
| ------------------------ | ----------------------------------------------- |
| Ad Approval Queue        | See pending/flagged ads by SQL and category     |
| Violation Reports        | Manage complaints against specific ads/users    |
| AI Ad Insights           | Trending keywords, top categories, fraud trends |
| Region-wise Ad Analytics | Per franchise/city ad performance & report      |

## 🔄 Blockchain & Smart Filtering

| Feature                     | Description                                                 |
| --------------------------- | ----------------------------------------------------------- |
| On-Chain Ad Logs            | All published ads stored immutably on Mosaic/EHB blockchain |
| Parachain Visibility Filter | Show/hide ads per region per law (data sovereignty)         |
| Timestamped Verification    | Ad creation, update, deletion timestamps on-chain           |

## 🧠 Advanced AI Tools

| Tool              | Purpose                                                          |
| ----------------- | ---------------------------------------------------------------- |
| Voice-to-Ad Input | Speak ad content → AI formats, categorizes, and posts it         |
| AI Auto-Responder | Responds to ad inquiries (e.g., "Is this still available?")      |
| Dynamic Ad Score  | AI ranks each ad based on relevance, quality, SQL level, and CTR |

## 🛒 User Flow Example

1. User opens EHB Aid
2. Selects "Post Ad"
3. Uploads image/video or speaks title/description
4. AI categorizes the ad, checks for prohibited content
5. If SQL level is High/VIP → auto-approve + publish
6. Ad visible on marketplace/search/map view
7. Interested user clicks → GoSellr/JPS profile opens

## 🔧 Technology Stack

| Layer      | Tools/Tech Stack                    |
| ---------- | ----------------------------------- |
| Frontend   | Next.js / Tailwind / React AI Hooks |
| Backend    | Node.js / MongoDB / Redis / Express |
| AI Models  | OpenAI GPT, ImageNet, LangChain NLP |
| Blockchain | Mosaic Galaxy / Moonbeam (ERC-20)   |

## ✅ Summary

| Strengths                      | Value                                           |
| ------------------------------ | ----------------------------------------------- |
| Fully verified ads             | Safer than traditional classified platforms     |
| Integrated with EHB ecosystem  | Supports all services & products across regions |
| Franchise moderation           | Localized oversight with accountability         |
| AI + SQL + Blockchain security | Global compliance + advanced fraud protection   |

## Technical Implementation

### AI Ad Analysis System

```typescript
interface AdSubmission {
  id: string;
  userId: string;
  sqlLevel: string;
  title: string;
  description: string;
  category: string;
  images: File[];
  documents: File[];
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  price?: number;
  contactInfo: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
}

interface AdAnalysis {
  adId: string;
  riskScore: number;
  fraudProbability: number;
  category: string;
  prohibitedTerms: string[];
  duplicateCheck: boolean;
  recommendation: string;
  autoApprove: boolean;
}

class EHBAidAI {
  async analyzeAd(ad: AdSubmission): Promise<AdAnalysis> {
    // Content analysis
    const contentAnalysis = await this.analyzeContent(ad.title + ' ' + ad.description);

    // Image analysis
    const imageAnalysis = await this.analyzeImages(ad.images);

    // Document verification
    const documentVerification = await this.verifyDocuments(ad.documents);

    // Duplicate detection
    const duplicateCheck = await this.checkDuplicates(ad);

    // Risk assessment
    const riskScore = this.calculateRiskScore({
      contentAnalysis,
      imageAnalysis,
      documentVerification,
      duplicateCheck,
      sqlLevel: ad.sqlLevel,
    });

    // Category detection
    const category = await this.detectCategory(ad.title, ad.description);

    // Prohibited terms check
    const prohibitedTerms = await this.checkProhibitedTerms(ad.title + ' ' + ad.description);

    // Auto-approval decision
    const autoApprove = this.shouldAutoApprove({
      riskScore,
      sqlLevel: ad.sqlLevel,
      prohibitedTerms: prohibitedTerms.length,
    });

    return {
      adId: ad.id,
      riskScore,
      fraudProbability: contentAnalysis.fraudProbability,
      category,
      prohibitedTerms,
      duplicateCheck: duplicateCheck.isDuplicate,
      recommendation: this.generateRecommendation(riskScore, prohibitedTerms),
      autoApprove,
    };
  }

  private async analyzeContent(text: string): Promise<any> {
    // Use OpenAI GPT-4 for content analysis
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Analyze this ad content for fraud, scams, and prohibited content. Return a JSON with fraudProbability (0-1), riskLevel (low/medium/high), and flaggedTerms array.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  }

  private async analyzeImages(images: File[]): Promise<any> {
    // Use computer vision to analyze images
    const results = [];

    for (const image of images) {
      const analysis = await this.visionAPI.analyzeImage(image);
      results.push(analysis);
    }

    return {
      inappropriateContent: results.some(r => r.inappropriate),
      qualityScore: results.reduce((sum, r) => sum + r.quality, 0) / results.length,
    };
  }

  private shouldAutoApprove(factors: any): boolean {
    // Auto-approve if:
    // - SQL level is High or VIP
    // - Risk score is low
    // - No prohibited terms
    return (
      ['High', 'VIP'].includes(factors.sqlLevel) &&
      factors.riskScore < 30 &&
      factors.prohibitedTerms === 0
    );
  }
}
```

### Smart Contract for Ad Verification

```solidity
contract EHBAid {
    struct Ad {
        address publisher;
        string title;
        string description;
        string category;
        uint256 price;
        uint8 sqlLevel;
        bool verified;
        bool active;
        uint256 timestamp;
        bytes32 contentHash;
    }

    mapping(bytes32 => Ad) public ads;
    mapping(address => bytes32[]) public userAds;

    event AdPublished(bytes32 indexed adHash, address indexed publisher, uint8 sqlLevel);
    event AdVerified(bytes32 indexed adHash, address indexed verifier);
    event AdFlagged(bytes32 indexed adHash, string reason);

    function publishAd(
        string memory title,
        string memory description,
        string memory category,
        uint256 price,
        bytes32 contentHash
    ) external returns (bytes32) {
        require(bytes(title).length > 0, "Title required");
        require(bytes(description).length > 0, "Description required");

        bytes32 adHash = keccak256(abi.encodePacked(
            msg.sender, title, description, block.timestamp
        ));

        uint8 sqlLevel = getUserSQLLevel(msg.sender);

        ads[adHash] = Ad({
            publisher: msg.sender,
            title: title,
            description: description,
            category: category,
            price: price,
            sqlLevel: sqlLevel,
            verified: sqlLevel >= 3, // Auto-verify High/VIP
            active: true,
            timestamp: block.timestamp,
            contentHash: contentHash
        });

        userAds[msg.sender].push(adHash);

        emit AdPublished(adHash, msg.sender, sqlLevel);

        return adHash;
    }

    function flagAd(bytes32 adHash, string memory reason) external {
        require(ads[adHash].publisher != address(0), "Ad not found");
        require(msg.sender == moderator || getUserSQLLevel(msg.sender) >= 3, "Not authorized");

        ads[adHash].active = false;

        emit AdFlagged(adHash, reason);
    }
}
```

### Database Schema

```sql
-- Advertisements
CREATE TABLE advertisements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  category VARCHAR(50),
  subcategory VARCHAR(50),
  price DECIMAL,
  currency VARCHAR(3) DEFAULT 'USD',
  sql_level VARCHAR(10),
  verified BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  views INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  contact_views INTEGER DEFAULT 0,
  location_data JSONB,
  contact_info JSONB,
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  expires_at TIMESTAMP
);

-- Ad Media
CREATE TABLE ad_media (
  id UUID PRIMARY KEY,
  ad_id UUID REFERENCES advertisements(id),
  media_type VARCHAR(20), -- 'image', 'video', 'document'
  file_url VARCHAR(500),
  file_hash VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);

-- Ad Analysis
CREATE TABLE ad_analysis (
  id UUID PRIMARY KEY,
  ad_id UUID REFERENCES advertisements(id),
  risk_score INTEGER,
  fraud_probability DECIMAL,
  category_detected VARCHAR(50),
  prohibited_terms TEXT[],
  duplicate_check BOOLEAN,
  ai_recommendation TEXT,
  auto_approved BOOLEAN,
  analyzed_at TIMESTAMP
);

-- Ad Violations
CREATE TABLE ad_violations (
  id UUID PRIMARY KEY,
  ad_id UUID REFERENCES advertisements(id),
  reporter_id UUID REFERENCES users(id),
  violation_type VARCHAR(50),
  description TEXT,
  evidence JSONB,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
  moderator_id UUID REFERENCES users(id),
  resolved_at TIMESTAMP,
  created_at TIMESTAMP
);

-- Ad Analytics
CREATE TABLE ad_analytics (
  id UUID PRIMARY KEY,
  ad_id UUID REFERENCES advertisements(id),
  viewer_id UUID REFERENCES users(id),
  action VARCHAR(20), -- 'view', 'click', 'contact', 'share'
  location_data JSONB,
  device_info JSONB,
  created_at TIMESTAMP
);
```

### API Endpoints

```typescript
// Ad Management
POST /api/ads/publish
GET /api/ads/:adId
PUT /api/ads/:adId
DELETE /api/ads/:adId
GET /api/ads/user/:userId

// Ad Discovery
GET /api/ads/search
GET /api/ads/category/:category
GET /api/ads/location/:city
GET /api/ads/trending

// AI Features
POST /api/ads/ai/analyze
GET /api/ads/ai/suggestions
POST /api/ads/ai/voice-input
POST /api/ads/ai/auto-responder

// Moderation
POST /api/ads/flag/:adId
GET /api/ads/moderation/queue
POST /api/ads/moderation/approve/:adId
POST /api/ads/moderation/reject/:adId

// Analytics
GET /api/ads/analytics/:adId
GET /api/ads/analytics/user/:userId
GET /api/admin/ads/analytics/overview
GET /api/admin/ads/analytics/fraud-trends
```

### Performance Metrics

- **Ad Processing Time**: <5 seconds
- **AI Analysis**: <3 seconds
- **Image Verification**: <10 seconds
- **Fraud Detection Accuracy**: >95%
- **System Uptime**: 99.9%

### Security Features

- **Content Filtering**: AI-powered inappropriate content detection
- **Document Verification**: Automated document authenticity checks
- **Rate Limiting**: Prevents ad spam
- **SQL Level Enforcement**: Access control based on user trust level
- **Blockchain Audit**: Immutable ad history and verification logs

### Integration Points

- **GoSellr**: Direct product/service linking
- **JPS**: Job posting integration
- **WMS**: Healthcare service ads
- **OBS/EDR**: Educational program ads
- **Franchise System**: Local ad management
- **Search Hub**: Ad discovery and search
- **Payment System**: Ad promotion payments
