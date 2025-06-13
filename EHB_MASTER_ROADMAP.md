# EHB Technologies Master Roadmap

---

## 1. Company Overview
| Field | Description |
|-------|-------------|
| **Company Name** | EHB Technologies Limited |
| **Mission** | To provide 100% verified, AI-powered, blockchain-backed global services and products through a decentralized ecosystem accessible to every individual. |
| **Vision** | To become the world's leading unified service platform where users can trust, earn, learn, and transact securely, across all industries and countries, with full transparency and automation. |
| **Primary Goals** | Launch GoSellr as a global e-commerce + services platform; Deploy EHBGC token with Trusty Wallet and Validator Income Model; Implement SQL-based verified profile system (PSS, EMO, EDR); Launch global franchise network (Sub, Master, Corporate); Integrate AI agents for system-wide automation and assistant tasks |
| **Core Values** | Verification Before Profit, Transparency, Decentralization, Empowerment Through Technology, Zero Tolerance for Fraud |
| **Target Market** | Global product sellers and buyers, service providers, students, teachers, doctors, lawyers, franchise investors, freelancers, underserved regions |
| **Monetization Strategy** | SQL-based registration fees, franchise sales, EHBGC coin lock, commission on transactions, paid dashboards, AI-based ads, subscription APIs |

---

## 2. Departments
| Department Name | Description | Responsibilities | Connected Services | Status |
|----------------|-------------|------------------|--------------------|--------|
| PSS | Handles verification of users, businesses, services, and products | KYC, identity verification, document validation, fraud prevention, complaint judgment | GoSellr, Law, Health, Education, Jobs, Marketplace | In Progress |
| EDR | Verifies real-world skills and knowledge through online/offline testing | Conducts practical exams, auto-downgrades expired users, manages SQL level renewals | Education, Job System (JPS), Service Provider System | In Progress |
| EMO | Local physical and digital office hub for documentation, service verification, and staff support | Accepts physical KYC, manages real-world records, serves as data bridge for departments | Health, Law, GoSellr, Real Estate, Travel | Planned |
| JPS | Manages all user profiles and connects job seekers with service needs | Handles all user account creation, CVs, resumes, referral systems, social ranking | All Modules, Job Portal, AI Marketplace | In Progress |
| Franchise | Manages global franchise network (sub, master, corporate) | Franchise onboarding, income tracking, order control, area monitoring, auto-fines | All Modules | Planned |
| AI/Agents | Oversees AI agents across services and system logic | Task automation, prompt handling, code generation, monitoring, training, development acceleration | All modules | In Progress |
| WMS | Provides health-related services through verified clinics, doctors, and records | Appointment booking, doctor verification, prescription management, SQL-based ranking | Health Dashboard, GoSellr (Health), AI Marketplace | Planned |
| OLS | Offers legal service verification and hiring of lawyers or legal firms | Lawyer validation, chamber linking, service agreements, contract models | Law Portal, Complaint System, Franchise Legal Escalation | Planned |
| AGTS | Enables international and local travel booking with service validation | Travel agent profiles, vehicle/service booking, KYC validation | Travel Dashboard, GoSellr (Tickets & Travel), AI Marketplace | Planned |
| OBS | AI-powered bookstore with global access to books, study materials, and learning content | Book uploads, teacher uploads, sales management, ranking system | Education, Marketplace, GoSellr (Books) | Planned |
| Finance | Manages coin-based systems, wallet balance, validator income, and transactions | Coin lock, wallet deduction, EHBGC validator setup, earnings split, cron tasks | Wallet, Loyalty, Franchise Income, Reward Engine | In Progress |
| Support & Complaint | Manages user complaints, time-based fine system, and complaint escalations | Complaint timers, auto-resolution system, support tickets, fraud reports | All services, Franchise Fine System, Legal Team | Planned |

---

## 3. Services / Products / Modules
### (See previous step for full details. Each module has: Description, Target Users, Features, Dependencies, Status)
- GoSellr
- JPS (Job Providing System)
- EHBGC Wallet
- Validator System
- AI Marketplace
- Trusty Wallet
- OBS (Online Book Store)
- WMS (World Medical Services)
- OLS (Online Law Services)
- AGTS (Advanced Global Travel Services)
- EHB Aid (Verified Ad Platform)

---

## 4. Components
| Component Name | Description | Tech Stack | Responsibilities | Connected Modules | Status |
|---------------|-------------|------------|------------------|-------------------|--------|
| Frontend | User interface for all platforms | Next.js, React, TailwindCSS, TypeScript | UI/UX, routing, state management, API integration | All modules | In Progress |
| Backend | Main server logic and API layer | Node.js, Express, TypeScript, JWT, Bcrypt | Auth, wallet processing, SQL logic, franchise logic | All dynamic modules | In Progress |
| Database | Stores all persistent data | MongoDB, Mongoose | User profiles, wallet, products, orders, validators | JPS, Wallet, GoSellr, Education, Validator | In Progress |
| API Layer | RESTful API interface | Express.js, Axios, OpenAPI (Planned) | Connect UI to backend, secure access, validation | All | In Progress |
| Smart Contract Layer | Blockchain contracts | Solidity, Moonbeam, Polkadot (Planned) | Coin lock, validator rewards, eligibility | Wallet, Validator, Loyalty | Planned |
| Monitoring & Sync | Tracks health, logs, sync | Node.js, CRON, Winston, Prometheus (Planned) | Cron tasks, activity tracking, flag issues | Wallet, Validator, Franchise, SQL | Planned |
| Voice / AI Agent | Converts input to commands | OpenAI API, Whisper, LangChain (Planned) | AI task interpretation, code, voice commands | All | In Progress |

---

## 5. User Flows
### (See previous step for full details. Each user type has: Goals, Steps, Interactions, Permissions)
- Seller
- Buyer
- Franchise Owner
- Admin
- Service Provider
- Student
- Doctor

---

## 6. Tech Stack
| Layer/Area | Technology/Tool(s) | Notes |
|------------|--------------------|-------|
| Frontend | Next.js, React, TailwindCSS, TypeScript | Dynamic dashboards, card system |
| Backend | Node.js, Express.js, TypeScript, JWT, Bcrypt | RESTful APIs, business logic |
| Database | MongoDB, Mongoose | JSON-like structure |
| API Layer | Express.js, Axios, OpenAPI (Planned) | Centralized routing |
| Blockchain | Solidity, Moonbeam, Polkadot (Planned), Ethers.js | Coin lock, validator contracts |
| Monitoring | Winston, CRON, Prometheus (Planned), Grafana (Planned) | Tracks SQL, uptime |
| AI/Voice | OpenAI API, Whisper, LangChain (Planned) | Agent automation |
| DevOps | Vercel, Docker (planned), GitHub Actions, AWS EC2 (planned) | CI/CD, auto-sync |
| Storage | AWS S3 (planned), IPFS (planned), Google Cloud Storage (optional) | File uploads |
| CDN | Cloudflare, Vercel Edge, Redis (planned) | Global cache |
| Other | Google Analytics, Sentry (planned), Next SEO Plugin | SEO, error tracking |

---

## 7. Roadmap Phases
| Phase | Focus | Description |
|-------|-------|-------------|
| Foundation | Infrastructure | Set up dashboards, routing, MongoDB, wallets, auth, franchises |
| MVP | Core Modules | GoSellr, JPS, SQL Engine, Wallet, Complaint System, AI Marketplace |
| Launch | Blockchain + Payout | Moonbeam integration, smart contracts, validator payouts |
| Growth | Departments | Education, Law, Health, OBS, AGTS full launch |
| Scale | Globalization | Multi-language, CDN, i18n, CMS, analytics, auto AI workflows |

---

## 8. AI Agent Assignments
| Module/Phase | Assigned Agents |
|--------------|----------------|
| UI/Frontend | UI Agent |
| API/Backend | API Agent |
| Wallet/Finance | Wallet Agent, Reward Agent |
| Franchise | Franchise Agent |
| Validator | Validator Agent, Reward Agent |
| PSS/EDR/EMO | PSS/EDR/EMO Agent |
| Complaint System | Complaint Agent |
| Monitoring/Sync | Monitoring Agent |
| DevOps/Deployment | DevOps Agent |
| Speed Optimization | Speed Optimization Agent |

---

## 9. Folder Structure (Cursor/GitHub Ready)
```plaintext
/ehb-technologies
  /app
    /frontend
    /backend
    /api
    /wallet
    /franchise
    /validator
    /pss
    /edr
    /emo
    /complaint
    /monitoring
    /devops
    /ai-agents
    /docs
    /config
    /public
  /scripts
  /tests
  /deploy
  /infrastructure
  /README.md
  /EHB_MASTER_ROADMAP.md
```

---

## 10. Agent Template Files
- `UIAgent.ts` (UI generation, dashboard rendering)
- `APIAgent.ts` (API route creation, validation)
- `WalletAgent.ts` (wallet logic, staking, rewards)
- `FranchiseAgent.ts` (income split, region logic)
- `ValidatorAgent.ts` (validator checks, smart contract calls)
- `PSSAgent.ts` (KYC, SQL, verification)
- `ComplaintAgent.ts` (complaint timer, escalation)
- `MonitoringAgent.ts` (logs, metrics, sync)
- `DevOpsAgent.ts` (deployment, CI/CD)
- `SpeedOptimizationAgent.ts` (performance, bottleneck detection)

---

## 11. Reward Agent
| Field | Description |
|-------|-------------|
| **Agent Name** | Reward Agent |
| **Role/Responsibilities** | Loyalty rewards, bonus payouts, validator incentives, affiliate income auto-calculate aur distribute karega. |
| **Connected Modules** | Wallet, Validator, Affiliate, Franchise, Loyalty System |
| **Special Features** | Monthly/weekly auto-payout, bonus alerts, affiliate tree tracking, reward dashboard card |

- `RewardAgent.ts` (loyalty, bonus, affiliate, validator rewards)

---

*This file is ready for Notion import/export, GitHub, and AI-driven automation.* 