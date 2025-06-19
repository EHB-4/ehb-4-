import axios from 'axios';
import chalk from 'chalk';

const BASE_URL = 'http://localhost:3000/api';

async function checkDatabaseConnection() {
  try {
    // Simple MongoDB connection check
    const response = await axios.get('http://localhost:27017', { timeout: 3000 });
    return true;
  } catch (error) {
    // MongoDB doesn't respond to HTTP, so we'll check if the port is open
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);

      await execAsync('netstat -an | findstr :27017');
      return true;
    } catch (dbError) {
      console.error(chalk.red('❌ Database Connection Error:'), 'MongoDB not accessible');
      return false;
    }
  }
}

async function checkApi(endpoint, method = 'GET') {
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
      data: response.data,
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    let status = 'error';
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

  // Define APIs to check - using actual endpoints
  const apis = ['/test', '/health-check'];

  // Check each API
  console.log(chalk.blue('Checking APIs...\n'));
  const results = await Promise.all(apis.map(api => checkApi(api)));

  // Print Results
  results.forEach(result => {
    const statusColor =
      result.status === 'success' ? 'green' : result.status === 'warning' ? 'yellow' : 'red';
    const statusIcon =
      result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';

    console.log(chalk[statusColor](`${statusIcon} ${result.method} ${result.endpoint}`));
    console.log(`   Response Time: ${result.responseTime}ms`);
    console.log(`   Status: ${result.message}`);
    if (result.data) {
      console.log(`   Data: ${JSON.stringify(result.data)}`);
    }
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

  console.log(chalk.blue('\n🎯 Next Steps:'));
  console.log(chalk.cyan('1. Open http://localhost:3000 in your browser'));
  console.log(chalk.cyan('2. Check the development server logs'));
  console.log(chalk.cyan('3. Run npm run mongo-fast to test database'));
  console.log(chalk.cyan('4. Start building your application!'));
}

runHealthCheck().catch(console.error);
