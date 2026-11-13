import styles from './ProgressBar.module.css';

const ProgressBar = ({
  complete,
  colors,
  width,
}: {
  complete: number;
  colors: { background: string; border: string };
  width?: number | string;
}) => {
  return (
    <div
      className={styles.progressBarContainer}
      style={{ background: colors.background, width: width }}
    >
      <div
        className={styles.progressBarFill}
        style={{ width: `${complete}%`, background: colors.border }}
      />
    </div>
  );
};

export default ProgressBar;
