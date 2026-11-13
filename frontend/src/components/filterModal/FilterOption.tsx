import { useState } from 'react';
import Checkbox from './Checkbox';
import styles from './FilterOption.module.css';

const FilterOption = ({
  filter,
  filterSet,
  containerStyles,
  activeFilters,
}: {
  filter: { filter: string; set: string; type: string | boolean };
  filterSet: string;
  containerStyles?: React.CSSProperties;
  activeFilters: {
    value: { type: Set<string>; data: Set<string>; subsections: Set<string> };
    setter: Function;
  };
}) => {
  const [isChecked, setChecked] = useState<boolean>(false);

  function toggleChecked(): void {
    setChecked(!isChecked);
  }
  console.log('filter:', filter);
  return (
    <div className={styles.filterOption} style={containerStyles}>
      <Checkbox
        isChecked={{ value: isChecked, setter: toggleChecked }}
        set={filterSet}
        filter={filter.type}
        activeFilters={activeFilters}
      />
      <p
        className={styles.filterText}
        style={isChecked ? { color: '#769BFF' } : {}}
      >
        {filter.filter}
      </p>
    </div>
  );
};

export default FilterOption;
