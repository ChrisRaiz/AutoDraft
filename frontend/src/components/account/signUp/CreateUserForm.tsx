import { useState } from 'react';
import { ReactElement } from 'react';
import { checkUserEmailAvailable } from '@/data/ipc/messages';
import { ReactComponent as ErrorIcon } from '../../../data/assets/error-icon-14x14.svg';
import { ReactComponent as VisibleInputIcon } from '../../../data/assets/visible-input-icon-20x14.svg';
import { ReactComponent as HiddenInputIcon } from '../../../data/assets/hidden-input-icon-20x16.svg';
import clsx from 'clsx';
import styles from './CreateUserForm.module.css';

interface IUserFieldsValid {
  firstName: {
    valid: boolean;
    error: string | null;
  };
  lastName: {
    valid: boolean;
    error: string | null;
  };
  email: {
    valid: boolean;
    error: string | null;
  };
  phone: {
    valid: boolean;
    error: string | null;
  };
  password: {
    valid: boolean;
    error: string | null;
  };
}

type UserFields = 'firstName' | 'lastName' | 'email' | 'phone' | 'password';

interface IVisibility {
  type: 'password' | 'text';
  isVisible: boolean;
  icon: ReactElement<SVGElement>;
}

interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

type FormTypes = 'login' | 'user' | 'team';

const CreateUserForm = ({
  userData,
  type,
  next,
}: {
  userData: { value: IUserData; setter: Function };
  type: { value: FormTypes; setter: Function };
  next: Function;
}) => {
  const [isValid, setValid] = useState<IUserFieldsValid>({
    firstName: {
      valid: true,
      error: null,
    },
    lastName: {
      valid: true,
      error: null,
    },
    email: {
      valid: true,
      error: null,
    },
    phone: {
      valid: true,
      error: null,
    },
    password: {
      valid: true,
      error: null,
    },
  });

  const visibilityProps: { hidden: IVisibility; visible: IVisibility } = {
    hidden: {
      type: 'password',
      isVisible: false,
      icon: (
        <VisibleInputIcon
          className={clsx(
            styles.visibilityIcon,
            isValid.password.valid ? null : styles.errorVisibilityIcon,
          )}
        />
      ),
    },
    visible: {
      type: 'text',
      isVisible: true,
      icon: (
        <HiddenInputIcon
          className={clsx(
            styles.visibilityIcon,
            isValid.password.valid ? null : styles.errorVisibilityIcon,
          )}
        />
      ),
    },
  };

  const [visibility, setVisibility] = useState<'password' | 'text'>('password');

  function handleVisibleChange() {
    visibility === 'password'
      ? setVisibility('text')
      : setVisibility('password');
  }

  async function checkEmpty(value: string) {
    if (!value) {
      return false;
    } else {
      return true;
    }
  }

  async function checkEmail(email: string) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
  }

  async function checkPhone(phone: string) {
    const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;
    return phoneRegex.test(phone);
  }

  async function validateField(field: UserFields, value: string) {
    if (field !== 'email' && field !== 'phone') {
      const valid = await checkEmpty(value);

      if (!valid) {
        setValid({
          ...isValid,
          [field]: {
            valid: false,
            error: 'This field is required and cannot be empty',
          },
        });
      } else {
        setValid({
          ...isValid,
          [field]: { valid: true, error: null },
        });
      }
    } else if (field === 'email') {
      const valid = await checkEmpty(value);

      if (!valid) {
        setValid({
          ...isValid,
          email: {
            valid: false,
            error: 'This field is required and cannot be empty',
          },
        });
        return;
      }

      const validEmail = await checkEmail(value);

      if (!validEmail) {
        setValid({
          ...isValid,
          email: {
            valid: false,
            error: 'Please enter a valid email address',
          },
        });
      } else {
        setValid({
          ...isValid,
          email: {
            valid: true,
            error: null,
          },
        });
      }
    } else if (field === 'phone') {
      const valid = await checkEmpty(value);

      if (!valid) {
        setValid({
          ...isValid,
          phone: {
            valid: false,
            error: 'This field is required and cannot be empty',
          },
        });
        return;
      }

      const validPhone = await checkPhone(value);

      if (!validPhone) {
        setValid({
          ...isValid,
          phone: {
            valid: false,
            error: 'Please enter a valid phone number',
          },
        });
      } else {
        setValid({
          ...isValid,
          phone: {
            valid: true,
            error: null,
          },
        });
      }
    }
  }

  function isEmptyObject(obj: {}) {
    // Ensure the input is a non-null object before checking.
    if (typeof obj !== 'object' || obj === null) {
      return false; // Or throw an error, depending on desired behavior for non-objects
    }
    return Object.keys(obj).length === 0;
  }

  async function validateFields() {
    const errorFields: {
      [field: string]: { valid: boolean; error: string | null };
    } = {};
    let errorCount = 0;
    for (const field in isValid) {
      const typedField = field as UserFields;
      const valid = await checkEmpty(userData.value[typedField]);
      // Ensure field is not empty
      if (!valid) {
        errorFields[typedField] = {
          valid: false,
          error: 'This field is required and cannot be empty',
        };
        errorCount = errorCount + 1;
        continue;
      } else if (
        typedField !== 'email' &&
        typedField !== 'phone' &&
        !isValid[typedField].valid
      ) {
        errorFields[typedField] = {
          valid: true,
          error: null,
        };
      }

      // Ensure email field is a valid email address
      if (typedField === 'email') {
        const validEmail = await checkEmail(userData.value.email);

        if (!validEmail) {
          errorFields[typedField] = {
            valid: false,
            error: 'Please enter a valid email address',
          };
          errorCount = errorCount + 1;
          continue;
        }

        const availableEmail = await checkUserEmailAvailable(
          userData.value.email,
        );

        if (!availableEmail.available) {
          errorFields[typedField] = {
            valid: false,
            error: 'Email is already taken',
          };
          errorCount = errorCount + 1;
          continue;
        }

        errorFields.email = {
          valid: true,
          error: null,
        };
      }
      // Ensure phone field is a valid phone number
      if (typedField === 'phone') {
        const validPhone = await checkPhone(userData.value.phone);

        if (!validPhone) {
          errorFields[typedField] = {
            valid: false,
            error: 'Please enter a valid phone number',
          };
          errorCount = errorCount + 1;
          continue;
        }

        errorFields.phone = {
          valid: true,
          error: null,
        };
      }
    }

    setValid({
      ...isValid,
      ...errorFields,
    });

    if (errorCount === 0) {
      await next();
    }
  }

  return (
    <div className={styles.loginContentContainer}>
      <form className={styles.formContainer}>
        <div className={styles.nameInputsContainer}>
          <label
            className={
              isValid.firstName.valid
                ? styles.fieldLabel
                : clsx(styles.fieldLabel, styles.invalidFieldLabel)
            }
          >
            First Name
            <div className={styles.inputFieldContainer}>
              <input
                className={
                  isValid.firstName.valid
                    ? styles.inputField
                    : clsx(styles.inputField, styles.invalidInputField)
                }
                type={'text'}
                required={true}
                value={userData.value.firstName}
                onChange={(e) => userData.setter('firstName', e.target.value)}
                onBlur={(e) => validateField('firstName', e.target.value)}
              />
            </div>
            {isValid.firstName.valid ? null : (
              <div className={styles.errorContainer}>
                <ErrorIcon className={styles.errorIcon} />
                <p className={styles.errorMessage}>{isValid.firstName.error}</p>
              </div>
            )}
          </label>
          <label
            className={
              isValid.lastName.valid
                ? styles.fieldLabel
                : clsx(styles.fieldLabel, styles.invalidFieldLabel)
            }
          >
            Last Name
            <div className={styles.inputFieldContainer}>
              <input
                className={
                  isValid.lastName.valid
                    ? styles.inputField
                    : clsx(styles.inputField, styles.invalidInputField)
                }
                type={'text'}
                required={true}
                value={userData.value.lastName}
                onChange={(e) => userData.setter('lastName', e.target.value)}
                onBlur={(e) => validateField('lastName', e.target.value)}
              />
            </div>
            {isValid.lastName.valid ? null : (
              <div className={styles.errorContainer}>
                <ErrorIcon className={styles.errorIcon} />
                <p className={styles.errorMessage}>{isValid.lastName.error}</p>
              </div>
            )}
          </label>
        </div>
        <label
          className={
            isValid.email.valid
              ? styles.fieldLabel
              : clsx(styles.fieldLabel, styles.invalidFieldLabel)
          }
        >
          Email
          <div className={styles.inputFieldContainer}>
            <input
              className={
                isValid.email.valid
                  ? styles.inputField
                  : clsx(styles.inputField, styles.invalidInputField)
              }
              type={'email'}
              required={true}
              value={userData.value.email}
              onChange={(e) => userData.setter('email', e.target.value)}
              onBlur={(e) => validateField('email', e.target.value)}
            />
          </div>
          {isValid.email.valid ? null : (
            <div className={styles.errorContainer}>
              <ErrorIcon className={styles.errorIcon} />
              <p className={styles.errorMessage}>{isValid.email.error}</p>
            </div>
          )}
        </label>
        <label
          className={
            isValid.phone.valid
              ? styles.fieldLabel
              : clsx(styles.fieldLabel, styles.invalidFieldLabel)
          }
        >
          Phone
          <div className={styles.inputFieldContainer}>
            <input
              className={
                isValid.phone.valid
                  ? styles.inputField
                  : clsx(styles.inputField, styles.invalidInputField)
              }
              type={'tel'}
              required={true}
              value={userData.value.phone}
              onChange={(e) => userData.setter('phone', e.target.value)}
              onBlur={(e) => validateField('phone', e.target.value)}
            />
          </div>
          {isValid.phone.valid ? null : (
            <div className={styles.errorContainer}>
              <ErrorIcon className={styles.errorIcon} />
              <p className={styles.errorMessage}>{isValid.phone.error}</p>
            </div>
          )}
        </label>
        <div className={styles.inputFieldContainer}>
          <label
            className={
              isValid.password.valid
                ? styles.fieldLabel
                : clsx(styles.fieldLabel, styles.invalidFieldLabel)
            }
          >
            Password
            <div className={clsx(styles.passwordInputContainer)}>
              <input
                className={
                  isValid.password.valid
                    ? styles.inputField
                    : clsx(styles.inputField, styles.invalidInputField)
                }
                type={visibility}
                required={true}
                value={userData.value.password}
                onChange={(e) => userData.setter('password', e.target.value)}
                onBlur={(e) => validateField('password', e.target.value)}
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
            {isValid.password.valid ? null : (
              <div className={styles.errorContainer}>
                <ErrorIcon className={styles.errorIcon} />
                <p className={styles.errorMessage}>{isValid.password.error}</p>
              </div>
            )}
          </label>
        </div>
      </form>
      <button
        type="button"
        className={styles.submitButton}
        onClick={() => validateFields()}
      >
        Next
      </button>
    </div>
  );
};

export default CreateUserForm;
