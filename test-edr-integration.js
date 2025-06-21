const http = require('http');

const testUrls = [
  'http://localhost:3000/edr',
  'http://localhost:3000/roadmap-agent',
  'http://localhost:3000/api/edr/reports',
];

async function testUrl(url) {
  return new Promise(resolve => {
    const req = http.get(url, res => {
      console.log(`✅ ${url} - Status: ${res.statusCode}`);
      resolve({ url, status: res.statusCode, success: res.statusCode < 400 });
    });

    req.on('error', err => {
      console.log(`❌ ${url} - Error: ${err.message}`);
      resolve({ url, status: 'ERROR', success: false });
    });

    req.setTimeout(5000, () => {
      console.log(`⏰ ${url} - Timeout`);
      resolve({ url, status: 'TIMEOUT', success: false });
    });
  });
}

async function runTests() {
  console.log('🧪 Testing EDR Integration...\n');

  const results = [];
  for (const url of testUrls) {
    const result = await testUrl(url);
    results.push(result);
  }

  console.log('\n📊 Test Results:');
  const successful = results.filter(r => r.success).length;
  const total = results.length;

  console.log(`Success: ${successful}/${total}`);

  if (successful === total) {
    console.log('🎉 All tests passed! EDR integration is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Check the server logs for details.');
  }
}

// Wait a bit for the server to start, then run tests
setTimeout(runTests, 3000);
