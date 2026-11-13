// import { useState } from 'react';
// import styles from './SubsectionDivider.module.css';

// const SubsectionDivider = ({
//   subsection,
//   children,
// }: {
//   subsection: string;
//   children: React.ReactNode;
// }) => {
//   const [collapsed, setCollapsed] = useState<boolean>(false);
//   function toggleCollapsed() {
//     setCollapsed(!collapsed);
//   }

//   return (
//     <div className={styles.subsectionContainer}>
//       <div
//         className={styles.subsectionDividerContainer}
//         style={collapsed ? {} : { marginBottom: 20 }}
//       >
//         <hr className={styles.rowDivider} />
//         <div className={styles.subsectionTitleContainer}>
//           <p className={styles.subsectionTitle}>{subsection}</p>
//         </div>
//         <button
//           className={styles.expandCollapseButton}
//           onClick={() => toggleCollapsed()}
//         >
//           {collapsed ? 'Expand' : 'Collapse'}
//         </button>
//       </div>
//       <div
//         className={styles.childrenContainer}
//         style={collapsed ? { display: 'none' } : {}}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default SubsectionDivider;
