# EHB Affiliate Program — Module Overview

## 🌟 Key Features
- 5-Level Referral Structure (L1–L5)
- Direct & Indirect Income (commission, bonus, performance rewards)
- Network Tree View (downline, SQL level, earnings)
- AI Tracking Engine (fraud detection, rank promotion)
- Trusty Wallet Integration (commission lock, bonus release)
- Affiliate Dashboard (income, rank, team, pending income)
- Rank Badges & Milestones
- Global Tracking (all EHB modules)
- Terms & Conditions Page
- Asset Center (banners, videos, brochures)
- Commission Unlock Timer
- EHBGC Locked Bonus System
- Email/Push Notifications
- Mobile Invite Tools
- Analytics Panel (conversion, heatmap, SQL growth)
- Franchise Sync
- Violation Monitoring

---

## 🤖 Agent Assignments
| Feature                        | Agent(s)                  |
|-------------------------------|---------------------------|
| Dashboard, Invite, Asset Center| UI Agent                  |
| API, Invite, Fraud Detection   | API Agent, Monitoring Agent|
| Bonus, Lock, Commission        | Wallet Agent, Complaint Agent|
| Analytics Panel                | Analytics Agent           |
| Asset Storage                  | Storage Agent             |
| Franchise Sync                 | Franchise Agent, Affiliate Agent|
| Notifications                  | Notification Agent        |
| Violation Monitoring           | Monitoring Agent, PSS Agent|

---

## 📁 Folder Structure
```plaintext
/app/modules/affiliate/
  affiliateController.ts
  affiliateRoutes.ts
  affiliateDashboard.tsx
  referralTracking.ts
  teamTreeLogic.ts
  walletIntegration.ts
  analyticsAgent.ts
  storageAgent.ts
  /components/
    AssetCenter.tsx
    AnalyticsPanel.tsx
    InviteTools.tsx
    TermsPage.tsx
    CommissionLock.tsx
    LockBonus.tsx
    ViolationMonitor.tsx
  /tests/
  README.md
```

---

## 🚦 Dev Flow Summary
1. **UI Agent**: Build dashboard, asset center, invite tools, terms page
2. **API Agent**: Implement referral, fraud, analytics endpoints
3. **Wallet Agent**: Commission lock, bonus, EHBGC lock logic
4. **Analytics Agent**: Real-time stats, conversion, heatmap
5. **Storage Agent**: Asset upload/download logic
6. **Franchise Agent**: Franchise sync for affiliate rewards
7. **Notification Agent**: Email/push alerts
8. **Monitoring Agent**: Violation detection, fraud flagging

---

*This module is ready for agent-based, automation-driven development in Cursor/GitHub.* 