#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const axios = require('axios');
let chalk;
try {
  chalk = require('chalk');
} catch {
  chalk = { green: x => x, red: x => x, yellow: x => x, blue: x => x, bold: x => x };
}

const API_BASE = 'http://localhost:3000'; // Change if your dev server runs elsewhere

// Helper to recursively find all API routes
function findApiRoutes(dir, baseRoute = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      routes = routes.concat(
        findApiRoutes(path.join(dir, entry.name), baseRoute + '/' + entry.name)
      );
    } else if (
      entry.isFile() &&
      (entry.name === 'route.ts' ||
        entry.name === 'route.js' ||
        entry.name.endsWith('.ts') ||
        entry.name.endsWith('.js'))
    ) {
      // Remove .ts/.js for pages/api, keep for app/api
      let route = baseRoute;
      if (entry.name !== 'route.ts' && entry.name !== 'route.js') {
        route += '/' + entry.name.replace(/\.(ts|js)$/, '');
      }
      routes.push(route.replace(/\/index$/, ''));
    }
  }
  return routes;
}

// Find all app/api and pages/api endpoints
function getAllApiEndpoints() {
  const endpoints = [];
  const appApiDir = path.join(process.cwd(), 'app', 'api');
  const pagesApiDir = path.join(process.cwd(), 'pages', 'api');
  if (fs.existsSync(appApiDir)) {
    endpoints.push(...findApiRoutes(appApiDir, '/api'));
  }
  if (fs.existsSync(pagesApiDir)) {
    endpoints.push(...findApiRoutes(pagesApiDir, '/api'));
  }
  return endpoints;
}

// Try GET and POST for each endpoint
async function testEndpoint(endpoint) {
  let results = [];
  for (const method of ['GET', 'POST']) {
    try {
      const res = await axios({
        url: API_BASE + endpoint,
        method,
        validateStatus: () => true,
        timeout: 5000,
      });
      results.push({ method, status: res.status, data: res.data });
    } catch (err) {
      results.push({ method, status: 'ERR', data: err.message });
    }
  }
  return results;
}

// Suggest fix based on error/status
function suggestFix(status, data) {
  if (status === 401 || (data && data.error && /unauth/i.test(data.error))) {
    return 'Auth error: Check session/login or NEXTAUTH config in .env.';
  }
  if (status === 403) {
    return 'Permission error: Check user roles/permissions.';
  }
  if (status === 404) {
    return 'Not found: Check route/file exists and is correctly named.';
  }
  if (status === 500 || (data && data.error && /internal|failed|server/i.test(data.error))) {
    return 'Server error: Check DB connection, env config, and code for bugs.';
  }
  if (status === 'ERR') {
    if (/ECONNREFUSED/.test(data)) return 'Server not running. Start with `npm run dev`.';
    if (/timeout/.test(data)) return 'Request timed out. Check server and endpoint.';
    return 'Network error: Check server and endpoint.';
  }
  if (status === 405) {
    return 'Method not allowed: This endpoint may not support this HTTP method.';
  }
  return 'No error or unknown issue.';
}

(async () => {
  console.log(chalk.blue.bold('\n--- API Auto Test & Fix Report ---\n'));
  const endpoints = getAllApiEndpoints();
  if (!endpoints.length) {
    console.log(chalk.red('No API endpoints found.'));
    process.exit(1);
  }
  let summary = [];
  for (const endpoint of endpoints) {
    console.log(chalk.yellow(`\nTesting ${endpoint} ...`));
    const results = await testEndpoint(endpoint);
    for (const { method, status, data } of results) {
      let statusStr = status === 200 ? chalk.green(status) : chalk.red(status);
      let msg = data && data.error ? data.error : typeof data === 'string' ? data : 'OK';
      let fix = suggestFix(status, data);
      summary.push({ endpoint, method, status, msg, fix });
      console.log(`  [${method}] Status: ${statusStr} | ${msg}`);
      if (fix && fix !== 'No error or unknown issue.') {
        console.log(chalk.blue('    Fix:'), fix);
      }
    }
  }
  // Summary
  console.log(chalk.bold('\n--- Summary ---'));
  for (const { endpoint, method, status, msg, fix } of summary) {
    let statusStr = status === 200 ? chalk.green(status) : chalk.red(status);
    console.log(`${endpoint} [${method}] => ${statusStr} | ${msg}`);
    if (fix && fix !== 'No error or unknown issue.') {
      console.log('   Fix:', fix);
    }
  }
  console.log(chalk.blue.bold('\n--- End of Report ---\n'));
})();
