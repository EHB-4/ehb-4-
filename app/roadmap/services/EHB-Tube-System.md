# 🎥 EHB Tube — Verified Video Sharing & Educational Platform

## 🧭 Core Objective

EHB Tube is a **verified, AI-moderated video platform** combining the features of YouTube, Coursera, and TikTok — but with enhanced trust, **SQL level filters**, and community monetization via **blockchain-backed engagement rewards.**

## 🧰 Core Features

### 1. 🆔 Video Verification System

| Feature              | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| SQL-Tagged Content   | Videos tagged by creator's SQL level (Free, Basic, Normal, High, VIP) |
| AI-Moderated Uploads | Every upload auto-scanned for policy violations or harmful content    |
| KYC-Required Uploads | Only verified users (via PSS) can upload public videos                |
| Topic Category Lock  | Uploads allowed only in verified topics (EDR-based control)           |

### 2. 🧠 AI-Powered Search, Filtering, & Recommendations

| Feature                   | Description                                                                 |
| ------------------------- | --------------------------------------------------------------------------- |
| Voice & Text Search       | NLP-based search with SQL filtering and personalization                     |
| AI Recommendations        | Based on user interest, past views, SQL tier, and global ranking            |
| Content Credibility Score | AI assigns trust scores based on views, likes, watch time, verification     |
| Auto-Translation          | Language detection + subtitle generation + local translation (future-ready) |

### 3. 🧩 Ecosystem Integration

- **JPS**: Interview videos, job profile intros, career training
- **HPS/OBS**: Educational lectures, book reviews, school content
- **GoSellr**: Product demo videos from verified shopkeepers
- **EHB Aid**: Embedded videos in ads, service showcases
- **Affiliate Program**: Referral-based content monetization

### 4. 💰 Monetization & Blockchain Rewards

| Rule                      | Description                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| Watch-to-Earn             | Viewers earn micro rewards based on watch time and ad interactions |
| Creator Rewards           | Based on views, SQL, trust score, and affiliate conversions        |
| Coin-Based Tips/Donations | Fans tip creators using ERC-20 tokens (locked/unlocked balance)    |
| Monthly Payout Cap        | SQL-level controls how much income is unlocked per cycle           |

### 5. 🎓 Verified Educational Channels

| Feature                    | Description                                                             |
| -------------------------- | ----------------------------------------------------------------------- |
| EDR-Linked Channels        | Teachers/Institutes with verified HPS/EDR accounts                      |
| Verified Curriculum Videos | Official subject content approved by EHB                                |
| Auto Skill Rank            | Viewers auto-get tested, receive badges, SQL upgrade via video learning |

### 6. 🚨 Moderation & Safety

| System                      | Function                                                              |
| --------------------------- | --------------------------------------------------------------------- |
| AI Moderation               | Profanity, nudity, misinformation detection (auto flagging & removal) |
| Community Reporting         | SQL-based reporting privileges with blockchain logs                   |
| SQL Visibility Restrictions | VIP content visible to verified users only (per service type)         |
| Franchise-Level Oversight   | Area-based content flag monitoring and takedown power                 |

## 👥 User Types & Access

| User Type         | Access Rights                                            |
| ----------------- | -------------------------------------------------------- |
| Viewer            | Watch videos by SQL filter, comment (verified only), tip |
| Verified Creator  | Upload videos, link to GoSellr/JPS/EDR profiles          |
| Institute Channel | Verified course creators, monetized learning pathways    |
| Franchise/Admin   | Review flagged content, manage SQL video restrictions    |

## 🧠 AI-Based Video Tools

| Tool                      | Function                                                       |
| ------------------------- | -------------------------------------------------------------- |
| Auto Thumbnail Generator  | Suggests best frame or auto image for engagement               |
| Speech-to-Text Parser     | Auto-captions, subtitle generation                             |
| Video Classification      | AI detects topic, category, violations, and tags automatically |
| Viewer Behavior Analytics | AI detects fraud views, auto-block bots, gives SEO scores      |

## 🎛️ Dashboard Modules

### For Creators:

- Video Manager (Upload, Analytics, Monetization)
- SQL Level Status (Content cap based on SQL)
- Referral Campaign Panel (Earn by traffic share)

### For Admin/Franchise:

- Flagged Videos
- Region-wise Engagement Charts
- SQL-Category Filter Settings
- Auto-Ban & Warning Logs

## 🔧 Tech Stack

| Layer      | Stack                                              |
| ---------- | -------------------------------------------------- |
| Frontend   | Next.js, Tailwind, React Player, FFMPEG            |
| Backend    | Node.js, MongoDB, Redis, Socket.IO                 |
| AI Layer   | Whisper (speech), GPT-4 (text analysis), LangChain |
| Blockchain | Mosaic Galaxy (for creator tips, watch logs)       |

## 🌍 Future Upgrades

- Live Streams with Token Gating
- Verified Comment System (AI-reviewed)
- NFT Video Ownership (for premium lectures)
- DAO-based creator community funding

## 🧭 User Flow Example

1. User visits EHB Tube
2. Sees content based on SQL level
3. Searches by voice — AI shows verified results
4. Watches video → earns/viewer badge
5. Tips creator → logs via blockchain
6. Creator earns reward → auto wallet payout

## Technical Implementation

### AI Video Processing System

```typescript
interface VideoUpload {
  id: string;
  userId: string;
  sqlLevel: string;
  title: string;
  description: string;
  category: string;
  videoFile: File;
  thumbnail?: File;
  tags: string[];
  visibility: 'public' | 'private' | 'sql-restricted';
  monetization: {
    enabled: boolean;
    tipEnabled: boolean;
    affiliateEnabled: boolean;
  };
}

interface VideoAnalysis {
  videoId: string;
  duration: number;
  quality: 'low' | 'medium' | 'high';
  contentAnalysis: {
    inappropriate: boolean;
    violence: number;
    nudity: number;
    profanity: number;
    misinformation: number;
  };
  transcription: string;
  subtitles: SubtitleTrack[];
  autoTags: string[];
  thumbnailSuggestions: string[];
  seoScore: number;
  autoApprove: boolean;
}

class EHBTubeAI {
  async processVideo(upload: VideoUpload): Promise<VideoAnalysis> {
    // Video content analysis
    const contentAnalysis = await this.analyzeVideoContent(upload.videoFile);

    // Speech-to-text transcription
    const transcription = await this.transcribeVideo(upload.videoFile);

    // Auto-subtitle generation
    const subtitles = await this.generateSubtitles(transcription, upload.videoFile);

    // Auto-tagging
    const autoTags = await this.generateTags(upload.title, upload.description, transcription);

    // Thumbnail suggestions
    const thumbnailSuggestions = await this.suggestThumbnails(upload.videoFile);

    // SEO optimization
    const seoScore = this.calculateSEOScore({
      title: upload.title,
      description: upload.description,
      tags: [...upload.tags, ...autoTags],
      transcription,
      sqlLevel: upload.sqlLevel,
    });

    // Auto-approval decision
    const autoApprove = this.shouldAutoApprove({
      contentAnalysis,
      sqlLevel: upload.sqlLevel,
      seoScore,
    });

    return {
      videoId: upload.id,
      duration: await this.getVideoDuration(upload.videoFile),
      quality: await this.assessVideoQuality(upload.videoFile),
      contentAnalysis,
      transcription,
      subtitles,
      autoTags,
      thumbnailSuggestions,
      seoScore,
      autoApprove,
    };
  }

  private async analyzeVideoContent(videoFile: File): Promise<any> {
    // Use computer vision and AI to analyze video content
    const frames = await this.extractKeyFrames(videoFile);

    const analysis = {
      inappropriate: false,
      violence: 0,
      nudity: 0,
      profanity: 0,
      misinformation: 0,
    };

    for (const frame of frames) {
      const frameAnalysis = await this.analyzeFrame(frame);

      analysis.violence = Math.max(analysis.violence, frameAnalysis.violence);
      analysis.nudity = Math.max(analysis.nudity, frameAnalysis.nudity);

      if (frameAnalysis.inappropriate) {
        analysis.inappropriate = true;
      }
    }

    // Audio analysis for profanity
    const audioAnalysis = await this.analyzeAudio(videoFile);
    analysis.profanity = audioAnalysis.profanity;

    return analysis;
  }

  private async transcribeVideo(videoFile: File): Promise<string> {
    // Use Whisper AI for speech-to-text
    const audioBuffer = await this.extractAudio(videoFile);

    const transcription = await openai.audio.transcriptions.create({
      file: audioBuffer,
      model: 'whisper-1',
      response_format: 'text',
    });

    return transcription;
  }

  private shouldAutoApprove(factors: any): boolean {
    return (
      ['High', 'VIP'].includes(factors.sqlLevel) &&
      !factors.contentAnalysis.inappropriate &&
      factors.contentAnalysis.violence < 0.3 &&
      factors.contentAnalysis.nudity < 0.1 &&
      factors.seoScore > 70
    );
  }
}
```

### Smart Contract for Video Rewards

```solidity
contract EHBTube {
    struct Video {
        address creator;
        string title;
        string description;
        string videoHash;
        uint8 sqlLevel;
        bool verified;
        bool active;
        uint256 views;
        uint256 likes;
        uint256 tips;
        uint256 timestamp;
    }

    struct ViewerReward {
        address viewer;
        bytes32 videoId;
        uint256 watchTime;
        uint256 reward;
        uint256 timestamp;
    }

    mapping(bytes32 => Video) public videos;
    mapping(address => bytes32[]) public creatorVideos;
    mapping(address => ViewerReward[]) public viewerRewards;

    event VideoUploaded(bytes32 indexed videoId, address indexed creator, uint8 sqlLevel);
    event VideoWatched(bytes32 indexed videoId, address indexed viewer, uint256 watchTime);
    event TipSent(bytes32 indexed videoId, address indexed tipper, uint256 amount);

    function uploadVideo(
        string memory title,
        string memory description,
        string memory videoHash,
        uint8 sqlLevel
    ) external returns (bytes32) {
        require(bytes(title).length > 0, "Title required");
        require(bytes(videoHash).length > 0, "Video hash required");

        bytes32 videoId = keccak256(abi.encodePacked(
            msg.sender, title, videoHash, block.timestamp
        ));

        videos[videoId] = Video({
            creator: msg.sender,
            title: title,
            description: description,
            videoHash: videoHash,
            sqlLevel: sqlLevel,
            verified: sqlLevel >= 3, // Auto-verify High/VIP
            active: true,
            views: 0,
            likes: 0,
            tips: 0,
            timestamp: block.timestamp
        });

        creatorVideos[msg.sender].push(videoId);

        emit VideoUploaded(videoId, msg.sender, sqlLevel);

        return videoId;
    }

    function watchVideo(bytes32 videoId, uint256 watchTime) external {
        require(videos[videoId].creator != address(0), "Video not found");
        require(videos[videoId].active, "Video not active");

        videos[videoId].views++;

        // Calculate viewer reward based on watch time and SQL level
        uint256 reward = calculateViewerReward(watchTime, videos[videoId].sqlLevel);

        if (reward > 0) {
            viewerRewards[msg.sender].push(ViewerReward({
                viewer: msg.sender,
                videoId: videoId,
                watchTime: watchTime,
                reward: reward,
                timestamp: block.timestamp
            }));

            // Transfer reward to viewer
            transferReward(msg.sender, reward);
        }

        emit VideoWatched(videoId, msg.sender, watchTime);
    }

    function tipCreator(bytes32 videoId, uint256 amount) external {
        require(videos[videoId].creator != address(0), "Video not found");
        require(amount > 0, "Tip amount must be positive");

        videos[videoId].tips += amount;

        // Transfer tip to creator
        transferReward(videos[videoId].creator, amount);

        emit TipSent(videoId, msg.sender, amount);
    }

    function calculateViewerReward(uint256 watchTime, uint8 sqlLevel) internal pure returns (uint256) {
        // Base reward: 1 token per minute watched
        uint256 baseReward = watchTime / 60;

        // SQL level multiplier
        uint256 multiplier = 100 + (sqlLevel * 25); // 100% for Free, 125% for Basic, etc.

        return (baseReward * multiplier) / 100;
    }
}
```

### Database Schema

```sql
-- Videos
CREATE TABLE videos (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  category VARCHAR(50),
  tags TEXT[],
  video_url VARCHAR(500),
  thumbnail_url VARCHAR(500),
  duration INTEGER, -- in seconds
  file_size BIGINT,
  sql_level VARCHAR(10),
  verified BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  tips_received DECIMAL DEFAULT 0,
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Video Analysis
CREATE TABLE video_analysis (
  id UUID PRIMARY KEY,
  video_id UUID REFERENCES videos(id),
  content_analysis JSONB,
  transcription TEXT,
  subtitles JSONB,
  auto_tags TEXT[],
  thumbnail_suggestions TEXT[],
  seo_score INTEGER,
  auto_approved BOOLEAN,
  analyzed_at TIMESTAMP
);

-- Viewer Interactions
CREATE TABLE viewer_interactions (
  id UUID PRIMARY KEY,
  video_id UUID REFERENCES videos(id),
  viewer_id UUID REFERENCES users(id),
  watch_time INTEGER, -- in seconds
  reward_earned DECIMAL,
  liked BOOLEAN DEFAULT FALSE,
  shared BOOLEAN DEFAULT FALSE,
  tipped BOOLEAN DEFAULT FALSE,
  tip_amount DECIMAL DEFAULT 0,
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP
);

-- Creator Earnings
CREATE TABLE creator_earnings (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES users(id),
  video_id UUID REFERENCES videos(id),
  earnings_type VARCHAR(20), -- 'views', 'tips', 'affiliate'
  amount DECIMAL,
  sql_level VARCHAR(10),
  blockchain_hash VARCHAR(255),
  created_at TIMESTAMP
);

-- Video Moderation
CREATE TABLE video_moderation (
  id UUID PRIMARY KEY,
  video_id UUID REFERENCES videos(id),
  reporter_id UUID REFERENCES users(id),
  violation_type VARCHAR(50),
  description TEXT,
  evidence JSONB,
  status VARCHAR(20) DEFAULT 'pending',
  moderator_id UUID REFERENCES users(id),
  action_taken VARCHAR(50),
  resolved_at TIMESTAMP,
  created_at TIMESTAMP
);
```

### API Endpoints

```typescript
// Video Management
POST /api/tube/upload
GET /api/tube/video/:videoId
PUT /api/tube/video/:videoId
DELETE /api/tube/video/:videoId
GET /api/tube/creator/:creatorId

// Video Discovery
GET /api/tube/search
GET /api/tube/category/:category
GET /api/tube/trending
GET /api/tube/recommended/:userId

// Video Interaction
POST /api/tube/watch/:videoId
POST /api/tube/like/:videoId
POST /api/tube/share/:videoId
POST /api/tube/tip/:videoId

// AI Features
POST /api/tube/ai/analyze/:videoId
GET /api/tube/ai/transcription/:videoId
POST /api/tube/ai/subtitles/:videoId
GET /api/tube/ai/suggestions/:userId

// Creator Dashboard
GET /api/tube/creator/analytics/:creatorId
GET /api/tube/creator/earnings/:creatorId
GET /api/tube/creator/videos/:creatorId

// Moderation
POST /api/tube/flag/:videoId
GET /api/tube/moderation/queue
POST /api/tube/moderation/action/:videoId

// Admin Panel
GET /api/admin/tube/overview
GET /api/admin/tube/trending
GET /api/admin/tube/violations
POST /api/admin/tube/feature/:videoId
```

### Performance Metrics

- **Video Upload Processing**: <30 seconds
- **AI Content Analysis**: <60 seconds
- **Transcription Generation**: <120 seconds
- **Streaming Quality**: 4K support
- **System Uptime**: 99.9%

### Security Features

- **Content Moderation**: AI-powered inappropriate content detection
- **SQL Level Filtering**: Content visibility based on user trust level
- **Rate Limiting**: Prevents upload spam
- **Copyright Protection**: Automated copyright detection
- **Blockchain Verification**: Immutable video ownership and interaction logs

### Integration Points

- **JPS**: Job interview and training videos
- **HPS/OBS**: Educational content and lectures
- **GoSellr**: Product demonstration videos
- **EHB Aid**: Embedded video ads
- **Affiliate Program**: Video-based referral tracking
- **Search Hub**: Video discovery and search
- **Payment System**: Creator monetization and tips
