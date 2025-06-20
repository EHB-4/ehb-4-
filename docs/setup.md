# Setup Guide

## Prerequisites

- Node.js 18+ 
- npm 9+
- Docker (for MongoDB)
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ehb-next-js-04
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start MongoDB:
```bash
docker-compose up -d mongodb
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="mongodb://admin:ehb123456@localhost:27017/ehb_database?authSource=admin"

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key

# JWT
JWT_SECRET=your-jwt-secret-key

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Stripe (Optional)
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-key
STRIPE_SECRET_KEY=sk_test_your-stripe-key

# OpenAI (Optional)
OPENAI_API_KEY=your-openai-api-key
```

## Database Setup

1. Start MongoDB with Docker:
```bash
docker-compose up -d mongodb
```

2. Run Prisma migrations:
```bash
npx prisma migrate dev
```

3. Seed the database (optional):
```bash
npx prisma db seed
```

## Testing Setup

1. Run tests:
```bash
npm test
```

2. Run tests with coverage:
```bash
npm run test:coverage
```

3. Run E2E tests:
```bash
npm run cypress:open
```

## Deployment

1. Build for production:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Troubleshooting

### Common Issues

1. **MongoDB connection failed**
   - Ensure Docker is running
   - Check if MongoDB container is started
   - Verify DATABASE_URL in .env.local

2. **Prisma errors**
   - Run `npx prisma generate`
   - Check database connection
   - Verify schema.prisma file

3. **Build errors**
   - Clear .next directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

### Getting Help

- Check the logs in the `logs/` directory
- Review error messages in the console
- Open an issue on GitHub
