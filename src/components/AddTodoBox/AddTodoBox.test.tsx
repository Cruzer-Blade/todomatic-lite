import React from 'react';
import AddTodoBox from './AddTodoBox';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { queries } from '@testing-library/dom';

let component: RenderResult<typeof queries, HTMLElement>;
let addTodoCallback: jest.Mock<any, any>;

beforeEach(() => {
  addTodoCallback = jest.fn();
  component = render(<AddTodoBox onAddTodo={addTodoCallback} />);
});

it('should render input inside add todo box component', async () => {
  const inputElement = await component.findByTestId('add-todo-box-input');
  expect(inputElement).toBeDefined();
});

it('should be empty initially', async () => {
  const inputElement = await component.findByTestId('add-todo-box-input') as HTMLInputElement;
  expect(inputElement.value).toEqual('');
});

it('should render add todo button', async () => {
  const addTodoButton = await component.findByTestId('add-todo-box-button');
  expect(addTodoButton).toBeDefined();
});

it('should not be able to add a todo when task is empty', async () => {
  const addTodoButton = await component.findByTestId('add-todo-box-button');
  expect(addTodoButton).toHaveAttribute('disabled');
});

it('should be able to add todo when the task is properly typed', async () => {
  const inputElement = await component.findByTestId('add-todo-box-input');
  const addTodoButton = await component.findByTestId('add-todo-box-button');

  userEvent.type(inputElement, 'testing');
  expect(addTodoButton).not.toHaveAttribute('disabled');
});

it('should clear out input after successful task creation', async () => {
  const inputElement = await component.findByTestId('add-todo-box-input') as HTMLInputElement;
  const addTodoButton = await component.findByTestId('add-todo-box-button');

  userEvent.type(inputElement, 'testing');
  userEvent.click(addTodoButton);

  expect(inputElement.value).toEqual('');
});

it('should be able to trigger add todo callback with correct arguments', async () => {
  const inputElement = await component.findByTestId('add-todo-box-input');
  userEvent.type(inputElement, 'testing');

  const addTodoButton = await component.findByTestId('add-todo-box-button');
  userEvent.click(addTodoButton);

  expect(addTodoCallback).toHaveBeenCalledWith('testing');
});
