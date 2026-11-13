import { Outlet } from 'react-router';
import { useLocation } from 'react-router-dom';
import { ReactComponent as USFlagIcon } from './../../data/assets/us-flag-512x512.svg';
import { ReactComponent as NotificationsIcon } from './../../data/assets/notifications-icon-48x48.svg';
import { ReactComponent as ChevronDown } from './../../data/assets/chevron-down-10x6.svg';
import { ReactComponent as UserChevronDown } from './../../data/assets/user-chevron-down-10x6.svg';
import UserImg from './../../data/assets/user-image.jpg';
import styles from './TopMenu.module.css';

const LanguageSelector = () => {
  return (
    <div className={styles.languageContainer}>
      <USFlagIcon className={styles.flagIcon} />
      <p className={styles.language}>Eng (US)</p>
      <ChevronDown className={styles.languageChevron} />
    </div>
  );
};

const Notifications = () => {
  return <NotificationsIcon className={styles.notifications} />;
};

const UserMenu = () => {
  return (
    <div className={styles.userContainer}>
      <img src={UserImg} className={styles.userImage} />
      <div className={styles.userInfoContainer}>
        <p className={styles.userName}>John D.</p>
        <p className={styles.userRole}>Admin</p>
      </div>
      <UserChevronDown className={styles.userChevron} />
    </div>
  );
};

function findRouteName(location: string) {
  if (location == '/') {
    return 'Dashboard';
  } else if (location == '/submissions') {
    return 'Generator';
  } else {
    return location.charAt(1).toUpperCase() + location.slice(2);
  }
}

const TopMenu = () => {
  const location: string = useLocation().pathname;
  const route = findRouteName(location);
  return (
    <header className={styles.topMenu}>
      <h1 className={styles.pageTitle}>{route}</h1>
      <div className={styles.actionsContainer}>
        <LanguageSelector />
        <Notifications />
        <UserMenu />
      </div>
    </header>
  );
};

export default TopMenu;
