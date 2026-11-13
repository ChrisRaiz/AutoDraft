import ProgressBar from './ProgressBar';
import CompletedDisplay from './CompletedDisplay';
import styles from './DocumentRow.module.css';

const DocumentRow = ({
  id,
  documentSet,
  complete,
  colors,
}: {
  id: string;
  documentSet: string;
  complete: number;
  colors: {
    text: string;
    background: string;
    border: string;
  };
}) => {
  return (
    <>
      <hr className={styles.documentDivider} />
      <div className={styles.documentRowContainer}>
        <div className={styles.documentIdContainer}>
          <p className={styles.documentStatText}>{id}</p>
        </div>
        <div className={styles.documentSetContainer}>
          <p className={styles.documentStatText}>{documentSet}</p>
        </div>
        <div className={styles.documentProgressContainer}>
          <ProgressBar
            complete={complete}
            colors={{
              background: colors.background,
              border: colors.border,
            }}
          />
        </div>
        <div className={styles.documentCompletedContainer}>
          <CompletedDisplay complete={complete} colors={colors} />
        </div>
      </div>
    </>
  );
};

export default DocumentRow;
