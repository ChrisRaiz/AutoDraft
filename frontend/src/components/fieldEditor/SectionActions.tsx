import { ReactComponent as SaveIcon } from './../../data/assets/save-icon-16x14.svg';
import { ReactComponent as ResetIcon } from './../../data/assets/reset-icon-14x13.svg';
import { ReactComponent as DeleteIcon } from './../../data/assets/delete-icon-17x14.svg';
import { ReactComponent as FilterIcon } from './../../data/assets/filter-icon-13x13.svg';
import { ReactComponent as ExpandIcon } from './../../data/assets/expand-icon-11x11.svg';
import { ReactComponent as CollapseIcon } from './../../data/assets/collapse-icon-11x3.svg';
import ActionButton from '../ActionButton';
import styles from './SectionActions.module.css';

const SectionActions = ({
  collapsed,
  filterModal,
}: {
  collapsed: { value: boolean; toggle: Function };
  filterModal: { value: boolean; toggle: Function };
}) => {
  function saveButtonTest() {
    console.log('ActionButton - saveButtonTest: Success!');
  }
  function resetButtonTest() {
    console.log('ActionButton - resetButtonTest: Success!');
  }
  function deleteButtonTest() {
    console.log('ActionButton - deleteButtonTest: Success!');
  }
  function filterButtonTest() {
    filterModal.toggle();
  }
  function collapseSection() {
    collapsed.toggle();
  }

  return (
    <div className={styles.selectionActions}>
      <ActionButton
        icon={<SaveIcon />}
        label="Save"
        color="purple"
        onClick={saveButtonTest}
      />
      <ActionButton
        icon={<ResetIcon />}
        label="Reset"
        color="orange"
        onClick={resetButtonTest}
      />
      <ActionButton
        icon={<DeleteIcon />}
        label="Delete"
        color="red"
        onClick={deleteButtonTest}
      />
      <hr className={styles.actionsDivider} />
      <ActionButton
        icon={<FilterIcon />}
        label="Filter"
        onClick={filterButtonTest}
        style={{ icon: { marginTop: 1.5 } }}
      />
      <hr className={styles.actionsDivider} />
      <ActionButton
        icon={collapsed.value ? <ExpandIcon /> : <CollapseIcon />}
        label={collapsed.value ? 'Expand' : 'Collapse'}
        onClick={collapseSection}
        style={
          collapsed.value
            ? { icon: { marginTop: 2 } }
            : { icon: { marginBottom: '9%' } }
        }
      />
    </div>
  );
};

export default SectionActions;
