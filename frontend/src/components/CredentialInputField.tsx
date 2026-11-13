import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from 'react';
import { ReactComponent as VisibleInputIcon } from '../data/assets/visible-input-icon-20x14.svg';
import { ReactComponent as HiddenInputIcon } from '../data/assets/hidden-input-icon-20x16.svg';
import clsx from 'clsx';
import styles from './CredentialInputField.module.css';

const CredentialInputField = ({
  type,
  input,
  valid,
}: {
  type: 'email' | 'password';
  input: { value: string; setter: Function };
  valid: { value: boolean; setter: Function };
}) => {
  const [prevValue, setPrevValue] = useState<string>('');
  const fieldLabel: string = String(
    type.charAt(0).toUpperCase() + type.slice(1, type.length),
  );

  function handleOnBlur(e: FocusEvent<HTMLInputElement>) {
    if (!valid.value && prevValue !== e.target.value.trim()) valid.setter(true);
    input.setter(type, e.target.value.trim());
    setPrevValue(e.target.value.trim());
  }

  function handleOnInvalid() {
    valid.setter(false);
  }

  return (
    <div className={styles.inputFieldContainer}>
      <p className={styles.fieldLabel}>{fieldLabel}</p>
      {type == 'email' ? (
        <EmailInputField input={input} valid={valid} />
      ) : (
        <PasswordInputField input={input} valid={valid} />
      )}
    </div>
  );
};

export const EmailInputField = ({
  input,
  valid,
}: {
  input: { value: string; setter: Function };
  valid: { value: boolean; setter: Function };
}) => {
  return (
    <input
      className={styles.inputField}
      type={'email'}
      required={true}
      value={input.value}
      onChange={(e) => (
        console.log(e.target.value), input.setter('email', e.target.value)
      )}
      onInvalid={() => valid.setter(false)}
    />
  );
};

interface IVisibility {
  type: 'password' | 'text';
  isVisible: boolean;
  icon: ReactElement<SVGElement>;
}

export const PasswordInputField = ({
  input,
  valid,
}: {
  input: { value: string; setter: Function };
  valid: { value: boolean; setter: Function };
}) => {
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
    <div className={clsx(styles.passwordInputContainer)}>
      <input
        className={clsx(styles.inputField, styles.passwordInput)}
        type={visibility}
        required={true}
        value={input.value}
        onChange={(e) => (
          console.log(e.target.value), input.setter('password', e.target.value)
        )}
        onInvalid={() => valid.setter(false)}
      />
      <button
        className={styles.visibilityButton}
        onClick={() => handleVisibleChange()}
      >
        {visibility == 'password'
          ? visibilityProps.hidden.icon
          : visibilityProps.visible.icon}
      </button>
    </div>
  );
};

export default CredentialInputField;
