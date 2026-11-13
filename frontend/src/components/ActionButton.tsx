import BaseButton from './BaseButton';
import BoldButton from './BoldButton';

import styles from './ActionButton.module.css';

const ActionButton = ({
  icon,
  label,
  onClick,
  color,
  style,
}: {
  icon: React.ReactNode;
  label: string;
  color?: 'red' | 'orange' | 'purple' | null;
  onClick: Function;
  style?: {
    button?: React.CSSProperties;

    icon?: React.CSSProperties;
    label?: React.CSSProperties;
  };
}) => {
  const colors = {
    red: '#FA5A7D',
    orange: '#FF947A',
    purple: '#5D5FEF',
  };

  if (color) {
    return (
      <BoldButton
        icon={icon}
        label={label}
        onClick={onClick}
        color={colors[color]}
      />
    );
  }
  return (
    <BaseButton icon={icon} label={label} onClick={onClick} style={style} />
  );
};

export default ActionButton;
