# PowerShell script to set CUDA 12.2 environment variables and check TensorFlow GPU
$env:CUDA_PATH="C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.2"
$env:PATH="C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.2\bin;C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v12.2\libnvvp;" + $env:PATH
Write-Host "[INFO] CUDA 12.2 environment set for this session."
Write-Host "[INFO] Checking TensorFlow GPU availability..."
python -c "import tensorflow as tf; print('TensorFlow version:', tf.__version__); print('GPUs:', tf.config.list_physical_devices('GPU'))" 