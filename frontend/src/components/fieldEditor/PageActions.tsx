import { Link } from 'react-router-dom';
import { ReactComponent as SaveIcon } from './../../data/assets/save-icon-16x14.svg';
import { ReactComponent as ResetIcon } from './../../data/assets/reset-icon-14x13.svg';
import { ReactComponent as DeleteIcon } from './../../data/assets/delete-icon-17x14.svg';
import { ReactComponent as FilterIcon } from './../../data/assets/filter-icon-13x13.svg';
import { ReactComponent as ReturnIcon } from './../../data/assets/return-icon-12x11.svg';
import ActionButton from '../ActionButton';
import styles from './PageActions.module.css';

const PageActions = () => {
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
    console.log('ActionButton - filterButtonTest: Success!');
  }
  function returnButtonTest() {}
  return (
    <div className={styles.selectionActions}>
      <ActionButton
        icon={<SaveIcon />}
        label="Save All"
        color="purple"
        onClick={saveButtonTest}
      />
      <ActionButton
        icon={<ResetIcon />}
        label="Reset All"
        color="orange"
        onClick={resetButtonTest}
      />
      <ActionButton
        icon={<DeleteIcon />}
        label="Delete All"
        color="red"
        onClick={deleteButtonTest}
      />
      <hr className={styles.actionsDivider} />
      <ActionButton
        icon={<FilterIcon />}
        label="Filters"
        onClick={filterButtonTest}
        style={{ icon: { marginTop: 1.5 } }}
      />
      <hr className={styles.actionsDivider} />
      <Link to={'/submissions'} style={{ textDecoration: 'none' }}>
        <ActionButton
          icon={<ReturnIcon />}
          label="Submissions"
          onClick={returnButtonTest}
        />
      </Link>
    </div>
  );
};

export default PageActions;
