import React, { useState } from 'react';

interface AddTodoBoxProps {
  onAddTodo: (task: string) => void;
}

function AddTodoBox({ onAddTodo }: AddTodoBoxProps) {
  const [todoText, setTodoText] = useState('');

  const onAddTodoWrapperCb = () => {
    // Call the add todo callback
    onAddTodo(todoText);

    // Reset input
    setTodoText('');
  }

  return (
    <div className="add-todo-box-root">
      <input
        type="text"
        data-testid="add-todo-box-input"
        placeholder="What do you plan to get done..."
        onChange={(e) => setTodoText(e.target.value)}
        value={todoText}
      />

      <button
        type="submit"
        data-testid="add-todo-box-button"
        disabled={todoText.length === 0}
        onClick={onAddTodoWrapperCb}
      >
        Add Todo
      </button>
    </div>
  )
}

export default AddTodoBox;
