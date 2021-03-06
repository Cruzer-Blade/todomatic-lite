import React from 'react';
import { FilterOption } from '../../types';
import './FilterTab.css';

interface FilterTabProps {
  filter: FilterOption;
  active: boolean;
  onFilterChange: () => void;
}

function FilterTab({ filter, active, onFilterChange }: FilterTabProps) {
  const getFilterTabLabel = () => {
    switch (filter) {
      case FilterOption.all:
        return 'All';

      case FilterOption.pending:
        return 'Pending';

      case FilterOption.completed:
        return 'Completed';

      default:
        return 'Unknown';
    }
  }

  return (
    <button
      className="filter-tab-root"
      role="tab"
      data-active={active}
      onClick={onFilterChange}
    >
      { getFilterTabLabel() }
    </button>
  )
}

export default FilterTab;
