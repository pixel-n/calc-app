import React, { useState, useEffect } from 'react';

export default function Todo() {
  // useState: 'todos' holds an array of task objects; 'text' holds what is typed in the input box
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // useEffect (Load): Converts saved JSON text back into a JS array on startup using JSON.parse()
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todos') || '[]'));
  }, []);

  // useEffect (Save): Converts task array to a JSON string on update using JSON.stringify()
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Form Submission Handler: Adds new task to list
  const add = (e) => {
    e.preventDefault(); // Prevents page reload on submit
    if (!text) return; // Ignores empty submissions
    // Spread Operator (...p): Copies existing task array and appends a new item object
    setTodos((p) => [...p, { id: Date.now(), text }]);
    setText(''); // Resets input text box back to empty
  };

  return (
    <div className="card">
      <h2 className="title">Task Manager</h2>

      {/* onSubmit: Event listener that triggers the add function when submitting the form */}
      <form onSubmit={add} className="todo-form">
        {/* onChange: Controlled input that updates 'text' state as the user types */}
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="New task..." 
          className="todo-input" 
        />
        <button className="todo-add">Add</button>
      </form>

      {/* .map(): Array method that converts each task object in state into an HTML element */}
      {todos.map((t) => (
        /* key: Unique ID required by React to track items efficiently */
        <div key={t.id} className="todo-item">
          <span>{t.text}</span>
          {/* Delete Action: Uses .filter() array method to return a new array excluding this task's ID */}
          <button 
            onClick={() => setTodos((p) => p.filter((i) => i.id !== t.id))} 
            className="todo-del"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}