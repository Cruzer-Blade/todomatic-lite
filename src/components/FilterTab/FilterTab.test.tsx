import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterOption } from '../../types';
import FilterTab from './FilterTab';

describe('Basic component rendering', () => {
  it('should be able to render a tab item', () => {
    render(
      <FilterTab
        filter={FilterOption.all}
        active={false}
        onFilterChange={() => {}}
      />
    );

    const tabItem = screen.getByRole('tab');
    expect(tabItem).toBeInTheDocument();
    expect(tabItem).toHaveAttribute('data-active', 'false');
  });

  it('should not highlight an inactive filter tab', () => {
    render(
      <FilterTab
        filter={FilterOption.all}
        active={false}
        onFilterChange={() => {}}
      />
    );

    const tabItem = screen.getByRole('tab');
    expect(tabItem).toHaveAttribute('data-active', 'false');
  });

  it('should highlight active filter tab', () => {
    render(
      <FilterTab
        filter={FilterOption.all}
        active
        onFilterChange={() => {}}
      />
    );

    const tabItem = screen.getByRole('tab');
    expect(tabItem).toHaveAttribute('data-active', 'true');
  });

  it('should be able to render "all" filter tab', () => {
    render(
      <FilterTab
        filter={FilterOption.all}
        active
        onFilterChange={() => {}}
      />
    );

    const tabItem = screen.getByRole('tab');
    expect(tabItem.textContent).toMatch(/\ball\b/i);
  });

  it('should be able to render "pending" filter tab', () => {
    render(
      <FilterTab
        filter={FilterOption.pending}
        active
        onFilterChange={() => {}}
      />
    );

    const tabItem = screen.getByRole('tab');
    expect(tabItem.textContent).toMatch(/\bpending\b/i);
  });

  it('should be able to render "completed" filter tab', () => {
    render(
      <FilterTab
        filter={FilterOption.completed}
        active
        onFilterChange={() => {}}
      />
    );

    const tabItem = screen.getByRole('tab');
    expect(tabItem.textContent).toMatch(/\bcompleted\b/i);
  });
});

describe('User interaction testing', () => {
  it('should call filter change callback on tab click', () => {
    const onFilterChange = jest.fn();

    render(
      <FilterTab
        filter={FilterOption.all}
        active={false}
        onFilterChange={onFilterChange}
      />
    );

    const tabItem = screen.getByRole('tab');
    userEvent.click(tabItem);

    expect(onFilterChange).toHaveBeenCalledTimes(1);
  });
});
