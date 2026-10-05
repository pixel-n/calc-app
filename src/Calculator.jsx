import React, { useState, useEffect } from 'react';

export default function Calculator() {
  // useState: Stores the string of numbers and math operations shown on the screen
  const [val, setVal] = useState('');

  // useEffect (Load): Runs once on startup to load the last typed equation from memory
  useEffect(() => {
    setVal(localStorage.getItem('calc') || '');
  }, []);

  // useEffect (Save): Runs whenever 'val' changes to keep browser storage in sync
  useEffect(() => {
    localStorage.setItem('calc', val);
  }, [val]);

  // Math Evaluator Function: Runs the string as JS code using new Function() and handles bad syntax
  const calc = () => {
    try {
      setVal(String(new Function(`return ${val}`)()));
    } catch {
      setVal('Error'); // Fallback string if equation is invalid (e.g., "5++2")
    }
  };

  return (
    <div className="card">
      <h2 className="title">Calculator</h2>

      {/* Screen Display: Renders current 'val' or defaults to '0' if empty */}
      <div className="screen">{val || '0'}</div>

      {/* Calculator Keypad Grid */}
      <div className="calc-grid">
        {/* Clear Button: Resets the 'val' state to an empty string */}
        <button onClick={() => setVal('')} className="btn-c b-clear">Clear</button>
        
        {/* Operator Button: Appends '/' to current state string using functional update setVal(prev => prev + string) */}
        <button onClick={() => setVal((p) => p + '/')} className="btn-c b-op">÷</button>

        {/* Number & Symbol Buttons: Each button appends its character onto the existing string */}
        <button onClick={() => setVal((p) => p + '7')} className="btn-c b-num">7</button>
        <button onClick={() => setVal((p) => p + '8')} className="btn-c b-num">8</button>
        <button onClick={() => setVal((p) => p + '9')} className="btn-c b-num">9</button>
        <button onClick={() => setVal((p) => p + '*')} className="btn-c b-op">×</button>

        <button onClick={() => setVal((p) => p + '4')} className="btn-c b-num">4</button>
        <button onClick={() => setVal((p) => p + '5')} className="btn-c b-num">5</button>
        <button onClick={() => setVal((p) => p + '6')} className="btn-c b-num">6</button>
        <button onClick={() => setVal((p) => p + '-')} className="btn-c b-op">-</button>

        <button onClick={() => setVal((p) => p + '1')} className="btn-c b-num">1</button>
        <button onClick={() => setVal((p) => p + '2')} className="btn-c b-num">2</button>
        <button onClick={() => setVal((p) => p + '3')} className="btn-c b-num">3</button>
        <button onClick={() => setVal((p) => p + '+')} className="btn-c b-op">+</button>

        <button onClick={() => setVal((p) => p + '0')} className="btn-c b-num b-zero">0</button>
        <button onClick={() => setVal((p) => p + '.')} className="btn-c b-num">.</button>
        
        {/* Equals Button: Triggers the calc function to evaluate the math expression */}
        <button onClick={calc} className="btn-c b-eq">=</button>
      </div>
    </div>
  );
}