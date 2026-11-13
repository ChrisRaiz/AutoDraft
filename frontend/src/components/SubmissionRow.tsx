import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './SubmissionRow.module.css';

interface ISubmissionList {
  id: number;
  submissionId: string;
  submissionDate: string;
  allFieldsFilled: string;
  conditionals: string;
}

const AdditionalActionsButton = () => {
  return (
    <button className={styles.additionalActionsButton}>
      <p className={styles.additionalButtonText}>...</p>
    </button>
  );
};

const RadioButton = () => {
  const [isChecked, setChecked] = useState<boolean>(false);
  return (
    <input type='radio' className={styles.radioButton} onClick={() => setChecked(!isChecked)} checked={isChecked}/>
  )
}

const SubmissionRow = ({
  submissionData,
}: {
  submissionData: ISubmissionList;
}) => {
  return (
    <>
      <div
        className={
          Number(submissionData.submissionId) % 2 == 0
            ? clsx(
                styles.submissionRowContainer,
                styles.altSubmissionBackground,
              )
            : styles.submissionRowContainer
        }
      >
        <div className={styles.submissionIdCategory}>
          <p className={styles.rowDataText}>{submissionData.submissionId}</p>
        </div>
        <div className={styles.submissionDateCategory}>
          <p className={styles.rowDataText}>{submissionData.submissionDate}</p>
        </div>
        <div className={styles.fieldsFilledCategory}>
          <p className={styles.rowDataText}>{submissionData.allFieldsFilled}</p>
        </div>
        <div className={styles.conditionalsCategory}>
          <p className={styles.rowDataText}>{submissionData.conditionals}</p>
        </div>
        <div className={styles.selectedCategory}>
          <RadioButton />
        </div>
        <div className={styles.actionsCategory}>
          <AdditionalActionsButton />
          <Link to={'/editor'}>
            <button className={styles.openEditorButton}>
              <p className={styles.openEditorButtonText}>&gt;</p>
            </button>
          </Link>
        </div>
      </div>
      <hr className={styles.rowDivider} />
    </>
  );
};

export default SubmissionRow;
