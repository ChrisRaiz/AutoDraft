import { useState } from 'react';
import { ReactComponent as ExpandIcon } from './../data/assets/expand-icon-13x10.svg';
import SubmissionList from './SubmissionList';
import clsx from 'clsx';
import styles from './ClientRow.module.css';

interface ISubmissionList {
  id: number;
  submissionId: string;
  submissionDate: string;
  allFieldsFilled: string;
  conditionals: string;
}

interface IClientList {
  id: number;
  clientId: string;
  client: string;
  lastSubmission: string;
  submissions: string;
  email: string;
  phone: string;
  submissionData: ISubmissionList[];
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

const ClientRow = ({ clientData }: { clientData: IClientList }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);

  function toggleIsExpanded(isExpanded: boolean) {
    setExpanded(!isExpanded);
  }

  return (
    <>
      <div
        className={
          Number(clientData.clientId) % 2 == 0
            ? clsx(styles.clientRowContainer, styles.altClientBackground)
            : styles.clientRowContainer
        }
      >
        <div className={styles.idCategory}>
          <p className={styles.rowDataText}>{clientData.clientId}</p>
        </div>
        <div className={styles.clientCategory}>
          <p className={styles.rowDataText}>{clientData.client}</p>
        </div>
        <div className={styles.lastSubmissionCategory}>
          <p className={styles.rowDataText}>{clientData.lastSubmission}</p>
        </div>
        <div className={styles.submissionsCategory}>
          <p className={styles.rowDataText}>{clientData.submissions}</p>
        </div>
        <div className={styles.emailCategory}>
          <p className={styles.rowDataText}>{clientData.email}</p>
        </div>
        <div className={styles.phoneCategory}>
          <p className={styles.rowDataText}>{clientData.phone}</p>
        </div>
        <div className={styles.selectedCategory}>
          <RadioButton />
          {/* <p className={styles.rowDataText}>PUT SELECTED COMPONENT HERE</p> */}
        </div>
        <div className={styles.actionsCategory}>
          {/* <AdditionalActionsButton /> */}
          <button
            className={styles.expandCollapseButton}
            onClick={() => toggleIsExpanded(isExpanded)}
          >
            <ExpandIcon className={styles.expandIcon} />
          </button>
        </div>
      </div>
      <hr className={styles.rowDivider} />
      <SubmissionList
        submissionData={clientData.submissionData}
        isExpanded={isExpanded}
      />
    </>
  );
};

export default ClientRow;
