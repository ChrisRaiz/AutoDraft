import { ReactNode } from 'react';
import { ReactComponent as ExportIcon } from './../data/assets/export-icon-16x16.svg';
import { ReactComponent as GeneratedDocumentsIcon } from './../data/assets/generated-documents-icon-40x40.svg';
import { ReactComponent as NewSubmissionsIcon } from './../data/assets/new-submissions-icon-40x40.svg';
import { ReactComponent as SubmissionUpdatesIcon } from './../data/assets/submission-updates-icon-40x40.svg';
import { ReactComponent as DeletedSubmissionsIcon } from './../data/assets/deleted-submissions-icon-40x40.svg';
import styles from './StatisticCard.module.css';

const StatisticCard = ({
  icon,
  count,
  category,
  background,
}: {
  icon: ReactNode;
  count: number;
  category: string;
  background: string;
}) => {
  return (
    <div
      className={styles.statCardContainer}
      style={{ background: background }}
    >
      <div className={styles.statCardIcon}>{icon}</div>
      <p className={styles.statCardCount}>{count}</p>
      <p className={styles.statCardCategory}>{category}</p>
    </div>
  );
};

export default StatisticCard;
