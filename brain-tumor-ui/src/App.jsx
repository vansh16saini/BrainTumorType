import { useState } from "react";
import Upload from "./Components/Upload";
import Result from "./Components/Result";

const App = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="app-container">
      <h1>Brain Tumor Detection</h1>
      <Upload setResult={setResult} />
      <Result result={result} />
    </div>
  );
};

export default App;