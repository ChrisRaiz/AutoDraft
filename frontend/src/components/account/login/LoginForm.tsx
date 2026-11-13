import { ReactElement, useState } from 'react';
import { authenticateCredentials } from '@/data/ipc/messages';
import { ReactComponent as VisibleInputIcon } from '../../../data/assets/visible-input-icon-20x14.svg';
import { ReactComponent as HiddenInputIcon } from '../../../data/assets/hidden-input-icon-20x16.svg';
import PersistLogin from './PersistLogin';
import ForgotPassword from './ForgotPassword';
import clsx from 'clsx';
import styles from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';

interface IVisibility {
  type: 'password' | 'text';
  isVisible: boolean;
  icon: ReactElement<SVGElement>;
}

interface ILoginValid {
  email: boolean;
  password: boolean;
}

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setValid] = useState<ILoginValid>({
    email: true,
    password: true,
  });
  const navigate = useNavigate();

  function handleEmailChange(value: string) {
    setEmail(value);
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
  }

  async function handleSubmit() {
    console.log('Begin execution of handleSubmit()');
    if (!email || !isValid.email || !password || !isValid.password) {
      console.warn('Email or Password is invalid.');
      return;
    }

    const res = await authenticateCredentials(email, password);

    console.log('Axios request complete! Res:', res);

    if (res.status == 200) {
      console.log('Valid status! res.status:', res.status);
      navigate('/');
    } else {
      console.log('Invalid status! res.status:', res.status);
      console.warn('Email or Password is incorrect.');
    }
  }

  const visibilityProps: { hidden: IVisibility; visible: IVisibility } = {
    hidden: {
      type: 'password',
      isVisible: false,
      icon: (
        <VisibleInputIcon
          className={clsx(styles.visibilityIcon, styles.visibleInputIcon)}
        />
      ),
    },
    visible: {
      type: 'text',
      isVisible: true,
      icon: (
        <HiddenInputIcon
          className={clsx(styles.visibilityIcon, styles.hiddenInputIcon)}
        />
      ),
    },
  };
  const [visibility, setVisibility] = useState<'password' | 'text'>('password');

  function handleVisibleChange() {
    visibility == 'password'
      ? setVisibility('text')
      : setVisibility('password');
  }

  return (
    <>
      <form className={styles.loginForm}>
        <label className={styles.fieldLabel}>
          Email
          <div className={styles.inputFieldContainer}>
            <input
              className={styles.inputField}
              type={'email'}
              required={true}
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </div>
        </label>
        <div className={styles.inputFieldContainer}>
          <label className={styles.fieldLabel}>
            Password
            <div className={clsx(styles.passwordInputContainer)}>
              <input
                className={styles.inputField}
                type={visibility}
                required={true}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              <button
                type="button"
                className={styles.visibilityButton}
                onClick={() => handleVisibleChange()}
              >
                {visibility == 'password'
                  ? visibilityProps.hidden.icon
                  : visibilityProps.visible.icon}
              </button>
            </div>
          </label>
        </div>
      </form>
      <div className={styles.optionsContainer}>
        <PersistLogin />
        <ForgotPassword />
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        onClick={() => handleSubmit()}
      >
        Log In
      </button>
    </>
  );
};

export default LoginForm;
