#!/usr/bin/env node
// ehb-ml-gpu-setup.js
// AI/ML GPU Environment Auto-Setup & Guide (Windows, Urdu/Hindi)

const { execSync, exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const LOG_FILE = 'ml-gpu-setup-log.txt';
function log(msg) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toLocaleString()}] ${msg}\n`);
}
function print(msg) {
  console.log(msg);
  log(msg);
}

function openURL(url) {
  if (os.platform() === 'win32') {
    exec(`start "" "${url}"`);
    print(`(Browser me open kiya: ${url})`);
  } else {
    print(`URL: ${url}`);
  }
}

// 1. NVIDIA GPU Check
function checkNvidiaGPU() {
  print('\n[1] NVIDIA GPU Check:');
  try {
    const out = execSync('wmic path win32_VideoController get name', { encoding: 'utf-8' });
    if (/NVIDIA/i.test(out)) {
      print('✅ NVIDIA GPU system me maujood hai.');
      return true;
    } else {
      print('❌ NVIDIA GPU nahi mili. AI/ML GPU acceleration possible nahi.');
      return false;
    }
  } catch (e) {
    print('⚠️  GPU check nahi ho saka. Manual check karein.');
    return false;
  }
}

// 2. CUDA Toolkit Check
function checkCudaToolkit() {
  print('\n[2] CUDA Toolkit Check:');
  const cudaPath = 'C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA';
  if (fs.existsSync(cudaPath)) {
    print('✅ CUDA Toolkit installed hai.');
    return true;
  } else {
    print('⚠️  CUDA Toolkit installed nahi mila.');
    print('Step: CUDA Toolkit install karein (TensorFlow/PyTorch compatible version).');
    openURL('https://developer.nvidia.com/cuda-toolkit-archive');
    print(
      'TensorFlow/PyTorch version ke hisaab se sahi CUDA version download karein, phir install karein.'
    );
    print('Install ke baad system restart zaroor karein.');
    return false;
  }
}

// 3. cuDNN Check
function checkCuDNN() {
  print('\n[3] cuDNN DLLs Check:');
  const cudaBin = 'C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA';
  let found = false;
  if (fs.existsSync(cudaBin)) {
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
    print('⚠️  cuDNN DLLs nahi mili. AI/ML GPU ke liye zaroori hai.');
    print('Step: cuDNN download karein (NVIDIA account required).');
    openURL('https://developer.nvidia.com/cudnn');
    print('Apne CUDA version ke hisaab se cuDNN download karein.');
    print(
      'cuDNN zip ko extract karein, uske bin/include/lib files ko CUDA install folder me copy karein (e.g., C:\\Program Files\\NVIDIA GPU Computing Toolkit\\CUDA\\v11.x\\).'
    );
    print('Install ke baad system restart zaroor karein.');
  }
}

// 4. Python Check
function checkPython() {
  print('\n[4] Python Check:');
  try {
    const out = execSync('python --version', { encoding: 'utf-8' });
    const match = out.match(/(\d+)\.(\d+)\.(\d+)/);
    if (match && parseInt(match[1], 10) === 3 && parseInt(match[2], 10) >= 8) {
      print(`✅ Python version ${out.trim()} installed hai.`);
      return true;
    } else {
      print(`⚠️  Python version ${out.trim()} hai. Python 3.8 ya us se upar install karein.`);
      openURL('https://www.python.org/downloads/windows/');
      return false;
    }
  } catch (e) {
    print('⚠️  Python installed nahi mila. Python 3.8+ install karein.');
    openURL('https://www.python.org/downloads/windows/');
    return false;
  }
}

// 5. pip Check
function checkPip() {
  print('\n[5] pip Check:');
  try {
    const out = execSync('pip --version', { encoding: 'utf-8' });
    print('✅ pip installed hai.');
    return true;
  } catch (e) {
    print(
      '⚠️  pip installed nahi mila. Python install karte waqt "Add to PATH" select karein ya pip manually install karein.'
    );
    return false;
  }
}

// 6. TensorFlow Check
function checkTensorFlow() {
  print('\n[6] TensorFlow Check:');
  try {
    const out = execSync('pip show tensorflow', { encoding: 'utf-8' });
    if (/tensorflow/i.test(out)) {
      print('✅ TensorFlow installed hai.');
      return true;
    }
    print('⚠️  TensorFlow installed nahi mila.');
    print('Step: pip install tensorflow');
    return false;
  } catch (e) {
    print('⚠️  TensorFlow installed nahi mila.');
    print('Step: pip install tensorflow');
    return false;
  }
}

// 7. PyTorch Check
function checkPyTorch() {
  print('\n[7] PyTorch Check:');
  try {
    const out = execSync('pip show torch', { encoding: 'utf-8' });
    if (/torch/i.test(out)) {
      print('✅ PyTorch installed hai.');
      return true;
    }
    print('⚠️  PyTorch installed nahi mila.');
    print('Step: pip install torch torchvision torchaudio');
    return false;
  } catch (e) {
    print('⚠️  PyTorch installed nahi mila.');
    print('Step: pip install torch torchvision torchaudio');
    return false;
  }
}

// 8. Env Vars Check
function checkEnvVars() {
  print('\n[8] Environment Variables Check:');
  const envVars = ['CUDA_PATH', 'PATH'];
  let allSet = true;
  envVars.forEach(v => {
    if (!process.env[v]) {
      print(
        `⚠️  ${v} set nahi hai. CUDA install ke baad yeh auto set ho jata hai, warna manually set karein.`
      );
      allSet = false;
    }
  });
  if (allSet) print('✅ Environment variables sahi set hain.');
}

// 9. TensorFlow GPU Test
function testTensorFlowGPU() {
  print('\n[9] TensorFlow GPU Test:');
  const testScript = `import tensorflow as tf\nprint(tf.config.list_physical_devices('GPU'))`;
  fs.writeFileSync('tf_gpu_test.py', testScript);
  try {
    const out = execSync('python tf_gpu_test.py', { encoding: 'utf-8' });
    print('TensorFlow GPU Devices:');
    print(out.trim());
    if (/GPU/.test(out) && !/\[\]/.test(out)) {
      print('✅ TensorFlow GPU par run ho raha hai!');
    } else {
      print('⚠️  TensorFlow GPU detect nahi kar raha. Setup check karein.');
    }
  } catch (e) {
    print('⚠️  TensorFlow GPU test run nahi ho saka.');
  }
  fs.unlinkSync('tf_gpu_test.py');
}

// 10. PyTorch GPU Test
function testPyTorchGPU() {
  print('\n[10] PyTorch GPU Test:');
  const testScript = `import torch\nprint(torch.cuda.is_available())`;
  fs.writeFileSync('torch_gpu_test.py', testScript);
  try {
    const out = execSync('python torch_gpu_test.py', { encoding: 'utf-8' });
    print('PyTorch CUDA Available:');
    print(out.trim());
    if (/True/.test(out)) {
      print('✅ PyTorch GPU par run ho raha hai!');
    } else {
      print('⚠️  PyTorch GPU detect nahi kar raha. Setup check karein.');
    }
  } catch (e) {
    print('⚠️  PyTorch GPU test run nahi ho saka.');
  }
  fs.unlinkSync('torch_gpu_test.py');
}

// Main
fs.writeFileSync(LOG_FILE, 'EHB ML/AI GPU Setup Log\n================\n');
print('EHB AI/ML GPU Auto-Setup & Guide (Windows)\n');
const gpu = checkNvidiaGPU();
const cuda = checkCudaToolkit();
if (gpu && cuda) checkCuDNN();
const py = checkPython();
const pipOk = checkPip();
let tf = false,
  torch = false;
if (py && pipOk) {
  tf = checkTensorFlow();
  torch = checkPyTorch();
}
checkEnvVars();
if (tf) testTensorFlowGPU();
if (torch) testPyTorchGPU();
print(
  '\nAgar koi ⚠️ warning hai, us par amal karein. Har install ke baad system restart karna na bhoolen.\nTafseeli report ml-gpu-setup-log.txt me hai.'
);
