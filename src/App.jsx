import React, { useState, useEffect } from 'react';
import Calculator from './Calculator';
import Todo from './Todo';

export default function App() {
  // useState: Memory box to store which screen is active ('todo' or 'calculator')
  const [page, setPage] = useState('todo');

  // useEffect (Load): Runs once on startup to grab the last active tab from browser memory
  useEffect(() => {
    setPage(localStorage.getItem('page') || 'todo');
  }, []);

  // useEffect (Save): Runs whenever 'page' changes to save the selected tab into browser memory
  useEffect(() => {
    localStorage.setItem('page', page);
  }, [page]);

  return (
    <div className="app-wrapper">
      {/* Navigation Bar */}
      <div className="nav">
        {/* onClick: Event listener that updates 'page' state to 'todo' when clicked */}
        <button 
          onClick={() => setPage('todo')} 
          className={`nav-btn ${page === 'todo' ? 'nav-active' : ''}`}
        >
          Todo List
        </button>
        {/* onClick: Event listener that updates 'page' state to 'calculator' when clicked */}
        <button 
          onClick={() => setPage('calculator')} 
          className={`nav-btn ${page === 'calculator' ? 'nav-active' : ''}`}
        >
          Calculator
        </button>
      </div>

      {/* Conditional Rendering (Ternary Operator): Shows <Todo/> if page is 'todo', else shows <Calculator/> */}
      {page === 'todo' ? <Todo /> : <Calculator />}
    </div>
  );
}