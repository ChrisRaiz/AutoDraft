import { useState } from 'react';
import { ReactComponent as ErrorIcon } from '../../../data/assets/error-icon-14x14.svg';
import { checkTeamNameAvailable } from '@/data/ipc/messages';
import clsx from 'clsx';
import styles from './CreateTeamForm.module.css';

interface ITeamData {
  teamName: string;
  packageName: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
  packageFrequency: 'monthly' | 'annually';
}

type TeamFields = 'teamName' | 'packageName' | 'packageFrequency';

interface ITeamFieldsValid {
  teamName: {
    valid: boolean;
    error: string | null;
  };
  packageName: {
    valid: boolean;
    error: string | null;
  };
  packageFrequency: {
    valid: boolean;
    error: string | null;
  };
}

type FormTypes = 'login' | 'user' | 'team';

const CreateTeamForm = ({
  teamData,
  type,
  next,
}: {
  teamData: { value: ITeamData; setter: Function };
  type: { value: FormTypes; setter: Function };
  next: Function;
}) => {
  const [isValid, setValid] = useState<ITeamFieldsValid>({
    teamName: {
      valid: true,
      error: null,
    },
    packageName: {
      valid: true,
      error: null,
    },
    packageFrequency: {
      valid: true,
      error: null,
    },
  });

  async function checkEmpty(value: string) {
    if (!value) {
      return false;
    } else {
      return true;
    }
  }

  async function validateField(field: TeamFields, value: string) {
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
  }

  async function validateFields() {
    const errorFields: {
      [field: string]: { valid: boolean; error: string | null };
    } = {};
    let errorCount = 0;
    for (const field in isValid) {
      const typedField = field as TeamFields;
      const valid = await checkEmpty(teamData.value[typedField]);
      // Ensure field is not empty
      if (!valid) {
        errorFields[typedField] = {
          valid: false,
          error: 'This field is required and cannot be empty',
        };
        errorCount = errorCount + 1;
        continue;
      } else if (typedField !== 'teamName' && !isValid[typedField].valid) {
        errorFields[typedField] = {
          valid: true,
          error: null,
        };
      }

      // Ensure teamName field is valid and available
      if (typedField === 'teamName') {
        const availableName = await checkTeamNameAvailable(
          teamData.value.teamName,
        );

        if (!availableName.available) {
          errorFields[typedField] = {
            valid: false,
            error: 'Team name is already taken',
          };
          errorCount = errorCount + 1;
          continue;
        }

        errorFields.teamName = {
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
    <div className={styles.userInputContainer}>
      <label
        className={
          isValid.teamName.valid
            ? styles.fieldLabel
            : clsx(styles.fieldLabel, styles.invalidFieldLabel)
        }
      >
        Team Name
        <div className={styles.inputFieldContainer}>
          <input
            className={
              isValid.teamName.valid
                ? styles.inputField
                : clsx(styles.inputField, styles.invalidInputField)
            }
            type={'text'}
            required={true}
            value={teamData.value.teamName}
            onChange={(e) => teamData.setter('teamName', e.target.value)}
            onBlur={(e) => validateField('teamName', e.target.value)}
          />
        </div>
        {isValid.teamName.valid ? null : (
          <div className={styles.errorContainer}>
            <ErrorIcon className={styles.errorIcon} />
            <p className={styles.errorMessage}>{isValid.teamName.error}</p>
          </div>
        )}
      </label>
      <label className={styles.fieldLabel}>
        Package
        <div className={styles.inputFieldContainer}>
          <select
            className={styles.selectField}
            required={true}
            value={teamData.value.packageName}
            onChange={(e) => teamData.setter('packageName', e.target.value)}
            onBlur={(e) => validateField('packageName', e.target.value)}
          >
            <option value="free">Free</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>
      </label>
      <label className={styles.fieldLabel}>
        Payment Frequency
        <div className={styles.inputFieldContainer}>
          <select
            className={styles.selectField}
            required={true}
            value={teamData.value.packageFrequency}
            onChange={(e) =>
              teamData.setter('packageFrequency', e.target.value)
            }
            onBlur={(e) => validateField('packageFrequency', e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
          </select>
        </div>
      </label>
      <button
        // type="submit"
        className={styles.submitButton}
        onClick={() => validateFields()}
      >
        Sign Up
      </button>
    </div>
  );
};

export default CreateTeamForm;
