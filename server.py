from fastapi import FastAPI, UploadFile, File
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from io import BytesIO
from PIL import Image

app = FastAPI()

# Load your trained model
model = tf.keras.models.load_model("brain_tumor_resnet50.h5")  # Change to your actual model filename

# Class labels (modify based on your dataset)
class_labels = ["Glioma", "Meningioma", "No Tumor", "Pituitary"]

def preprocess_image(file):
    img = Image.open(BytesIO(file))
    img = img.resize((128,128))  # Resize to match model input size
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize
    return img_array

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    img_array = preprocess_image(await file.read())
    predictions = model.predict(img_array)
    class_idx = np.argmax(predictions, axis=1)[0]
    result = {"class": class_labels[class_idx], "confidence": float(np.max(predictions))}
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace '*' with frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print(model.input_shape)  # This should print (None, 128, 128, 3)
