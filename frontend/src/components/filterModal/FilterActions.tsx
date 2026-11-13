import { ReactComponent as CloseIcon } from '@/data/assets/close-icon-12x12.svg';
import { ReactComponent as ClearIcon } from '@/data/assets/clear-icon-13x16.svg';
import { ReactComponent as ApplyIcon } from '@/data/assets/apply-icon-14x13.svg';
import ActionButton from '../ActionButton';
import styles from './FilterActions.module.css';

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

const FilterActions = ({
  close,
  updater,
  updateParams,
  activeFilters,
}: {
  close: Function;
  updater: Function;
  updateParams: { data: IFixedFieldData[]; filteredSet: any };
  activeFilters: {
    value: { type: Set<string>; data: Set<string>; subsections: Set<string> };
    setter: Function;
    clear: Function;
  };
}) => {
  function closeButtonTest() {
    close();
  }
  function clearButtonTest() {
    activeFilters.clear();
    updater(updateParams.data, updateParams.filteredSet);
  }
  function applyButtonTest() {
    updater(updateParams.data, updateParams.filteredSet);
    close();
  }

  return (
    <div className={styles.selectionActions}>
      <ActionButton
        icon={<CloseIcon />}
        label="Close"
        onClick={closeButtonTest}
        style={{
          icon: { marginTop: 2 },
        }}
      />
      <ActionButton
        icon={<ClearIcon />}
        label="Clear Filters"
        onClick={clearButtonTest}
        style={{
          icon: { marginTop: 2 },
        }}
      />
      <hr className={styles.actionsDivider} />
      <ActionButton
        icon={<ApplyIcon />}
        label={'Apply Filters'}
        onClick={applyButtonTest}
        style={{
          button: { background: '#769BFF', color: '#ffffff', border: 'none' },
          icon: { marginTop: 3, width: 11 },
        }}
      />
    </div>
  );
};

export default FilterActions;
