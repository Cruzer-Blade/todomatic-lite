import React from 'react';
import { FilterOption } from '../../types';
import FilterTab from '../FilterTab/FilterTab';

interface FilterTabGroupProps {
  currentFilter: FilterOption;
  onFilterChange: (newFilter: FilterOption) => void;
}

function FilterTabGroup({ currentFilter, onFilterChange }: FilterTabGroupProps) {
  const { all, pending, completed } = FilterOption;

  return (
    <div role="tablist">
      {[all, pending, completed].map((filter) => (
        <FilterTab
          key={filter}
          filter={filter}
          active={currentFilter === filter}
          onFilterChange={() => onFilterChange(filter)}
        />
      ))}
    </div>
  )
}

export default FilterTabGroup;
