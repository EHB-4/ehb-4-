import axios from 'axios';
import chalk from 'chalk';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const BASE_URL = 'http://localhost:3001/api';

interface ApiCheck {
  endpoint: string;
  method: string;
  status: 'success' | 'error' | 'warning';
  responseTime: number;
  message: string;
  fix?: string;
}

async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    return true;
  } catch (error) {
    console.error(chalk.red('❌ Database Connection Error:'), error);
    return false;
  }
}

async function checkApi(endpoint: string, method: string = 'GET'): Promise<ApiCheck> {
  const startTime = Date.now();
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      timeout: 5000,
    });
    const responseTime = Date.now() - startTime;
    
    return {
      endpoint,
      method,
      status: 'success',
      responseTime,
      message: 'API is working correctly',
    };
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    let status: 'error' | 'warning' = 'error';
    let message = 'API check failed';
    let fix = '';

    if (error.response) {
      if (error.response.status === 401) {
        status = 'warning';
        message = 'Authentication required';
        fix = 'Add authentication token to request';
      } else if (error.response.status === 404) {
        message = 'Endpoint not found';
        fix = 'Check if endpoint URL is correct';
      } else {
        message = `Server error: ${error.response.status}`;
        fix = 'Check server logs for details';
      }
    } else if (error.request) {
      message = 'No response received';
      fix = 'Check if server is running';
    } else {
      message = 'Request failed';
      fix = 'Check network connection';
    }

    return {
      endpoint,
      method,
      status,
      responseTime,
      message,
      fix,
    };
  }
}

async function runHealthCheck() {
  console.log(chalk.blue('🔍 Starting API Health Check...\n'));

  // Check Database Connection
  console.log(chalk.blue('Checking Database Connection...'));
  const dbConnected = await checkDatabaseConnection();
  if (dbConnected) {
    console.log(chalk.green('✅ Database connection successful\n'));
  } else {
    console.log(chalk.red('❌ Database connection failed\n'));
  }

  // Define APIs to check
  const apis = [
    '/obs/certificate-log',
    '/obs/study-pool',
    '/payments/process',
  ];

  // Check each API
  console.log(chalk.blue('Checking APIs...\n'));
  const results = await Promise.all(apis.map(api => checkApi(api)));

  // Print Results
  results.forEach(result => {
    const statusColor = result.status === 'success' ? 'green' : 
                       result.status === 'warning' ? 'yellow' : 'red';
    const statusIcon = result.status === 'success' ? '✅' : 
                      result.status === 'warning' ? '⚠️' : '❌';

    console.log(chalk[statusColor](`${statusIcon} ${result.method} ${result.endpoint}`));
    console.log(`   Response Time: ${result.responseTime}ms`);
    console.log(`   Status: ${result.message}`);
    if (result.fix) {
      console.log(chalk.blue(`   💡 Fix: ${result.fix}`));
    }
    console.log('');
  });

  // Summary
  const successCount = results.filter(r => r.status === 'success').length;
  const warningCount = results.filter(r => r.status === 'warning').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  console.log(chalk.blue('📊 Summary:'));
  console.log(chalk.green(`✅ ${successCount} APIs working`));
  console.log(chalk.yellow(`⚠️ ${warningCount} APIs need attention`));
  console.log(chalk.red(`❌ ${errorCount} APIs failed`));

  await prisma.$disconnect();
}

runHealthCheck().catch(console.error); 