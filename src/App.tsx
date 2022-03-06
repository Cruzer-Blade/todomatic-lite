import React, { useState } from 'react';
import { FilterOption, TodoItem } from './types';
import AddTodoBox from './components/AddTodoBox/AddTodoBox';
import FilterTabGroup from './components/FilterTabGroup/FilterTabGroup';
import TodoList from './components/TodoList/TodoList';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterOption>(FilterOption.all);

  const addTodo = (task: string) => {
    setTodoList([...todoList, {
        id: Date.now().toString(),
        task,
        completed: false,
    }]);
  }

  const editTodo = (
    id: string,
    updatedTodoCallback: (todoItem: TodoItem) => Omit<TodoItem, "id">
  ) => {
    const updatedTodoList = todoList.map((todoItem) => {
      if (todoItem.id === id) {
        return {
          ...todoItem,
          ...updatedTodoCallback(todoItem),
        };
      }

      return todoItem;
    });

    setTodoList(updatedTodoList);
  }

  const onDelete = (id: string) => {
    const updatedTodoList = todoList.filter((todoItem) => todoItem.id !== id);
    setTodoList(updatedTodoList);
  }

  const onTaskNameEdit = (id: string, newName: string) => {
    editTodo(id, (todoItem) => ({
      task: newName,
      completed: todoItem.completed,
    }));
  }

  const onToggleCompletion = (id: string) => {
    editTodo(id, (todoItem) => ({
      task: todoItem.task,
      completed: !todoItem.completed,
    }));
  }

  return (
    <div className="app-root">
      <AddTodoBox onAddTodo={(task) => addTodo(task)} />

      <FilterTabGroup
        currentFilter={filter}
        onFilterChange={setFilter}
      />

      <TodoList
        todoList={todoList}
        filter={filter}
        onDelete={onDelete}
        onEdit={onTaskNameEdit}
        onToggleCompletion={onToggleCompletion}
      />
    </div>
  )
}

export default App;
