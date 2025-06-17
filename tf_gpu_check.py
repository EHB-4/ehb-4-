import tensorflow as tf

print('TensorFlow version:', tf.__version__)
gpus = tf.config.list_physical_devices('GPU')
print('Num GPUs Available:', len(gpus))
if gpus:
    for gpu in gpus:
        print('GPU:', gpu)
    from tensorflow.python.platform import build_info as tf_build_info
    print('CUDA version:', getattr(tf_build_info, 'cuda_version', 'Unknown'))
    print('cuDNN version:', getattr(tf_build_info, 'cudnn_version', 'Unknown'))
else:
    print('No GPU found. Please check CUDA/cuDNN installation and PATH.') 