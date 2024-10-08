import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

function App() {
  const [numInputs, setNumInputs] = useState(0);
  const [values, setValues] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  const handleNumInputsChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumInputs(count);
    setValues(Array(count).fill(0));
    setInputValues(Array(count).fill(''));
  };

  const handleInputChange = (index, e) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  const handleAddValue = (index) => {
    const additionalValue = parseInt(inputValues[index], 10);
    if (!isNaN(additionalValue) && additionalValue >= 0) {
      const newValues = [...values];
      newValues[index] += additionalValue;
      setValues(newValues);
    }
  };

  const data = values.map((value, index) => ({ name: `Value ${index + 1}`, value }));

  return (
    <div className="App">
      <h1>Dynamic Bar Chart Generator</h1>
      <div>
        <label>Enter number of inputs: </label>
        <input type="number" min="0" onChange={handleNumInputsChange} />
      </div>
      <div className="input-container">
        {Array.from({ length: numInputs }).map((_, index) => (
          <div key={index} className="input-group">
            <input
              type="number"
              value={inputValues[index] || ''}
              onChange={(e) => handleInputChange(index, e)}
            />
            <button onClick={() => handleAddValue(index)}>+</button>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} barSize={30} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10000]} />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <div className="image-container">
          <img
            src="your-image-url.jpg"
            alt="Background"
            className="chart-background-image"
            style={{ width: `${numInputs * 100}px` }}
          />
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;