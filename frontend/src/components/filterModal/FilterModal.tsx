import { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from '@/data/assets/close-icon-12x12.svg';
import { ReactComponent as ClearIcon } from '@/data/assets/clear-icon-13x16.svg';
import { ReactComponent as ApplyIcon } from '@/data/assets/apply-icon-14x13.svg';
import FilterActions from './FilterActions';
import FilterOption from './FilterOption';
import ActionButton from '../ActionButton';
import Checkbox from './Checkbox';
import clsx from 'clsx';
import styles from './FilterModal.module.css';

interface IFilters {
  fieldTypes: { filter: string; type: string; set: 'type' }[];
  fieldData: { filter: string; type: boolean; set: 'data' }[];
  subsections?: { filter: string; type: boolean; set: 'subsections' }[];
}

interface IFixedFieldData {
  id: number;
  fieldId: string;
  label: string;
  element: 'input' | 'select';
  properties: {
    type: string;
  };
  format?: string;
}

const FilterModal = ({
  isVisible,
  closeModal,
  filters,
  activeFilters,
  updater,
  updateParams,
}: {
  isVisible: boolean;
  closeModal: Function;
  filters: IFilters;
  activeFilters: {
    value: { type: Set<string>; data: Set<string>; subsections: Set<string> };
    setter: Function;
    clear: Function;
  };
  updater: Function;
  updateParams: { data: IFixedFieldData[]; filteredSet: any };
}) => {
  console.log('activeFilters:', activeFilters);
  return (
    <div
      className={styles.modalBackdrop}
      style={isVisible ? {} : { display: 'none' }}
    >
      <div className={styles.filterModal}>
        <div className={styles.header}>
          <h3 className={styles.title}>Filter</h3>
          <FilterActions
            close={closeModal}
            updater={updater}
            updateParams={updateParams}
            activeFilters={activeFilters}
          />
        </div>
        <div>
          <div className={styles.dividerContainer}>
            <hr className={styles.headerDivider} />
            <p
              className={clsx(styles.sectionContainer, styles.fieldTypesTitle)}
            >
              Field Types
            </p>
            <p className={clsx(styles.sectionContainer, styles.fieldDataTitle)}>
              Field Data
            </p>
            <p
              className={clsx(styles.sectionContainer, styles.subsectionsTitle)}
            >
              Subsections
            </p>
          </div>
          <div className={styles.filterSections}>
            <div className={styles.typesContainer}>
              {filters.fieldTypes.map((filter) => {
                return (
                  <FilterOption
                    filter={filter}
                    filterSet={filter.set}
                    activeFilters={activeFilters}
                  />
                );
              })}
            </div>
            <div className={styles.dataContainer}>
              {filters.fieldData.map((filter) => {
                return (
                  <FilterOption
                    filter={filter}
                    filterSet={filter.set}
                    activeFilters={activeFilters}
                  />
                );
              })}
            </div>
            <div className={styles.subsectionsContainer}>
              {filters?.subsections
                ? filters.subsections.map((filter) => {
                    return (
                      <FilterOption
                        filter={filter}
                        filterSet={filter.set}
                        containerStyles={{ width: '30%' }}
                        activeFilters={activeFilters}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
