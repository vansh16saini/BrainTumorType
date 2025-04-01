const Result = ({ result }) => {
    if (!result) return null;
  
    return (
      <div className="result-container">
        <h2>Prediction Result</h2>
        <p><strong>Prediction:</strong> {result.prediction}</p>
        <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
      </div>
    );
  };
  
  export default Result;
  