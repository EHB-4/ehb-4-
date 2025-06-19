# MongoDB, Docker, and Prisma Auto Testing Watcher

This automated testing script monitors your backend environment files and automatically runs MongoDB, Docker, and Prisma tests whenever changes are detected.

## 🎯 What it does

The watcher automatically monitors these files for changes:

- `ehb-backend/.env` - Backend environment configuration
- `prisma/schema.prisma` - Prisma database schema
- `docker-compose.yml` - Docker Compose configuration

When any of these files change, it automatically:

1. **Checks local MongoDB** - Tests if MongoDB is installed and running locally
2. **Starts Docker MongoDB** - If local MongoDB fails, starts a Docker container
3. **Inserts test data** - Adds test data to verify database connectivity
4. **Sets up Prisma** - Configures Prisma with the MongoDB connection
5. **Generates reports** - Creates success/error reports in `./cursor-test-results/`

## 🚀 Quick Start

### Option 1: Using npm scripts (Recommended)

```bash
# Start the watcher (Windows PowerShell)
npm run mongo-watcher:win

# Start the watcher (Node.js - cross-platform)
npm run mongo-watcher

# Run tests once without watching
npm run mongo-test

# Run tests once using Node.js
npm run mongo-test:js
```

### Option 2: Direct execution

```bash
# Windows (PowerShell)
powershell -ExecutionPolicy Bypass -File scripts/mongo-docker-prisma-watcher.ps1

# Windows (Batch file)
scripts/start-mongo-watcher.bat

# Node.js (cross-platform)
node scripts/mongo-docker-prisma-watcher.js
```

### Option 3: Run once (no watching)

```bash
# PowerShell
powershell -ExecutionPolicy Bypass -File scripts/mongo-docker-prisma-watcher.ps1 -RunOnce

# Node.js
node -e "const { MongoDockerPrismaWatcher } = require('./scripts/mongo-docker-prisma-watcher.js'); new MongoDockerPrismaWatcher().runTests();"
```

## 📋 Prerequisites

### Required Software

1. **Node.js** (v14 or higher)
2. **npm** or **yarn**
3. **Docker** (for MongoDB container)
4. **PowerShell** (for Windows scripts)

### Optional Software

- **MongoDB** (local installation - if not available, Docker will be used)

## 🔧 Configuration

### Environment Setup

The watcher automatically creates/updates `ehb-backend/.env` with:

```env
DATABASE_URL="mongodb://localhost:27018/test"
```

### Docker Configuration

- **Container Name**: `test-mongo`
- **Port**: `27018` (to avoid conflicts with local MongoDB)
- **Database**: `test`

## 📊 Test Results

### Success Report

When tests pass, a report is created at `./cursor-test-results/report.txt`:

```
Mongo + Docker + Prisma Connected Successfully ✅

Test Results:
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "tests": {
    "localMongo": { "status": "success", "message": "Local MongoDB is running" },
    "dockerMongo": { "status": "success", "message": "Docker MongoDB started successfully" },
    "dataInsertion": { "status": "success", "message": "Test data inserted successfully" },
    "prismaSetup": { "status": "success", "message": "Prisma setup completed" }
  }
}

Timestamp: 2024-01-15 10:30:00
Status: All tests passed successfully

Files monitored:
ehb-backend/.env
prisma/schema.prisma
docker-compose.yml

Test Summary:
✅ Local MongoDB check
✅ Docker MongoDB container
✅ Test data insertion
✅ Prisma setup and configuration
✅ Database connection established

Environment:
- MongoDB URL: mongodb://localhost:27018/test
- Docker Container: test-mongo
- Prisma Schema: Updated and synchronized
```

### Error Report

If tests fail, an error report is created at `./cursor-test-results/error-report.txt`.

## 🔍 What the Tests Do

### 1. Local MongoDB Check

```bash
mongosh --eval "db.stats()"
```

- Tests if MongoDB is installed and running locally
- If successful, skips Docker setup

### 2. Docker MongoDB Setup

```bash
docker pull mongo
docker run --name test-mongo -d -p 27018:27017 mongo
```

- Pulls latest MongoDB image
- Starts container on port 27018
- Waits for MongoDB to be ready

### 3. Test Data Insertion

```javascript
db.cursorCheck.insertOne({
  name: 'Cursor AI Test',
  createdAt: new Date(),
  testId: 'random_id',
});
```

- Inserts test document into `test.cursorCheck` collection
- Verifies database connectivity

### 4. Prisma Setup

```bash
npx prisma generate
npx prisma db push
```

- Generates Prisma client
- Pushes schema to MongoDB
- Updates environment configuration

## 🛠️ Troubleshooting

### Common Issues

1. **Docker not running**

   ```
   Error: Failed to start Docker MongoDB
   ```

   - Start Docker Desktop
   - Ensure Docker service is running

2. **Port 27018 already in use**

   ```
   Error: MongoDB failed to start within timeout period
   ```

   - Stop existing containers: `docker stop test-mongo`
   - Remove container: `docker rm test-mongo`

3. **PowerShell execution policy**

   ```
   Error: Cannot run script
   ```

   - Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

4. **Prisma not installed**
   ```
   Error: npx prisma generate failed
   ```
   - Install Prisma: `npm install prisma @prisma/client`

### Manual Cleanup

```bash
# Stop and remove Docker container
docker stop test-mongo
docker rm test-mongo

# Remove test results
rm -rf ./cursor-test-results

# Clean Prisma
npx prisma generate --force
```

## 🔄 Continuous Monitoring

The watcher runs continuously and monitors files in real-time:

- **File Changes**: Automatically detects when monitored files are modified
- **Duplicate Prevention**: Prevents multiple test runs from overlapping
- **Error Handling**: Gracefully handles failures and creates error reports
- **Logging**: Provides detailed console output with timestamps

## 📁 File Structure

```
scripts/
├── mongo-docker-prisma-watcher.js      # Node.js watcher (cross-platform)
├── mongo-docker-prisma-watcher.ps1     # PowerShell watcher (Windows)
├── start-mongo-watcher.bat             # Batch file launcher
└── README-mongo-watcher.md             # This documentation

cursor-test-results/
├── report.txt                          # Success report
└── error-report.txt                    # Error report (if any)
```

## 🎯 Integration with Development Workflow

### Git Hooks

Add to your `.husky/pre-commit`:

```bash
#!/bin/sh
npm run mongo-test
```

### CI/CD Pipeline

Add to your GitHub Actions workflow:

```yaml
- name: Test MongoDB and Prisma
  run: npm run mongo-test
```

### IDE Integration

Configure your IDE to run the watcher on file changes or add it to your development scripts.

## 📞 Support

If you encounter issues:

1. Check the error report in `./cursor-test-results/error-report.txt`
2. Verify Docker is running and accessible
3. Ensure all prerequisites are installed
4. Check the console output for detailed error messages

## 🔄 Updates

The watcher automatically handles:

- ✅ File monitoring and change detection
- ✅ Docker container management
- ✅ MongoDB connectivity testing
- ✅ Prisma schema synchronization
- ✅ Environment configuration
- ✅ Test result reporting

---

**Happy Testing! 🎉**
