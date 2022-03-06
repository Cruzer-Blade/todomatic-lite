import React from 'react';
import { TodoItem } from '../../types';
import './TodoListItem.css';

interface TodoListItemProps {
  todoItem: TodoItem;
  onEdit: () => void;
  onDelete: () => void;
  ontoggleCompletion: () => void;
}

function TodoListItem({ todoItem, onDelete, onEdit, ontoggleCompletion }: TodoListItemProps) {
  return (
    <li className="todo-list-item">
      <div className="todo-list-item-primary-content">
        <input
          id={`todo-list-item-${todoItem.id}`}
          type="checkbox"
          checked={todoItem.completed}
          onChange={ontoggleCompletion}
        />

        <label htmlFor={`todo-list-item-${todoItem.id}`}>
          { todoItem.task }
        </label>
      </div>

      <div className="todo-list-item-actions-group">
        <button
          className="styled-button"
          type="button"
          data-testid="todo-list-item-edit-button"
          onClick={onEdit}
        >
          Edit Task
        </button>

        <button
          className="styled-button"
          type="button"
          data-testid="todo-list-item-delete-button"
          onClick={onDelete}
        >
          Delete Task
        </button>
      </div>
    </li>
  )
}

export default TodoListItem;
