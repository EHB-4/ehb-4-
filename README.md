# EHB Monorepo Professional Setup

## Overview
This repository contains all core services for the EHB platform in a single monorepo, following best industry practices for scalability, maintainability, and developer experience.

## Structure
```
/ehb-project-root
  /frontend      # Main Next.js frontend
  /backend       # Node.js/Express or Next.js API backend
  /admin-panel   # Admin dashboard (Next.js)
  /portal        # User portal (Next.js)
  /shared        # Shared code, types, utils
```

## Getting Started

### 1. Install Dependencies
```sh
npm install
```

### 2. Environment Variables
- Copy `.env.example` from each service to `.env` and fill in real values.

### 3. Run All Services (Recommended: Docker Compose)
```sh
docker-compose up --build
```

### 4. Run Individually (Dev Mode)
- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && npm run dev`
- Admin Panel: `cd admin-panel && npm run dev`
- Portal: `cd portal && npm run dev`

## Ports
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- Admin Panel: [http://localhost:8000](http://localhost:8000)
- Portal: [http://localhost:8080](http://localhost:8080)

## Requirements
- Node.js (LTS)
- npm
- Docker Desktop (for Windows/Mac)
- Git

## CI/CD
- Sample GitHub Actions config included in `.github/workflows/`

## Documentation
- See `/docs` for architecture, onboarding, and more.

---
**For any issues, please contact the project maintainer or open an issue.**
