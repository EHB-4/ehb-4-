# GoSellr Module — EHB Technologies

## Overview

GoSellr is a global e-commerce and services platform for verified sellers, buyers, and service providers. It is fully integrated with EHB's wallet, franchise, complaint, and AI agent systems.

---

## Key Features

- Coupon & Discount System
- Multi-Currency Support
- AI Auto-Pricing Advisor
- Advanced Filter/Sort
- Top Seller/Top Product Widget
- Product Variant System
- Photo & Video Gallery
- Dynamic Stock & Order Cap
- Product Suggestion to Buyer
- Delivery Tracking Map
- Delivery ETA Calculator
- Service & Product Portfolio View
- Verified Document Badge
- Live Chat (Seller & Buyer)
- Area Performance Score
- Auto Cross-Listing
- Earning Projection & Tax Report
- Bulk Product Uploader
- Service Testing Request
- Post Order Lock Period

---

## Agent Assignments

| Feature                      | Agent(s)        |
| ---------------------------- | --------------- |
| UI/UX, Filters, Badges       | UI Agent        |
| API Routes, Discount, Tax    | API Agent       |
| Coupon, Lock, Refund         | Wallet Agent    |
| Delivery, Area Score         | Franchise Agent |
| Price Suggestion, Buyer Rec. | AI Agent        |
| Complaint, Order Lock        | Complaint Agent |

---

## Folder Structure

```plaintext
/app/gosellr/
  /api/           # API routes (discount, coupon, bulk-upload, tax-report, etc.)
  /components/    # UI components (filters, badges, widgets, gallery, etc.)
  /agents/        # Agent scripts (UIAgent, APIAgent, WalletAgent, etc.)
  /hooks/         # Custom React hooks
  /utils/         # Utility functions (currency, pricing, etc.)
  /pages/         # Next.js pages (home, product, dashboard, etc.)
  /styles/        # CSS/SCSS modules
  /tests/         # Unit/integration tests
  README.md
```

---

## Dev Flow Summary

1. **UI Agent**: Build advanced filter, verification badges, micro-store tabs
2. **API Agent**: Implement new API endpoints, connect to AI/SQL tagging
3. **Wallet Agent**: Sync discounts, refunds, post-order lock
4. **Franchise Agent**: Track delivery, area score, income share
5. **AI Agent**: Price suggestion, buyer recommendations
6. **Complaint Agent**: Add new complaint categories, EDR re-check

---

_This module is ready for agent-based, automation-driven development in Cursor/GitHub._
