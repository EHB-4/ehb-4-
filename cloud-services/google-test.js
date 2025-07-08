const { loadCredentials } = require('./credentials-loader');

// Load credentials
const credentials = loadCredentials();
const googleCredentials = credentials.google;

async function testGoogleConnection() {
  try {
    // Test health check endpoint
    const response = await fetch('http://localhost:5000/health');
    const health = await response.json();
    console.log('Google Cloud Service Health:', health);

    // Test API endpoint
    const apiResponse = await fetch('http://localhost:5000/users');
    const users = await apiResponse.json();
    console.log('Google Cloud API Response:', users);

    return true;
  } catch (error) {
    console.error('Google Cloud Connection Error:', error.message);
    return false;
  }
}

// Run the test
testGoogleConnection();
