# PowerShell script to set CUDA 11.8 environment variables and check TensorFlow GPU
$env:CUDA_PATH="C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8"
$env:PATH="C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\bin;C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.8\libnvvp;" + $env:PATH
Write-Host "[INFO] CUDA 11.8 environment set for this session."
Write-Host "[INFO] Checking TensorFlow GPU availability..."
python -c "import tensorflow as tf; print('TensorFlow version:', tf.__version__); print('GPUs:', tf.config.list_physical_devices('GPU'))"

# Check if GPU is detected
$gpuDetected = python -c "import tensorflow as tf; print(len(tf.config.list_physical_devices('GPU')) > 0)"
if ($gpuDetected -eq "True") {
    Write-Host "[SUCCESS] GPU detected! TensorFlow is ready to use."
} else {
    Write-Host "[WARNING] GPU not detected. Please check CUDA and cuDNN installation."
    Write-Host "[INFO] Restarting system to apply changes..."
    Restart-Computer -Force
} 