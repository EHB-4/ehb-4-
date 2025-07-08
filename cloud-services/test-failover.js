const axios = require('axios');
const failoverService = require('./failover-service');

async function testFailover() {
  try {
    console.log('🚀 Testing Cloud Failover System...');

    // Test GET request
    console.log('\n🔄 Testing GET request to /users...');
    const getUsers = await failoverService.executeRequest('/users');
    console.log('✅ Response:', getUsers.data);

    // Test POST request
    console.log('\n🔄 Testing POST request to /users...');
    const newUser = {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
    };
    const postUser = await failoverService.executeRequest('/users', 'POST', newUser);
    console.log('✅ Created user:', postUser.data);

    // Test health check
    console.log('\n🔄 Testing health check...');
    const health = await axios.get('/api/google-health');
    console.log('✅ Google Health:', health.data);

    const awsHealth = await axios.get('/api/aws-health');
    console.log('✅ AWS Health:', awsHealth.data);
  } catch (error) {
    console.error('❌ Test Error:', error);
  }
}

// Run the test
testFailover();
