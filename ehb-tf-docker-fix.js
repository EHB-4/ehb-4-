#!/usr/bin/env node
// ehb-tf-docker-fix.js
// TensorFlow GPU (cuDNN DLLs) & Docker Desktop Fixer (Windows, Urdu/Hindi)

const { execSync, exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const LOG_FILE = 'tf-docker-fix-log.txt';
function log(msg) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toLocaleString()}] ${msg}\n`);
}
function print(msg) {
  console.log(msg);
  log(msg);
}

// 1. TensorFlow GPU: cuDNN DLLs Check
function checkCuDNN() {
  print('\n[1] TensorFlow GPU (cuDNN DLLs) Check:');
  // Common cuDNN DLLs
  const dlls = ['cudnn64_8.dll', 'cudart64_110.dll', 'cublas64_11.dll'];
  let found = 0;
  const systemPath = process.env.PATH.split(';');
  for (const dir of systemPath) {
    for (const dll of dlls) {
      try {
        if (fs.existsSync(path.join(dir, dll))) {
          found++;
        }
      } catch (e) {}
    }
  }
  if (found === dlls.length) {
    print('✅ saare cuDNN DLLs system me maujood hain. TensorFlow GPU sahi kaam karega.');
  } else {
    print(
      '⚠️  cuDNN DLLs missing hain. TensorFlow GPU kaam nahi karega. Manual install zaroori hai.'
    );
    print('--- Urdu/Hindi Manual Steps ---');
    print('1. NVIDIA GPU driver install karein: https://www.nvidia.com/Download/index.aspx');
    print(
      '2. CUDA Toolkit (TensorFlow compatible version) install karein: https://developer.nvidia.com/cuda-toolkit-archive'
    );
    print('3. cuDNN download karein: https://developer.nvidia.com/cudnn (NVIDIA account required)');
    print(
      '4. cuDNN zip ko extract karein, aur uske bin/include/lib files ko apne CUDA install folder me copy karein (e.g., C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.x\\)'
    );
    print('5. System restart karein.');
    print('6. Phir TensorFlow GPU dobara try karein.');
  }
}

// 2. Docker Desktop Check & Fix
function checkDocker() {
  print('\n[2] Docker Desktop Check:');
  let dockerInstalled = false;
  let dockerPath = '';
  // Common install locations
  const possiblePaths = [
    'C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe',
    'C:\\Program Files (x86)\\Docker\\Docker\\Docker Desktop.exe',
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      dockerInstalled = true;
      dockerPath = p;
      break;
    }
  }
  if (dockerInstalled) {
    print('✅ Docker Desktop installed hai.');
    // Check if Docker service is running
    exec('docker info', (err, stdout, stderr) => {
      if (err || /error/i.test(stderr)) {
        print('⚠️  Docker service chal nahi rahi. Start karne ki koshish kar rahe hain...');
        // Try to start Docker Desktop
        exec(`start "" "${dockerPath}"`, e2 => {
          if (e2) {
            print('❌ Docker Desktop start nahi ho saka. Khud manually start karein.');
          } else {
            print('✅ Docker Desktop start kar diya. Thodi dair baad dobara try karein.');
          }
        });
      } else {
        print('✅ Docker service chal rahi hai.');
      }
    });
  } else {
    print('⚠️  Docker Desktop installed nahi hai. Install karne ke liye:');
    print('1. Download karein: https://www.docker.com/products/docker-desktop/');
    print('2. Installer run karein, instructions follow karein.');
    print('3. Install ke baad PC restart karein.');
  }
}

// Main
fs.writeFileSync(LOG_FILE, 'EHB TensorFlow GPU & Docker Fix Log\n================\n');
print('EHB TensorFlow GPU (cuDNN) & Docker Desktop Fix Tool (Windows)\n');
checkCuDNN();
checkDocker();
