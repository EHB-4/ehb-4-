# EHB Technologies Home Page - Complete Requirements

## 🎯 **Vision Statement**

**Microsoft Store-style unified EHB Technologies Home Page** with AI Marketplace, Search, and Consistent Design across all services.

## ✅ **Core UX Principles**

| Feature                  | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| 🧩 Unified UI            | All service/department pages follow same layout logic as homepage      |
| 👶 Beginner Friendly     | Large icons, tooltips, soft colors, clear labels                       |
| 🎯 Consistent Navigation | One main navbar, card-based navigation across entire ecosystem         |
| 🧠 AI + Voice Interface  | Voice command/search from every page using Web Speech API              |
| 🪟 Inspired by MS Store  | Scrollable sliders, tags, cards, video banners, modular tile structure |

---

## 🧱 **Page Structure (React + Tailwind Based)**

### 1. **Sticky Top Navigation Bar**

| Element                | Function                                                                       |
| ---------------------- | ------------------------------------------------------------------------------ |
| 🔍 Smart Search Bar    | AI-enhanced — services, people, products, departments (Autocomplete + Filters) |
| 🎙️ Voice Search Button | Web Speech API for instant voice-based navigation                              |
| 🧠 AI Help Shortcut    | Opens EHB AI Assistant                                                         |
| 🔔 Notification Bell   | New alerts (complaints, order, SQL status, tips)                               |
| 🌐 Language Selector   | Multi-language support                                                         |
| 👤 Profile Section     | SQL Badge + Name + Status + Drop-down nav                                      |

### 2. **Hero Section (Carousel + CTAs)**

Use `react-slick` or `swiper.js`

| Slide Type              | Content                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| 🖼️ Featured Services    | GoSellr, WMS, PSS, OBS, JPS                                           |
| 🎥 AI Video Preview     | "What is EHB?" + "How Franchise Works"                                |
| ✨ Motivational Banners | "From Zero to Verified", "SQL = Trust Level"                          |
| 🚀 CTA Buttons          | `Start Now`, `Become Franchise`, `Verify Yourself`, `Shop with Trust` |

### 3. **Horizontal Cards (Like Windows Store Tiles)**

#### A. 🟢 **Best Selling / Trending Services**

- Card: Logo | Title | SQL Badge | Reviews | Button `Visit`
- Scrollable row: Shopping | Health | Education | Law | Travel

#### B. 🔵 **AI Generated & Verified Tools**

- Card: AI Tutor Finder | AI Complaint Handler | AI Job Match | AI Lawyer Suggestion

#### C. 🟣 **"Recommended for You" Section**

- Based on: Location + SQL + Role (Buyer/Seller/Student/Franchise)
- Example: Nearby Products | Tutors | Verified Doctors | Local Agents

### 4. **🧠 EHB AI Marketplace (Modular Integrated Zone)**

#### Features:

| Feature                  | Description                                                   |
| ------------------------ | ------------------------------------------------------------- | --------- | --------- | ------------------ |
| 🛍️ Unified Service Cards | Every product/service listed as modular tile                  |
| 🧠 AI-Powered Search Bar | Global search with filters (Location, SQL, Price, Type, Role) |
| 🏷️ Filters               | Category                                                      | SQL Level | Free/Paid | Franchise Verified |
| 🎯 Tags                  | "Coming Soon", "Hot 🔥", "Top Rated", "AI Verified"           |
| 🌍 Geo-Search            | Search by City / Franchise Area                               |
| 🔁 Dynamic               | Auto-refreshes trending services                              |

#### 🔗 Linking System:

Every card will auto-link to:

- 🛍️ Service Page (like GoSellr, OBS, etc.)
- 📂 Dashboard (if registered)
- 💸 Buy/Register CTA (if unregistered)

**Each service = its own mini Home Page with same card logic.**

### 5. **🛠️ Top Tools Section (Free + Paid)**

E.g., PSS tools, Resume Builder (JPS), OBS eBooks

- Sort by: SQL Level | Service Type | Region

### 6. **🟧 Promotional Video + Banner Section**

- Tools: `bannerbear`, `pexels`, `canva-sdk`, `imgix`
- AI-generated banners
- Service launch videos
- Franchise success testimonials

### 7. **Mini Dashboard Cards Section**

From home → quick access tiles:

| Card              | Destination                   |
| ----------------- | ----------------------------- |
| 🛍️ GoSellr        | Seller/Buyer dashboard        |
| ⚖️ Online Law     | Law Panel                     |
| 🧬 World Medical  | Doctor/Patient panel          |
| 📘 OBS            | Bookstore Panel               |
| 🛡️ PSS            | KYC, Complaint                |
| 💼 JPS            | Resume, Job Posts             |
| 💰 Wallet Summary | Earnings, SQL levels, Bonuses |

### 8. **AI Chatbot — Bottom Right Corner**

| Function                           | Power Source                   |
| ---------------------------------- | ------------------------------ |
| 💬 Chat With AI (text/voice)       | OpenAI + EHB Custom NLP        |
| 🎙️ Submit Complaint (Voice Upload) | OpenAI Whisper API             |
| 📸 Product QR Scan                 | AI-based image search          |
| 📍 "Where is My Service?" map      | Google Maps API + Order Status |

Fixed Button → Always on → opens as full assistant panel.

### 9. **Footer Section**

| Left Section                      | Right Section        |
| --------------------------------- | -------------------- |
| 🔗 Important Links (All Services) | 📲 Download EHB App  |
| 💼 Become a Franchise             | 📧 Support & Contact |
| 📜 Privacy + Terms                | 🌍 Region & Language |

---

## 🎁 **Bonus Features**

| Feature                   | Use                                                 |
| ------------------------- | --------------------------------------------------- |
| ⏳ Real-time Updates      | Complaint status, new services, user SQL progress   |
| 🧩 Coming Soon Cards      | "Blockchain Validator System", "Affiliate MLM Tool" |
| 🧠 Auto Login Resume      | Based on user role + cookies                        |
| 🪪 SQL Display Everywhere | Every card/service shows SQL level clearly          |
| 📱 Mobile First Design    | 100% Responsive, no horizontal scroll on mobile     |
| 🔄 Auto Refresh Zones     | Scroll & refresh like Microsoft Store               |
| 🎥 Pexels Video Embeds    | Use `pexels-api-wrapper` for preview sections       |

---

## 🛠️ **Required Tools to Install (Dev Ready)**

```bash
npm install swiper framer-motion bannerbear-sdk pexels-api-wrapper react-icons canva-embed
npm install @openai/speech-to-text
```

---

## 💡 **Design Logic (All EHB Services = Unified Pages)**

- GoSellr Home Page = same UI: Slider + Trending Products + Top Sellers
- WMS = Doctor cards + Book Appointment
- OBS = AI Book Finder + Recommended Tutors
- PSS = Complaint Upload + Verification Steps
- JPS = Resume Upload + Job Match

🧩 Every service inherits layout from the **main EHB Home Page**.

---

## ✅ **Summary: What You'll Get**

| Part                       | Included? |
| -------------------------- | --------- |
| Microsoft Store-Style UI   | ✅        |
| AI Search + Voice          | ✅        |
| Unified Page Layout        | ✅        |
| Marketplace + Filters      | ✅        |
| Linked Services/Dashboards | ✅        |
| Realtime + Banner Tools    | ✅        |
| Beginner-Friendly Design   | ✅        |

---

## 📋 **Development Status**

- [ ] **Phase 1**: Basic structure and navigation
- [ ] **Phase 2**: Hero section and carousel
- [ ] **Phase 3**: Service cards and marketplace
- [ ] **Phase 4**: AI integration and voice search
- [ ] **Phase 5**: Dashboard cards and chatbot
- [ ] **Phase 6**: Responsive design and optimization
- [ ] **Phase 7**: Testing and deployment

---

## 🎯 **Next Steps**

1. **Additional Information Needed**:

   - Specific color scheme preferences
   - Logo and branding guidelines
   - Content for hero carousel slides
   - Service categories and descriptions
   - SQL level definitions and badges
   - User roles and permissions
   - API endpoints for data integration

2. **Technical Requirements**:

   - Database schema for services
   - Authentication system integration
   - Payment gateway setup
   - AI service configurations
   - Analytics and tracking setup

3. **Content Requirements**:
   - Service descriptions and features
   - User testimonials and reviews
   - Video content for carousel
   - Banner images and promotional content
   - FAQ and help documentation

---

**Status**: Ready for development with additional information gathering
