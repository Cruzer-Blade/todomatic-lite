import React from 'react';
import { FilterOption, TodoItem } from '../../types';
import TodoListItem from '../TodoListItem/TodoListItem';

interface TodoListProps {
  todoList: TodoItem[];
  filter: FilterOption;
  onEdit: (id: TodoItem['id'], updatedTodo: Omit<TodoItem, 'id'>) => void;
  onDelete: (id: TodoItem['id']) => void;
  onToggleCompletion: (id: TodoItem['id']) => void;
}

function TodoList({ todoList, filter, onEdit, onDelete, onToggleCompletion }: TodoListProps) {
  const filteredTodoList = getFilteredList(todoList, filter);

  if (todoList.length === 0) {
    return (
      <div data-testid="todo-list-empty">
        Nothing to show for now...
      </div>
    )
  }

  return (
    <ul>
      {filteredTodoList.map((todoItem) => (
        <TodoListItem
          key={todoItem.id}
          todoItem={todoItem}
          onEdit={() => onEdit(todoItem.id, {
            task: prompt(`Edit item "${todoItem.task}"`, todoItem.task) || '',
            completed: todoItem.completed,
          })}
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
