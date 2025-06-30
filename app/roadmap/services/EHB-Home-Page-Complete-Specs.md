# EHB Technologies Home Page - Complete Specifications

## ✅ 1. **Branding & Design**

### 🎯 Official Logo

- **Format**: PNG + SVG
- **Path**: `https://cdn.ehb.global/assets/logo.svg`
- **Alternate PNG**: `https://cdn.ehb.global/assets/logo.png`

### 🎨 Primary Color Scheme

| Element          | Color Code |
| ---------------- | ---------- |
| Primary Blue     | `#2452FF`  |
| Secondary Purple | `#8B3DFF`  |
| Accent Gold      | `#F8B400`  |
| Background       | `#F5F7FA`  |
| Text Dark        | `#1F2937`  |

### 🔤 Typography Preferences

- **Headings**: `Poppins, Bold`
- **Body Text**: `Inter, Regular`
- **Numbers/Stats**: `Roboto Mono`

### 📘 Brand Guidelines Summary

- Modern, light, card-based UI
- 3D icon styling preferred
- Each card shows SQL level (tag)
- Modular components reused across all services
- Minimum use of red (only for alerts/errors)

---

## ✅ 2. **Content & Services**

### 🖼️ Hero Carousel Slides (x5)

1. **Title**: "Explore Verified Services Across the Globe"

   - **CTA**: `Start Now` → `/marketplace`
   - **Background**: Global city skyline + AI circuit overlay

2. **Title**: "Become a Franchise & Start Earning"

   - **CTA**: `Join Now` → `/franchise`
   - **Background**: Animated wallet with dollar coins flying out

3. **Title**: "SQL Level = Trust Level"

   - **CTA**: `Get Verified` → `/pss`
   - **Background**: Ranking badge system with rocket boost effect

4. **Title**: "AI Marketplace is Live"

   - **CTA**: `Discover Services` → `/marketplace`
   - **Background**: AI chip image + holographic icons

5. **Title**: "GoSellr - E-Commerce Redefined"
   - **CTA**: `Start Selling` → `/gosellr`
   - **Background**: Shopping cart with digital globe

### 🌐 Main Services Descriptions

| Service                            | Short Description                                                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **GoSellr**                        | A global e-commerce platform where verified sellers offer products with franchise-backed delivery.       |
| **WMS (World Medical Services)**   | Online + offline verified healthcare system. Book doctors, get prescriptions, access local dispensaries. |
| **PSS (Personal Security System)** | Identity, business, service, and product verification system. Core for SQL badge issuance.               |
| **OBS (Online Book Store)**        | Global educational resource hub. Upload, share, and learn with AI-recommended books and teachers.        |
| **JPS (Job Providing Service)**    | LinkedIn + Fiverr-style hybrid for hiring, freelancing, resume building, and skill testing.              |

### 🏷️ SQL Level Definitions

| Level      | Meaning                                                       |
| ---------- | ------------------------------------------------------------- |
| **Free**   | No verification, access to basic features only                |
| **Basic**  | Verified identity (KYC) through PSS                           |
| **Normal** | Verified service/product + attendance in training             |
| **High**   | Passed live testing via EDR or Franchise review               |
| **VIP**    | Top tier: continuous activity, reviews, full ecosystem access |

### 👤 User Roles

| Role          | Description                                 |
| ------------- | ------------------------------------------- |
| **Visitor**   | Not logged in, browsing only                |
| **User**      | Registered, uses services                   |
| **Seller**    | Registered seller on GoSellr                |
| **Student**   | Uses OBS or JPS for learning or jobs        |
| **Franchise** | Area franchise owner (sub/master/corporate) |
| **Admin**     | Backend manager                             |

---

## ✅ 3. **Technical Details**

### 📡 API Endpoints (Public APIs for Cursor/Frontend)

| Endpoint               | Description                            |
| ---------------------- | -------------------------------------- |
| `GET /api/services`    | All services with SQL level & category |
| `GET /api/banners`     | Homepage hero slider data              |
| `GET /api/marketplace` | Filtered marketplace services          |
| `GET /api/user/:id`    | User profile, SQL level, region        |
| `POST /api/complaints` | Upload voice/text complaint            |
| `GET /api/tools`       | Free/Paid AI tools based on SQL        |

### 🔐 Authentication System

- JWT-based token auth
- SQL level and user role attached in every session
- Refresh token system planned for Phase 2

### 🧩 Database Structure (MongoDB Collections)

- `users`: roles, SQL level, wallet
- `services`: name, slug, category, SQL tag, link
- `marketplace`: listing data
- `banners`: carousel content
- `dashboard_cards`: role-based access to modules
- `complaints`: audio or text complaint data

### 💳 Payment Gateway Preferences

| Gateway                  | Reason                                   |
| ------------------------ | ---------------------------------------- |
| **Stripe**               | Global coverage, easy test/dev           |
| **RedotPay**             | For crypto + fiat hybrid services        |
| **EasyPaisa / JazzCash** | Pakistan-local mobile payments (Phase 2) |

---

## ✅ 4. **Features Priority (Development Order)**

| Priority       | Feature                                                      |
| -------------- | ------------------------------------------------------------ |
| ⭐ First       | Hero Slider, Navbar, Smart Search, Dashboard Cards           |
| ⭐⭐ Second    | AI Marketplace Filters, SQL Level Display, Role-based access |
| ⭐⭐⭐ Third   | Voice Complaint Upload, PSS Verification Form                |
| ⭐⭐⭐⭐ Later | Real-Time Chat, Wallet earnings, Notifications               |

### 🤖 AI Integration Scope

| Type          | Tool / Provider                             |
| ------------- | ------------------------------------------- |
| Text Chatbot  | OpenAI GPT-4 API                            |
| Voice to Text | OpenAI Whisper API                          |
| Image/QR Read | Tesseract.js + Cloud Vision (Optional)      |
| Smart Filters | Embedding-based categorization for services |

### 🎙️ Voice Search Requirements

- Input bar with mic icon
- Web Speech API for browser-based speech recognition
- Output directly filters marketplace cards or dashboard navigation

### 🔁 Real-Time Features Priority

| Feature                  | Priority  |
| ------------------------ | --------- |
| Notifications            | ✅ HIGH   |
| Complaint submission     | ✅ HIGH   |
| Live marketplace updates | ✅ MEDIUM |
| Wallet stats refresh     | ✅ LATER  |

---

## ✅ 5. **Content Assets**

| Asset Type      | Source or Note                                       |
| --------------- | ---------------------------------------------------- |
| Service Icons   | SVG from `https://cdn.ehb.global/icons/`             |
| Carousel Videos | Hosted via CDN (`https://cdn.ehb.global/hero/*.mp4`) |
| Testimonials    | Real user text + images (phase 2)                    |
| Banners         | Bannerbear auto-generated, JSON from `/api/banners`  |

---

## 🚀 **Development Ready Specifications**

### **Frontend Technologies**

- Next.js 14+ with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Swiper.js for carousel
- React Icons for icons

### **Required Dependencies**

```bash
npm install swiper framer-motion react-icons lucide-react
npm install @types/node @types/react @types/react-dom
npm install tailwindcss postcss autoprefixer
```

### **File Structure**

```
app/
├── ehb-home-page/
│   ├── page.tsx (Main page)
│   ├── components/
│   │   ├── HeroSlider.tsx
│   │   ├── Navigation.tsx
│   │   ├── ServiceCards.tsx
│   │   ├── DashboardCards.tsx
│   │   ├── AIChatbot.tsx
│   │   └── Footer.tsx
│   └── styles/
│       └── globals.css
```

### **Component Architecture**

- Modular design with reusable components
- Role-based rendering
- SQL level integration
- Responsive design (mobile-first)
- Accessibility compliance

---

## 📋 **Implementation Checklist**

### **Phase 1: Foundation**

- [ ] Project setup with Next.js 14
- [ ] Tailwind CSS configuration
- [ ] Basic layout structure
- [ ] Navigation component
- [ ] Hero slider with 5 slides
- [ ] Service cards grid

### **Phase 2: Core Features**

- [ ] SQL level badges
- [ ] Role-based dashboard cards
- [ ] Search functionality
- [ ] Marketplace filters
- [ ] Responsive design

### **Phase 3: Advanced Features**

- [ ] AI chatbot integration
- [ ] Voice search
- [ ] Real-time notifications
- [ ] Complaint system
- [ ] Payment integration

### **Phase 4: Optimization**

- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Analytics integration
- [ ] Testing and bug fixes
- [ ] Deployment preparation

---

**Status**: Ready for immediate development with complete specifications
