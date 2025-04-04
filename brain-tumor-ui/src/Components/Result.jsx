const Result = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result-container">
      <h2>Prediction Result</h2>
      <p><strong>Condition:</strong> {result.prediction}</p>
      <p><strong>Confidence:</strong> {result.confidence}%</p>
    </div>
  );
};

export default Result;

