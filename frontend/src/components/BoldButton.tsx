import styles from './BoldButton.module.css';

const BoldButton = ({
  icon,
  label,
  onClick,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color?: string;
  onClick: Function;
}) => {
  return (
    <button
      className={styles.boldButton}
      style={color ? { border: `1px, solid, ${color}`, color: color } : {}}
      onClick={() => onClick()}
    >
      <span className={styles.boldIcon}>{icon}</span>
      <span className={styles.boldLabel}>{label}</span>
    </button>
  );
};

export default BoldButton;
