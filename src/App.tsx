import React from 'react';
import AddTodoBox from './components/AddTodoBox/AddTodoBox';
import './App.css';

function App() {
  return (
    <div className="app-root">
      <AddTodoBox onAddTodo={() => {}} />
    </div>
  )
}

export default App;
