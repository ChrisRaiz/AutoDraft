import styles from './CompletedDisplay.module.css';

const CompletedDisplay = ({
  complete,
  colors,
}: {
  complete: number;
  colors: { text: string; background: string; border: string };
}) => {
  return (
    <div
      className={styles.completedDisplayContainer}
      style={{
        color: colors.text,
        background: colors.background,
        borderColor: colors.border,
      }}
    >
      {complete}%
    </div>
  );
};

export default CompletedDisplay;

export const CompletedDisplayFraction = ({
  complete,
  total,
  colors,
}: {
  complete: number;
  total: number;
  colors: { text: string; background: string; border: string };
}) => {
  return (
    <div
      className={styles.completedDisplayFractionContainer}
      style={{
        color: colors.text,
        background: colors.background,
        borderColor: colors.border,
      }}
    >
      {complete} / {total}
    </div>
  );
};
