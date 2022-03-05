import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoListItem from './TodoListItem';
import { TodoItem } from '../../types';

const mockTodoItem: TodoItem = {
  id: '1',
  task: 'Task 1',
  completed: false,
}

describe('Test basic component rendering', () => {
  it('should display the provided task name', async () => {
    render(
      <TodoListItem
        todoItem={mockTodoItem}
        onEdit={() => {}}
        onDelete={() => {}}
        ontoggleCompletion={() => {}}
      />
    );

    const taskText = await screen.findByText(mockTodoItem.task);
    expect(taskText).toBeInTheDocument();
  });

  it('should render edit button', async () => {
    render(
      <TodoListItem
        todoItem={mockTodoItem}
        onEdit={() => {}}
        onDelete={() => {}}
        ontoggleCompletion={() => {}}
      />
    );

    const editButton = await screen.findByTestId('todo-list-item-edit-button');
    expect(editButton).toBeInTheDocument();
  });

  it('should render delete button', async () => {
    render(
      <TodoListItem
        todoItem={mockTodoItem}
        onEdit={() => {}}
        onDelete={() => {}}
        ontoggleCompletion={() => {}}
      />
    );

    const deleteButton = await screen.findByTestId('todo-list-item-delete-button');
    expect(deleteButton).toBeInTheDocument();
  });

  it('should render unchecked checkbox if task is pending', () => {
    render(
      <TodoListItem
        todoItem={{
          ...mockTodoItem,
          completed: false,
        }}
        onEdit={() => {}}
        onDelete={() => {}}
        ontoggleCompletion={() => {}}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should render checked checkbox if task is completed', () => {
    render(
      <TodoListItem
        todoItem={{
          ...mockTodoItem,
          completed: true,
        }}
        onEdit={() => {}}
        onDelete={() => {}}
        ontoggleCompletion={() => {}}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});

describe('Test user interactions', () => {
  let onEdit: jest.Mock<any, any>;
  let onDelete: jest.Mock<any, any>;
  let ontoggleCompletion: jest.Mock<any, any>;

  beforeEach(() => {
    onEdit = jest.fn();
    onDelete = jest.fn();
    ontoggleCompletion = jest.fn();

    render(
      <TodoListItem
        todoItem={mockTodoItem}
        onDelete={onDelete}
        onEdit={onEdit}
        ontoggleCompletion={ontoggleCompletion}
      />
    );
  });

  it('should trigger edit callback when clicked on edit button', async () => {
    const editButton = await screen.findByTestId('todo-list-item-edit-button');
    userEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('should trigger delete callback when clicked on delete button', async () => {
    const deleteButton = await screen.findByTestId('todo-list-item-delete-button');
    userEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('should be able to toggle task completion on click', async () => {
    const taskTextElement = await screen.findByText(mockTodoItem.task);
    userEvent.click(taskTextElement);

    expect(ontoggleCompletion).toHaveBeenCalledTimes(1);
  });
});
