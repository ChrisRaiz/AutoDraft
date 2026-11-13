import styles from './BaseButton.module.css';

const BaseButton = ({
  icon,
  label,
  onClick,
  style,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: Function;
  style?: {
    button?: React.CSSProperties;

    icon?: React.CSSProperties;

    label?: React.CSSProperties;
  };
}) => {
  return (
    <button
      className={styles.baseButton}
      style={style?.button ? style.button : {}}
      onClick={() => onClick()}
    >
      <span className={styles.baseIcon} style={style?.icon ? style.icon : {}}>
        {icon}
      </span>
      <p className={styles.baseLabel} style={style?.label ? style.label : {}}>
        {label}
      </p>
    </button>
  );
};

export default BaseButton;
