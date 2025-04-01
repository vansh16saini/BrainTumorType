import tensorflow as tf
print("Num GPUs Available:", len(tf.config.list_physical_devices('GPU')))

print(tf.sysconfig.get_build_info()["cuda_version"])
print(tf.sysconfig.get_build_info()["cudnn_version"])
