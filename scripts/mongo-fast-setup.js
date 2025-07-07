#!/usr/bin/env node

/**
 * EHB MongoDB Fast Setup Script
 * Quick MongoDB connection test and setup
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 EHB MongoDB Fast Setup');
console.log('========================');

// Check if MongoDB is available
function checkMongoDB() {
  return new Promise(resolve => {
    exec('mongod --version', (error, stdout, stderr) => {
      if (error) {
        console.log('⚠️  MongoDB not found locally');
        resolve(false);
      } else {
        console.log('✅ MongoDB found:', stdout.split('\n')[0]);
        resolve(true);
      }
    });
  });
}

// Check Docker MongoDB
function checkDockerMongo() {
  return new Promise(resolve => {
    exec(
      'docker ps --filter "name=mongo" --format "table {{.Names}}\t{{.Status}}"',
      (error, stdout, stderr) => {
        if (error || !stdout.includes('mongo')) {
          console.log('⚠️  Docker MongoDB not running');
          resolve(false);
        } else {
          console.log('✅ Docker MongoDB running');
          resolve(true);
        }
      }
    );
  });
}

// Test database connection
function testConnection() {
  return new Promise(resolve => {
    // Try to connect to MongoDB
    const testScript = `
      const { MongoClient } = require('mongodb');
      const client = new MongoClient('mongodb://localhost:27017');
      
      client.connect()
        .then(() => {
          console.log('✅ MongoDB connection successful');
          client.close();
          process.exit(0);
        })
        .catch(err => {
          console.log('❌ MongoDB connection failed:', err.message);
          process.exit(1);
        });
    `;

    fs.writeFileSync(path.join(__dirname, 'temp-mongo-test.js'), testScript);

    exec('node temp-mongo-test.js', (error, stdout, stderr) => {
      fs.unlinkSync(path.join(__dirname, 'temp-mongo-test.js'));
      if (error) {
        console.log('❌ MongoDB connection test failed');
        resolve(false);
      } else {
        console.log(stdout);
        resolve(true);
      }
    });
  });
}

// Main execution
async function main() {
  try {
    console.log('1️⃣ Checking MongoDB installation...');
    const mongoInstalled = await checkMongoDB();

    console.log('2️⃣ Checking Docker MongoDB...');
    const dockerMongo = await checkDockerMongo();

    console.log('3️⃣ Testing connection...');
    const connectionOk = await testConnection();

    if (connectionOk) {
      console.log('\n🎉 MongoDB Fast Setup: SUCCESS');
      console.log('==============================');
      console.log('✅ MongoDB is ready for use');
      console.log('🚀 You can now run your EHB application');
    } else {
      console.log('\n⚠️  MongoDB Fast Setup: PARTIAL');
      console.log('===============================');
      console.log('⚠️  MongoDB connection needs attention');
      console.log('💡 Try: docker-compose up -d (if using Docker)');
      console.log('💡 Or install MongoDB locally');
    }
  } catch (error) {
    console.log('❌ MongoDB Fast Setup: FAILED');
    console.log('=============================');
    console.log('Error:', error.message);
  }
}

main();
