Write-Host "`n🛠️ Checking Developer Environment..."

# Python & PIP
Write-Host "`n🔹 Python '&' PIP"
python --version
pip --version

# TensorFlow GPU
Write-Host "`n🔹 TensorFlow GPU Check"
python -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"

# NumPy
Write-Host "`n🔹 NumPy Version"
python -c "import numpy; print(numpy.__version__)"

# CUDA
Write-Host "`n🔹 CUDA Compiler"
nvcc --version

# Git & GitHub
Write-Host "`n🔹 Git '&' GitHub CLI"
git --version
gh --version

# Node.js & npm
Write-Host "`n🔹 Node.js '&' npm"
node -v
npm -v

# MongoDB
Write-Host "`n🔹 MongoDB Server '&' Shell"
mongod --version
mongosh --version

# Docker
Write-Host "`n🔹 Docker Info"
docker --version
docker info | Select-String "Server Version|Operating System|Architecture|CPUs|Total Memory"

# CMake
Write-Host "`n🔹 CMake"
cmake --version

# Flutter & Dart
Write-Host "`n🔹 Flutter '&' Dart"
flutter --version
dart --version

# .NET SDK
Write-Host "`n🔹 .NET SDK"
dotnet --version

# MSVC Compiler
Write-Host "`n🔹 MSVC Compiler (cl.exe)"
cl

# CUDA PATH & System PATH
Write-Host "`n🔹 CUDA Path"
echo $env:CUDA_PATH

Write-Host "`n🔹 System PATH (short view)"
$env:Path -split ";" | Select-String "CUDA|Python|Git|node|mongosh|docker|cl|flutter|cmake" | Sort-Object -Unique 