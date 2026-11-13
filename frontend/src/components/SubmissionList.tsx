import SubmissionRow from './SubmissionRow';
import clsx from 'clsx';
import styles from './SubmissionList.module.css';

interface ISubmissionList {
  id: number;
  submissionId: string;
  submissionDate: string;
  allFieldsFilled: string;
  conditionals: string;
}

const SubmissionList = ({
  submissionData,
  isExpanded,
}: {
  submissionData: ISubmissionList[];
  isExpanded: boolean;
}) => {
  return (
    <div
      className={
        isExpanded
          ? styles.submissionListContainer
          : clsx(styles.submissionListContainer, styles.hidden)
      }
    >
      <div className={styles.stickyContainer}>
        <div className={styles.submissionCategoriesContainer}>
          <button
            className={clsx(styles.sortButton, styles.submissionIdCategory)}
          >
            #
          </button>
          <button
            className={clsx(styles.sortButton, styles.submissionDateCategory)}
          >
            Submission Date
          </button>
          <button
            className={clsx(styles.sortButton, styles.fieldsFilledCategory)}
          >
            All Fields Filled?
          </button>
          <button
            className={clsx(styles.sortButton, styles.conditionalsCategory)}
          >
            Conditionals?
          </button>
          <button className={clsx(styles.sortButton, styles.selectedCategory)}>
            Selected
          </button>
          <button className={clsx(styles.sortButton, styles.actionsCategory)}>
            Actions
          </button>
        </div>
        <hr className={styles.rowDivider} />
      </div>
      {submissionData.map((submission) => {
        return (
          <SubmissionRow key={submission.id} submissionData={submission} />
        );
      })}
    </div>
  );
};

export default SubmissionList;
