# Browser Console Port Error Fix Guide

## Problem

Browser console shows port errors when trying to start the Next.js development server.

## Solutions

### Quick Fix

Run the automatic port fix script:

```bash
npm run port-fix
```

This script will:

- Find an available port (3000, 5500, 3001, 3002)
- Clear any conflicting processes
- Start the development server automatically

### Comprehensive Fix

For more serious issues, run the full console fix:

```bash
npm run console-fix:all
```

This will:

- Clear all common development ports
- Clear Next.js cache
- Clear npm cache
- Reinstall dependencies
- Generate Prisma client
- Start the server

### Manual Port Management

#### Clear Specific Ports

```bash
# Clear all ports
npm run port-fix:all

# Or manually clear specific ports
npx kill-port 3000 5500 3001 3002
```

#### Start on Specific Port

```bash
# Start on port 3000
npm run dev:3000

# Start on port 5500
npm run dev:5500

# Start with automatic port detection
npm run port-fix
```

### Available Scripts

| Script                    | Description                             |
| ------------------------- | --------------------------------------- |
| `npm run dev`             | Start Next.js on default port           |
| `npm run dev:3000`        | Start on port 3000                      |
| `npm run dev:5500`        | Start on port 5500                      |
| `npm run port-fix`        | Auto-detect and start on available port |
| `npm run port-fix:all`    | Clear all common development ports      |
| `npm run console-fix`     | Start server with basic fixes           |
| `npm run console-fix:all` | Comprehensive fix and restart           |

### Common Issues and Solutions

#### Issue: "Port already in use"

**Solution:**

```bash
npm run port-fix:all
npm run port-fix
```

#### Issue: "Module not found" errors

**Solution:**

```bash
npm run console-fix:all
```

#### Issue: "Prisma client not generated"

**Solution:**

```bash
npx prisma generate
npm run port-fix
```

#### Issue: "Next.js cache issues"

**Solution:**

```bash
rm -rf .next
npm run port-fix
```

### Environment Variables

The following environment variables are automatically set:

- `NODE_ENV=development`
- `NEXT_TELEMETRY_DISABLED=1`
- `PORT` (automatically detected)

### Troubleshooting

1. **If scripts don't work:**

   ```bash
   npm install
   npm run port-fix
   ```

2. **If ports are still blocked:**

   ```bash
   # On Windows
   taskkill /F /IM node.exe

   # Then run
   npm run port-fix
   ```

3. **If browser shows connection errors:**
   - Check if server is running: `netstat -ano | findstr :3000`
   - Try different port: `npm run dev:5500`
   - Clear browser cache and reload

### Development Workflow

1. **Start development:**

   ```bash
   npm run port-fix
   ```

2. **If you encounter issues:**

   ```bash
   npm run console-fix:all
   ```

3. **For production build:**
   ```bash
   npm run build
   npm start
   ```

### Notes

- The port-fix script automatically finds the first available port
- All scripts include proper error handling
- The server will restart automatically if it crashes
- Browser console errors should be resolved after running the fix scripts
