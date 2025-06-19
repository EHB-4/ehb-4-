#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

const axios = require('axios');

// Configuration
const config = {
  baseUrl: 'http://localhost:3002',
  timeout: 5000,
  retries: 2,
  endpoints: {
    auth: ['/api/auth/login', '/api/auth/register'],
    database: ['/api/health/db'],
    payment: ['/api/payments/process'],
    user: ['/api/user/profile'],
  },
};

// Helper Functions
async function log(message, type = 'info') {
  const chalk = await import('chalk');
  const colors = {
    info: chalk.default.blue,
    success: chalk.default.green,
    error: chalk.default.red,
    warning: chalk.default.yellow,
  };
  console.log(colors[type](message));
}

async function checkDatabase() {
  try {
    const mongoUri =
      'mongodb+srv://ehb:ehb@ehbportal.zqacgnu.mongodb.net/ehb1?retryWrites=true&w=majority&appName=ehbportal';
    const response = await axios.get(`${config.baseUrl}/api/health/db`, {
      headers: {
        'x-mongodb-uri': mongoUri,
      },
    });
    return response.data;
  } catch (error) {
    return {
      status: 'error',
      message: 'Database connection failed',
      error: error.message,
    };
  }
}

async function checkAuth() {
  try {
    const authStatus = await axios.get(`${config.baseUrl}/api/auth/status`);
    return authStatus.data;
  } catch (error) {
    return { status: 'error', message: 'Authentication service unavailable' };
  }
}

async function testEndpoint(endpoint, method = 'GET') {
  const startTime = performance.now();
  try {
    const response = await axios({
      url: `${config.baseUrl}${endpoint}`,
      method,
      timeout: config.timeout,
      validateStatus: () => true,
    });

    const endTime = performance.now();
    const responseTime = (endTime - startTime).toFixed(2);

    return {
      status: response.status,
      responseTime: `${responseTime}ms`,
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      status: 'error',
      responseTime: 'N/A',
      data: null,
      error: error.message,
    };
  }
}

async function checkEnvironment() {
  const requiredEnvVars = ['DATABASE_URL', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL'];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  return {
    status: missingVars.length === 0 ? 'ok' : 'error',
    missingVars,
  };
}

async function generateReport() {
  await log('\n=== API Health Check Report ===\n', 'info');

  // Check Environment
  await log('\nChecking Environment Variables...', 'info');
  const envStatus = await checkEnvironment();
  if (envStatus.status === 'error') {
    await log('Missing Environment Variables:', 'error');
    envStatus.missingVars.forEach(async v => await log(`- ${v}`, 'error'));
  } else {
    await log('All required environment variables are set', 'success');
  }

  // Check Database
  await log('\nChecking Database Connection...', 'info');
  const dbStatus = await checkDatabase();
  await log(`Database Status: ${dbStatus.status}`, dbStatus.status === 'ok' ? 'success' : 'error');

  // Check Authentication
  await log('\nChecking Authentication Service...', 'info');
  const authStatus = await checkAuth();
  await log(`Auth Status: ${authStatus.status}`, authStatus.status === 'ok' ? 'success' : 'error');

  // Test All Endpoints
  await log('\nTesting API Endpoints...', 'info');
  for (const [category, endpoints] of Object.entries(config.endpoints)) {
    await log(`\n${category.toUpperCase()} APIs:`, 'info');
    for (const endpoint of endpoints) {
      const result = await testEndpoint(endpoint);
      const statusColor = result.status === 200 ? 'success' : 'error';
      await log(`${endpoint}:`, 'info');
      await log(`  Status: ${result.status}`, statusColor);
      await log(`  Response Time: ${result.responseTime}`, 'info');
      if (result.error) {
        await log(`  Error: ${result.error}`, 'error');
      }
    }
  }

  // Summary
  await log('\n=== Summary ===', 'info');
  await log(
    '1. Environment Variables: ' + (envStatus.status === 'ok' ? 'OK' : 'Needs Fix'),
    envStatus.status === 'ok' ? 'success' : 'error'
  );
  await log(
    '2. Database Connection: ' + (dbStatus.status === 'ok' ? 'OK' : 'Needs Fix'),
    dbStatus.status === 'ok' ? 'success' : 'error'
  );
  await log(
    '3. Authentication: ' + (authStatus.status === 'ok' ? 'OK' : 'Needs Fix'),
    authStatus.status === 'ok' ? 'success' : 'error'
  );

  // Recommendations
  await log('\n=== Recommendations ===', 'info');
  if (envStatus.status === 'error') {
    await log('1. Add missing environment variables to .env file', 'warning');
  }
  if (dbStatus.status !== 'ok') {
    await log('2. Check database connection string and credentials', 'warning');
  }
  if (authStatus.status !== 'ok') {
    await log('3. Verify authentication service configuration', 'warning');
  }
}

// Run the health check
generateReport().catch(error => {
  console.error('Error running health check:', error);
  process.exit(1);
});
