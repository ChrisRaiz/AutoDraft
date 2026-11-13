import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import styles from './CollapsibleDivider.module.css';

const CollapsibleDivider = ({
  section,
  subsections,
  children,
  style,
}: {
  section: string;
  subsections: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties | null;
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }

  console.log('Subsections?:', subsections);

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.collapsibleDividerContainer}>
        <hr className={styles.rowDivider} />
        <div className={styles.sectionTitleContainer}>
          <p className={styles.sectionTitle}>{section}</p>
        </div>
        <button
          className={clsx(
            styles.collapseExpandButton,
            collapsed ? styles.expand : styles.collapse,
          )}
          onClick={() => toggleCollapsed()}
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      <div
        className={styles.childrenContainer}
        style={collapsed ? { display: 'none' } : style}
      >
        {children}
      </div>
      {subsections ? (
        !collapsed ? (
          <hr className={styles.subsectionLine} />
        ) : null
      ) : null}
    </div>
  );
};

export default CollapsibleDivider;
