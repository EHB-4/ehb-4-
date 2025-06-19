#!/usr/bin/env node
// ehb-cuda-cudnn-auto-guide.js
// CUDA, cuDNN, NVIDIA Driver Auto-Detect & Guide (Windows, Urdu/Hindi)

const { execSync, exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const LOG_FILE = 'cuda-cudnn-auto-guide-log.txt';
function log(msg) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toLocaleString()}] ${msg}\n`);
}
function print(msg) {
  console.log(msg);
  log(msg);
}

// Helper: Browser me URL open karo (Windows)
function openURL(url) {
  if (os.platform() === 'win32') {
    exec(`start "" "${url}"`);
    print(`(Browser me open kiya: ${url})`);
  } else {
    print(`URL: ${url}`);
  }
}

// 1. NVIDIA GPU Driver Check
function checkNvidiaDriver() {
  print('\n[1] NVIDIA GPU Driver Check:');
  try {
    const out = execSync('wmic path win32_VideoController get name', { encoding: 'utf-8' });
    if (/NVIDIA/i.test(out)) {
      print('✅ NVIDIA GPU driver installed hai.');
      return true;
    } else {
      print('⚠️  NVIDIA GPU driver installed nahi mila.');
      print('Step 1: NVIDIA GPU driver install karein.');
      openURL('https://www.nvidia.com/Download/index.aspx');
      print(
        'NVIDIA site se apne GPU model ke hisaab se driver download karein, phir install karein.'
      );
      print('Install ke baad system restart zaroor karein.');
      return false;
    }
  } catch (e) {
    print('⚠️  GPU driver check nahi ho saka. Manual check karein.');
    return false;
  }
}

// 2. CUDA Toolkit Check
function checkCudaToolkit() {
  print('\n[2] CUDA Toolkit Check:');
  // Common install path
  const cudaPath = 'C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA';
  if (fs.existsSync(cudaPath)) {
    print('✅ CUDA Toolkit installed hai.');
    return true;
  } else {
    print('⚠️  CUDA Toolkit installed nahi mila.');
    print('Step 2: CUDA Toolkit install karein (TensorFlow compatible version).');
    openURL('https://developer.nvidia.com/cuda-toolkit-archive');
    print(
      'TensorFlow version ke hisaab se sahi CUDA version download karein, phir install karein.'
    );
    print('Install ke baad system restart zaroor karein.');
    return false;
  }
}

// 3. cuDNN Check
function checkCuDNN() {
  print('\n[3] cuDNN DLLs Check:');
  // DLLs TensorFlow GPU ke liye
  const cudaBin = 'C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA';
  let found = false;
  if (fs.existsSync(cudaBin)) {
    // Check all CUDA versions
    const versions = fs.readdirSync(cudaBin);
    for (const v of versions) {
      const binPath = path.join(cudaBin, v, 'bin');
      if (fs.existsSync(binPath)) {
        const files = fs.readdirSync(binPath);
        if (files.some(f => /^cudnn.*\.dll$/i.test(f))) {
          print(`✅ cuDNN DLLs mil gayi (CUDA version: ${v}).`);
          found = true;
        }
      }
    }
  }
  if (!found) {
    print('⚠️  cuDNN DLLs nahi mili. TensorFlow GPU ke liye zaroori hai.');
    print('Step 3: cuDNN download karein (NVIDIA account required).');
    openURL('https://developer.nvidia.com/cudnn');
    print('Apne CUDA version ke hisaab se cuDNN download karein.');
    print(
      'cuDNN zip ko extract karein, uske bin/include/lib files ko CUDA install folder me copy karein (e.g., C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.x\\).'
    );
    print('Install ke baad system restart zaroor karein.');
  }
}

// Main
fs.writeFileSync(LOG_FILE, 'EHB CUDA/cuDNN/NVIDIA Auto-Guide Log\n================\n');
print('EHB CUDA, cuDNN, NVIDIA Driver Auto-Detect & Guide (Windows)\n');
const driver = checkNvidiaDriver();
const cuda = checkCudaToolkit();
if (driver && cuda) {
  checkCuDNN();
}
print(
  '\nAgar koi ⚠️ warning hai, us par amal karein. Har install ke baad system restart karna na bhoolen.\nTafseeli report cuda-cudnn-auto-guide-log.txt me hai.'
);
