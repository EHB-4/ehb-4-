# EHB UI/UX Wireframes & Layouts

## Overview

This document outlines the UI/UX design system for the EHB ecosystem (GoSellr + EHB AI Marketplace), focusing on scalable, modular layouts with Cursor AI support, Service Quality Levels (SQL), and franchise-based view control.

## User Interface Components

### Core Components

1. **DashboardCard**: Represents each service/tool (with SQL badge, lock, status)
2. **SQLBadge**: Shows user's SQL level visually (Free, Basic, Normal, etc.)
3. **TrustyWalletWidget**: Live balance for EHBGC, Crypto, and Local
4. **TopServiceCarousel**: Featured/high-rated services with AI tag
5. **ComplaintStatusBar**: Shows last 5 complaints and current resolution state
6. **FranchiseEarningBar**: Only visible to franchise role
7. **AIUniversalSearch**: Voice/text-based multi-service search bar

### Specialized Components

8. **OrderTracker**: Real-time order status with delivery updates
9. **QualityScoreCard**: AI-powered service quality indicators
10. **NotificationCenter**: Centralized notification management
11. **LanguageSwitcher**: Multi-language support interface
12. **ThemeToggle**: Dark/light mode switching

## Page Layouts

### Dashboard (Main EHB Dashboard)

#### Header

- **Logo**: EHB branding with current SQL level indicator
- **Notifications**: Real-time notification bell with badge count
- **User Menu**: Profile picture, SQL tag, quick actions
- **Language Switcher**: Multi-language support
- **Theme Toggle**: Dark/light mode switch

#### Sidebar

```yaml
Navigation Items:
  - [My Dashboard] - Personal overview
  - [GoSellr] - Marketplace access
  - [SQL Upgrade] - Level upgrade interface
  - [Wallet] - Financial management
  - [Franchise Dashboard] - Franchise-specific tools (if eligible)
  - [Affiliate Earnings] - Commission tracking
  - [AI Marketplace] - AI services access
  - [Settings] - Account configuration
```

#### Main Content

- **Hero Section**: Greeting + Smart Suggestions (AI generated)
- **Cards Grid**: Customizable service cards (GoSellr, OBS, WMS, etc.)
- **Top Nearby Services**: Location-based recommendations
- **Upgrade Suggestions**: SQL upgrade prompts (if current level expired)
- **Recent Activity**: Last 5 transactions/actions

#### Footer

- **Legal Links**: Terms, Privacy Policy, Cookie Policy
- **Support**: Help center, contact information
- **Social Media**: Platform links
- **Copyright**: EHB branding

#### Mobile Layout

- **Collapsible Sidebar**: Hamburger menu for navigation
- **Floating Action Buttons**: Search and wallet quick access
- **Bottom Navigation**: Essential navigation items
- **Swipe Gestures**: Card swiping for quick actions

### GoSellr Marketplace Layout

#### Header

- **Search Bar**: AI-powered product/service search
- **Filters**: Category, price, rating, SQL level
- **Cart**: Shopping cart with item count
- **User Menu**: Profile and settings

#### Main Content

- **Product Grid**: Responsive product/service cards
- **Filters Sidebar**: Advanced filtering options
- **Sort Options**: Price, rating, distance, popularity
- **Pagination**: Load more or page navigation

#### Mobile Layout

- **Bottom Sheet**: Filter and sort options
- **Infinite Scroll**: Continuous product loading
- **Quick Actions**: Add to cart, wishlist, share

### EHB AI Marketplace Layout

#### Header

- **AI Search**: Natural language AI service search
- **AI Categories**: Service type filters
- **Model Browser**: AI model exploration
- **User Menu**: AI service management

#### Main Content

- **AI Service Cards**: Service descriptions and pricing
- **Model Showcase**: Featured AI models
- **Usage Analytics**: Personal AI usage statistics
- **Recommendations**: AI-powered service suggestions

## User Flows

### SQL Upgrade Flow

```yaml
Step 1: Click "Upgrade" → System shows requirements
Step 2: Upload KYC / pay fee → VerificationAgent triggered
Step 3: Real-time status (pending, success, failed)
Success States: Badge updates + dashboard unlocks
Error States: Shows fallback reason, option to retry or contact support
```

### Complaint Flow

```yaml
Step 1: User clicks "Raise Complaint"
Step 2: Fills structured form + optional audio upload
Step 3: System routes to FranchiseAgent → shows live timer
Step 4: Resolution shown with color-coded status + fine (if applied)
```

### Order Flow

```yaml
Step 1: Browse and select product/service
Step 2: Add to cart and proceed to checkout
Step 3: Payment processing with escrow
Step 4: Order confirmation and tracking
Step 5: Delivery completion and rating
```

### AI Service Flow

```yaml
Step 1: Browse AI services and models
Step 2: Select service and configure parameters
Step 3: Process payment and access service
Step 4: Receive results and provide feedback
Step 5: Rate service quality
```

## Design System

### Color Palette

```yaml
Primary Colors:
  - EHB Blue: #2856F9 (Primary brand color)
  - Gold: #FFCE00 (VIP and premium features)
  - Success Green: #00D68F (Trust and success states)
  - Error Red: #FF3D71 (Errors and warnings)
  - Warning Orange: #FF6B35 (Warnings and alerts)

Background Colors:
  - Primary Background: #F8F9FC (Light theme)
  - Secondary Background: #FFFFFF (Cards and containers)
  - Dark Background: #1A1A1A (Dark theme)
  - Overlay: rgba(0, 0, 0, 0.5) (Modal overlays)

Text Colors:
  - Primary Text: #2E3A59 (Main text)
  - Secondary Text: #8F9BB3 (Subdued text)
  - Disabled Text: #C5CEE0 (Inactive text)
  - Link Text: #2856F9 (Interactive links)
```

### Typography

```yaml
Font Family:
  - Primary: "Inter" (Modern, readable)
  - Secondary: "Roboto" (Fallback)

Font Sizes:
  - H1: 36px (Page titles)
  - H2: 28px (Section headers)
  - H3: 24px (Subsection headers)
  - H4: 20px (Card titles)
  - H5: 18px (Small headers)
  - Body Large: 16px (Main content)
  - Body: 14px (Regular text)
  - Small: 12px (Captions and labels)

Font Weights:
  - Light: 300
  - Regular: 400
  - Medium: 500
  - Semi-bold: 600
  - Bold: 700
```

### Spacing System

```yaml
Grid System:
  - Base Unit: 4px
  - Spacing Scale: 4, 8, 12, 16, 24, 32, 48, 64px

Component Spacing:
  - Card Padding: 24px
  - Button Padding: 12px 24px
  - Form Field Spacing: 16px
  - Section Margins: 48px

Border Radius:
  - Small: 4px (Buttons, inputs)
  - Medium: 8px (Cards, modals)
  - Large: 12px (Large containers)
  - Full: 50% (Avatars, badges)
```

### Icons

```yaml
Icon Libraries:
  - HeroIcons: Primary icon set
  - Lucide: Secondary icon set
  - Custom EHB Line Icons: Brand-specific icons

Icon Sizes:
  - Small: 16px
  - Medium: 20px
  - Large: 24px
  - Extra Large: 32px

Icon Usage:
  - Navigation: 20px
  - Actions: 16px
  - Status: 24px
  - Decorative: 32px
```

### Buttons

```yaml
Button Types:
  - Primary: Solid blue background, white text
  - Secondary: Ghost style with blue border
  - Tertiary: Text-only with blue color
  - Danger: Red background for destructive actions
  - Success: Green background for positive actions

Button States:
  - Default: Normal appearance
  - Hover: Slight elevation and color change
  - Active: Pressed state
  - Disabled: Grayed out with reduced opacity
  - Loading: Spinner with disabled state

Button Sizes:
  - Small: 32px height
  - Medium: 40px height (default)
  - Large: 48px height
```

## Responsive Design

### Desktop (≥1280px)

- **Full Dashboard Layout**: Complete sidebar and main content
- **Multi-column Grids**: 3-4 columns for cards and content
- **Hover Effects**: Rich hover interactions
- **Keyboard Navigation**: Full keyboard support

### Tablet (768–1280px)

- **Collapsible Sidebar**: Sidebar can be toggled
- **Adaptive Grids**: 2-3 columns for content
- **Touch-friendly**: Larger touch targets
- **Optimized Charts**: Simplified data visualization

### Mobile (<768px)

- **Single Column Layout**: Stacked content
- **Floating Navigation**: Bottom navigation bar
- **Touch Gestures**: Swipe, pinch, and tap interactions
- **Voice Search**: Prominent voice search button

### Touch Interactions

- **Swipeable Carousels**: Horizontal scrolling
- **Pull to Refresh**: Content refresh gesture
- **Long Press**: Context menus and actions
- **Voice Commands**: Voice search and navigation

## Accessibility

### Keyboard Navigation

- **Tab Order**: Logical tab sequence across all elements
- **Skip Links**: Skip to main content option
- **Focus Indicators**: Clear visible focus outlines
- **Keyboard Shortcuts**: Common actions accessible via keyboard

### Screen Reader Support

- **ARIA Labels**: Descriptive labels for all interactive elements
- **Landmark Roles**: Proper HTML5 semantic structure
- **Live Regions**: Dynamic content announcements
- **Alternative Text**: Descriptive alt text for images

### Color Contrast

- **WCAG AAA Compliance**: 7:1 contrast ratio for normal text
- **WCAG AA Compliance**: 4.5:1 contrast ratio for large text
- **Color Independence**: Information not conveyed by color alone
- **High Contrast Mode**: Support for system high contrast

### Focus Management

- **Visible Focus**: Clear focus indicators on all interactive elements
- **Focus Trapping**: Modal dialogs trap focus appropriately
- **Focus Restoration**: Return focus after modal dismissal
- **Skip Navigation**: Skip repetitive navigation elements

## Interactive Elements

### Forms

```yaml
Design Principles:
  - Real-time validation with immediate feedback
  - SQL-aware fields that adapt to user level
  - Floating labels for better UX
  - Progressive disclosure for complex forms

Validation States:
  - Default: Neutral appearance
  - Valid: Green border and checkmark
  - Invalid: Red border and error message
  - Loading: Spinner during validation

Form Components:
  - Text Inputs: Single and multi-line
  - Select Dropdowns: Single and multi-select
  - Checkboxes and Radio Buttons: Custom styled
  - File Upload: Drag and drop support
  - Date/Time Pickers: Calendar and time selection
```

### Modals

```yaml
Use Cases:
  - Login and registration forms
  - Order confirmation and details
  - KYC document upload
  - Wallet transactions
  - Settings and preferences

Design Features:
  - Backdrop blur effect
  - Smooth enter/exit animations
  - Focus trapping within modal
  - Escape key to close
  - Click outside to close (optional)
```

### Dropdowns

```yaml
Types:
  - Country selector with flags
  - SQL level filter
  - Category selection
  - Sort options
  - User menu

Features:
  - Search within dropdown
  - Multi-select support
  - Custom option rendering
  - Keyboard navigation
  - Mobile-friendly touch targets
```

### Tooltips

```yaml
Content Types:
  - SQL level explanations
  - Complaint escalation rules
  - Fine calculation logic
  - Feature descriptions
  - Help text

Positioning:
  - Auto-positioning based on viewport
  - Arrow indicators
  - Delay before showing
  - Dismiss on hover out or click
```

## Data Visualization

### Charts

```yaml
Chart Types:
  - Bar Charts: Franchise earnings, sales data
  - Area Charts: Revenue trends over time
  - Pie Charts: Complaint distribution
  - Line Charts: Performance metrics
  - Funnel Charts: Conversion analysis

Design Features:
  - Responsive sizing
  - Interactive tooltips
  - Color-coded data series
  - Export functionality
  - Accessibility support
```

### Tables

```yaml
Data Types:
  - Orders: Status, amount, date, actions
  - Earnings: Period, amount, source, growth
  - Listings: Product, price, rating, status

Features:
  - Sortable columns
  - Pagination
  - Search and filter
  - Bulk actions
  - Export to CSV/PDF
```

### Dashboards

```yaml
User-Specific Views:
  - Buyer Dashboard: Orders, wallet, nearby services
  - Seller Dashboard: Sales, ratings, inventory
  - Franchise Dashboard: Area stats, complaints, income
  - Admin Dashboard: System metrics, user management

Widgets:
  - Real-time metrics
  - Trend indicators
  - Quick action buttons
  - Notification center
  - Recent activity feed
```

### Progress Indicators

```yaml
Types:
  - Loading Spinner: General loading states
  - Linear Progress Bar: File uploads, processes
  - Circular Progress: KYC verification, upgrades
  - Skeleton Loaders: Content placeholders

States:
  - Indeterminate: Unknown duration
  - Determinate: Known progress percentage
  - Success: Completed with checkmark
  - Error: Failed with error icon
```

## Animation & Transitions

### Page Transitions

```yaml
Animation Type: Fade-in from left with layout slide
Duration: 300ms ease-out
Trigger: Route changes and navigation
Fallback: Instant transition for reduced motion preference
```

### Micro-interactions

```yaml
Hover Effects:
  - Card elevation on hover
  - Button color transitions
  - Icon scale animations
  - Loading dots on buttons

Click Feedback:
  - Button press animations
  - Ripple effects
  - Success/error states
  - Loading states
```

### Loading States

```yaml
Spinner Animation: Rotating circle with gradient
Skeleton Loading: Animated placeholder content
Progress Bars: Animated progress indicators
Loading Messages: Contextual loading text
```

### Success/Error Feedback

```yaml
Color-Coded Alerts:
  - Green: Success messages
  - Red: Error messages
  - Yellow: Warning messages
  - Blue: Information messages

Animation Features:
  - Slide-in from top
  - Auto-dismiss after 5 seconds
  - Manual dismiss option
  - Stack multiple alerts
```

## Performance Considerations

### Image Optimization

```yaml
Strategy: Next.js Image component + Cloud CDN
Formats: WebP with JPEG fallback
Sizing: Responsive images with multiple breakpoints
Lazy Loading: Images load as they enter viewport
Compression: Automatic quality optimization
```

### Lazy Loading

```yaml
Components: Charts, complaints, wallet history
Images: Below-the-fold images
Videos: Embedded content
Third-party Scripts: Analytics and tracking
```

### Caching Strategy

```yaml
Client-Side: SWR/React Query for local cache
Server-Side: Redis for session and API data
CDN: Static assets and images
Browser: Service worker for offline support
```

### Bundle Optimization

```yaml
Code Splitting: Dynamic imports for routes
Component Chunking: Lazy load non-critical components
Tree Shaking: Remove unused code
Minification: Compress JavaScript and CSS
```

## Implementation Guidelines

### Development Workflow

1. **Design System**: Establish component library
2. **Prototyping**: Create interactive prototypes
3. **Development**: Implement with React/Next.js
4. **Testing**: Cross-browser and device testing
5. **Optimization**: Performance and accessibility audit

### Quality Assurance

- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge
- **Device Testing**: iOS, Android, various screen sizes
- **Accessibility Testing**: Screen reader compatibility
- **Performance Testing**: Lighthouse scores and metrics

### Maintenance

- **Regular Updates**: Keep design system current
- **User Feedback**: Incorporate user suggestions
- **Analytics**: Monitor user behavior and pain points
- **A/B Testing**: Test design variations for optimization

## Conclusion

This UI/UX design system provides a comprehensive foundation for creating exceptional user experiences across the EHB ecosystem. The modular approach ensures consistency, scalability, and maintainability while delivering modern, accessible, and performant interfaces.

---

_Last Updated: [Current Date]_
_Version: 1.0_
_Status: Draft - Ready for Review_
