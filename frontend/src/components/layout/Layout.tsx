import { Outlet } from 'react-router';
import SideMenu from './SideMenu';
import TopMenu from './TopMenu';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layoutContainer}>
      <SideMenu />
      <div className={styles.mainContent}>
        <TopMenu />
        <div className={styles.childContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
