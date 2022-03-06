import React from 'react';
import { FilterOption, TodoItem } from '../../types';
import TodoListItem from '../TodoListItem/TodoListItem';
import './TodoList.css';

interface TodoListProps {
  todoList: TodoItem[];
  filter: FilterOption;
  onEdit: (id: TodoItem['id'], updatedName: string) => void;
  onDelete: (id: TodoItem['id']) => void;
  onToggleCompletion: (id: TodoItem['id']) => void;
}

function TodoList({ todoList, filter, onEdit, onDelete, onToggleCompletion }: TodoListProps) {
  const filteredTodoList = getFilteredList(todoList, filter);

  if (filteredTodoList.length === 0) {
    return (
      <div data-testid="todo-list-empty">
        Nothing to show for now...
      </div>
    )
  }

  return (
    <ul className="todo-list-root">
      {filteredTodoList.map((todoItem) => (
        <TodoListItem
          key={todoItem.id}
          todoItem={todoItem}
          onEdit={() => onEdit(
            todoItem.id,
            prompt(`Edit item "${todoItem.task}"`, todoItem.task) || todoItem.task,
          )}
          onDelete={() => onDelete(todoItem.id)}
          ontoggleCompletion={() => onToggleCompletion(todoItem.id)}
        />
      ))}
    </ul>
  )
}

function getFilteredList(
  todoList: TodoListProps['todoList'],
  filter: TodoListProps['filter']
) {
  switch (filter) {
    case FilterOption.pending:
      return todoList.filter((todoItem) => !todoItem.completed);

    case FilterOption.completed:
      return todoList.filter((todoItem) => todoItem.completed);

    default:
      return todoList;
  }
}

export default TodoList;
