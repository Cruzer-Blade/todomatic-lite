import React from 'react';
import { render, screen } from '@testing-library/react';
import { FilterOption, TodoItem } from '../../types';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

const mockTodoItems: TodoItem[] = [
  { id: '1', task: 'Task 1', completed: false },
  { id: '2', task: 'Task 2', completed: true },
  { id: '3', task: 'Task 3', completed: true },
  { id: '4', task: 'Task 4', completed: false },
];

let onEdit: jest.Mock<any, any>;
let onDelete: jest.Mock<any, any>;
let onToggleCompletion: jest.Mock<any, any>;

function renderTodoList(todoItems: TodoItem[], filterOption: FilterOption = FilterOption.all) {
  onEdit = jest.fn();
  onDelete = jest.fn();
  onToggleCompletion = jest.fn();

  render(
    <TodoList
      todoList={todoItems}
      filter={filterOption}
      onEdit={onEdit}
      onDelete={onDelete}
      onToggleCompletion={onToggleCompletion}
    />
  );
}

it('should display an empty state when no todos are present', async () => {
  renderTodoList([]);

  const emptyStateElement = await screen.findByTestId('todo-list-empty');
  expect(emptyStateElement).toBeInTheDocument();
});

it('should be able to properly display provided todos', async () => {
  renderTodoList(mockTodoItems);
  const taskNames = mockTodoItems.map((todoItem) => todoItem.task);

  for (const taskName of taskNames) {
    const taskTextElement = await screen.findByText(taskName);
    expect(taskTextElement.textContent).toEqual(taskName);
  }
});

it('should be able to properly filter pending tasks', async () => {
  renderTodoList(mockTodoItems, FilterOption.pending);

  const pendingTasks = mockTodoItems.filter((todoItem) => !todoItem.completed);
  const taskNames = pendingTasks.map((todoItem) => todoItem.task);

  const listItems = screen.getAllByRole('listitem');
  expect(pendingTasks.length).toEqual(listItems.length);

  for (const taskName of taskNames) {
    const taskTextElement = await screen.findByText(taskName);
    expect(taskTextElement.textContent).toEqual(taskName);
  }
});

it('should be able to properly filter completed tasks', async () => {
  renderTodoList(mockTodoItems, FilterOption.completed);

  const completedTasks = mockTodoItems.filter((todoItem) => todoItem.completed);
  const taskNames = completedTasks.map((todoItem) => todoItem.task);

  const listItems = screen.getAllByRole('listitem');
  expect(completedTasks.length).toEqual(listItems.length);

  for (const taskName of taskNames) {
    const taskTextElement = await screen.findByText(taskName);
    expect(taskTextElement.textContent).toEqual(taskName);
  }
});
