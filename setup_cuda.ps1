# Set CUDA environment variables
$env:CUDA_PATH = "C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8"
$env:PATH = "C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\bin;C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\libnvvp;" + $env:PATH

# Check CUDA version
Write-Host "Checking CUDA version..."
nvcc --version

# Check TensorFlow GPU
Write-Host "`nChecking TensorFlow GPU..."
python -c "import tensorflow as tf; print('TensorFlow version:', tf.__version__); print('GPUs:', tf.config.list_physical_devices('GPU'))" 