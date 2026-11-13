import styles from './DynamicTitle.module.css';

type FormTypes = 'login' | 'user' | 'team';

const DynamicTitle = ({ type }: { type: FormTypes }) => {
  if (type == 'login') {
    return (
      <div className={styles.titleContainer}>
        <h1 className={styles.titleText}>Welcome Back</h1>
        <p className={styles.subtitleText}>
          Enter your email and password to access your account
        </p>
      </div>
    );
  } else {
    const subtitle = type == 'user' ? 'User' : 'Team';

    return (
      <div className={styles.titleContainer}>
        <h1 className={styles.titleText}>Create Account</h1>
        <p className={styles.subtitleText}>{subtitle} Information</p>
      </div>
    );
  }
};

export default DynamicTitle;
