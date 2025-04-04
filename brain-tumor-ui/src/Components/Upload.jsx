import { useState } from "react";
import axios from "axios";

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const Upload = ({ setResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Invalid file type. Please upload an image.");
      setFile(null);
      setPreview(null);
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File too large. Please upload an image smaller than 5MB.");
      setFile(null);
      setPreview(null);
      return;
    }

    // Validate dimensions
    const img = new Image();
    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
        setError(`Image too large! Max dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}px.`);
        setFile(null);
        setPreview(null);
      } else {
        setError("");
        setFile(selectedFile);
        setPreview(img.src);
      }
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
  
    if (!file) {
      setError("Please select a file.");
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("🔁Full Response:", response);
  
      if (response.data.prediction) {
        setResult(response.data); // ✅ If your backend returns { prediction: [...] }
      } else {
        setError("Unexpected response format. Check server response.");
      }
  
    } catch (err) {
      console.error(" Upload failed:", err.response ? err.response.data : err.message);
      setError("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        {preview && <img src={preview} alt="Preview" className="preview-img" />}
        <button type="submit" disabled={loading || !file}>
          {loading ? "Processing..." : "Upload & Predict"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Upload;
