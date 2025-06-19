@echo off
echo 🔍 EHB System Status Check
echo =========================
echo.

echo 1️⃣ Checking Docker...
docker info >nul 2>&1
if %errorlevel% equ 0 (
    echo 🟢 Docker is running.
) else (
    echo 🔴 Docker is NOT running.
)

echo.
echo 2️⃣ Checking MongoDB Container...
docker ps | findstr mongo >nul 2>&1
if %errorlevel% equ 0 (
    echo 🟢 MongoDB container is running.
) else (
    echo 🔴 MongoDB container not found.
)

echo.
echo 3️⃣ Checking Prisma Setup...
if exist "prisma\schema.prisma" (
    echo 🟢 Prisma schema exists.
) else (
    echo 🔴 Prisma schema not found.
)

echo.
echo 4️⃣ Checking Application Status...
if exist "package.json" (
    echo 🟢 package.json found.
) else (
    echo 🔴 package.json not found.
)

echo.
echo 5️⃣ Checking Environment Configuration...
if exist ".env" (
    echo 🟢 Found: .env
) else if exist ".env.local" (
    echo 🟢 Found: .env.local
) else if exist ".env.development" (
    echo 🟢 Found: .env.development
) else (
    echo 🔴 No environment files found.
)

echo.
echo 📊 Status Summary:
echo =================
echo ✅ Basic system checks completed

echo.
echo 💡 Quick Commands:
echo npm run dev          - Start development server
echo npm run mongo-fast   - Run MongoDB tests
echo npx prisma studio    - Open Prisma Studio
echo docker ps            - Check running containers

pause 