import styles from './Checkbox.module.css';

const Checkbox = ({
  isChecked,
  activeFilters,
  set,
  filter,
}: {
  isChecked: { value: boolean; setter: Function };
  activeFilters: {
    value: { type: Set<string>; data: Set<string>; subsections: Set<string> };
    setter: Function;
  };
  set: string;
  filter: string | boolean;
}) => {
  function toggleCheckbox() {
    isChecked.setter();
    activeFilters.setter(set, filter);
  }

  return (
    <button
      className={styles.checkboxContainer}
      style={
        isChecked.value ? { borderWidth: 1.5, borderColor: '#769BFF' } : {}
      }
      onClick={() => toggleCheckbox()}
    >
      <div className={isChecked.value ? styles.innerCheck : ''} />
    </button>
  );
};

export default Checkbox;
