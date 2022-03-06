import React from 'react';
import { render, screen } from '@testing-library/react';
import { FilterOption } from '../../types';
import FilterTabGroup from './FilterTabGroup';

it('should be able to render tab group component', () => {
  render(
    <FilterTabGroup
      currentFilter={FilterOption.all}
      onFilterChange={() => {}}
    />
  );

  const tabGroup = screen.getByRole('tablist');
  expect(tabGroup).toBeInTheDocument();
});

it('should render exactly 3 tabs', () => {
  render(
    <FilterTabGroup
      currentFilter={FilterOption.all}
      onFilterChange={() => {}}
    />
  );

  const tabItems = screen.getAllByRole('tab');
  expect(tabItems.length).toEqual(3);
});

it('should render tabs with correct labels', () => {
  render(
    <FilterTabGroup
      currentFilter={FilterOption.all}
      onFilterChange={() => {}}
    />
  );

  expect(screen.queryByText(/all/i)).toBeInTheDocument();
  expect(screen.queryByText(/pending/i)).toBeInTheDocument();
  expect(screen.queryByText(/completed/i)).toBeInTheDocument();
});
