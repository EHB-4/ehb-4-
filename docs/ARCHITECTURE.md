# EHB Monorepo Architecture Overview

## System Diagram

```
+-------------------+      +-------------------+      +-------------------+
|    Frontend       |      |   Admin Panel     |      |     Portal        |
|  (Next.js, 3000)  |      | (Next.js, 8000)   |      | (Next.js, 8080)   |
+-------------------+      +-------------------+      +-------------------+
           |                        |                        |
           +-----------+------------+------------+-----------+
                                   |
                          +----------------+
                          |   Backend API  |
                          | (Node/Next.js, |
                          |     5000)      |
                          +----------------+
                                   |
                          +----------------+
                          |   Database(s)  |
                          | (Mongo, SQL)   |
                          +----------------+
```

## Service Descriptions

- **Frontend**: Main user-facing web app (Next.js, port 3000)
- **Admin Panel**: Admin dashboard for management (Next.js, port 8000)
- **Portal**: User portal for special features (Next.js, port 8080)
- **Backend**: API and business logic (Node.js/Express or Next.js API, port 5000)
- **Shared**: Common code, types, and utilities used by all services

## How Services Interact
- All frontend apps (frontend, admin-panel, portal) communicate with the backend via REST or GraphQL APIs.
- Backend connects to databases and external services (AWS, etc.).
- Shared folder is used for code reuse (types, utils, components).

## Scaling & Deployment
- All services are containerized via Docker Compose for easy scaling and deployment.
- Each service can be deployed independently or together on AWS, Vercel, or any cloud provider.

---
**For more details, see individual service READMEs and the main README.md.** 