import os
import sys
import glob
import tensorflow as tf

print('--- ENVIRONMENT VARIABLES ---')
for var in ['CUDA_PATH', 'PATH']:
    print(f'{var}:', os.environ.get(var, 'NOT SET'))

print('\n--- CUDA DLLs in PATH ---')
cuda_bin = os.environ.get('CUDA_PATH', '') + '\\bin'
if os.path.exists(cuda_bin):
    dlls = glob.glob(os.path.join(cuda_bin, '*.dll'))
    print(f'Found {len(dlls)} DLLs in {cuda_bin}')
    for dll in dlls:
        print(' ', os.path.basename(dll))
else:
    print('CUDA bin folder not found:', cuda_bin)

print('\n--- TensorFlow Version & Devices ---')
print('TensorFlow version:', tf.__version__)
try:
    gpus = tf.config.list_physical_devices('GPU')
    print('Num GPUs Available:', len(gpus))
    for gpu in gpus:
        print('GPU:', gpu)
except Exception as e:
    print('Error listing GPUs:', e)

print('\n--- TensorFlow Build Info ---')
try:
    from tensorflow.python.platform import build_info as tf_build_info
    print('CUDA version:', getattr(tf_build_info, 'cuda_version', 'Unknown'))
    print('cuDNN version:', getattr(tf_build_info, 'cudnn_version', 'Unknown'))
except Exception as e:
    print('Error getting build info:', e)

print('\n--- DLL Load Errors (if any) ---')
try:
    tf.constant(1).numpy()
except Exception as e:
    print('TensorFlow DLL load error:', e) 