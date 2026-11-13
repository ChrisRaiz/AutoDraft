import { useId } from 'react';
import styles from './PersistLogin.module.css';

const PersistLogin = () => {
  const persistLoginId = useId();
  return (
    <label htmlFor={persistLoginId} className={styles.persistLoginText}>
      <input
        type="checkbox"
        id={persistLoginId}
        name="persistLogin"
        className={styles.persistLoginCheckbox}
      />
      <span className={styles.artificialTextbox}>
        <span className={styles.innerArtificialBox}></span>
      </span>
      Remember Me
    </label>
  );
};

export default PersistLogin;
