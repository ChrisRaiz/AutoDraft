import { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as AutoDraftLogo } from './../../data/assets/logo-title-56x56.svg';
import { ReactComponent as DashboardIcon } from './../../data/assets/dashboard-icon-29x29.svg';
import { ReactComponent as DashboardSelectedIcon } from './../../data/assets/dashboard-selected-icon-29x29.svg';
import { ReactComponent as GeneratorIcon } from './../../data/assets/generator-icon-24x26.svg';
import { ReactComponent as GeneratorSelectedIcon } from './../../data/assets/generator-selected-icon-24x24.svg';
import { ReactComponent as DocumentSetsIcon } from './../../data/assets/document-sets-icon-23x23.svg';
import { ReactComponent as DocumentSetsSelectedIcon } from './../../data/assets/document-sets-selected-icon-23x23.svg';
import { ReactComponent as FileDirectoryIcon } from './../../data/assets/file-directory-icon-29x27.svg';
import { ReactComponent as SubmissionsIcon } from './../../data/assets/submissions-icon-29x29.svg';
import { ReactComponent as SettingsIcon } from './../../data/assets/settings-icon-28x30.svg';
import { ReactComponent as AccountIcon } from './../../data/assets/account-icon-29x29.svg';
import { ReactComponent as SignOutIcon } from './../../data/assets/sign-out-icon-23x20.svg';
import { ReactComponent as AutoDraftProIcon } from './../../data/assets/autodraft-pro-icon-49x49.svg';
import clsx from 'clsx';
import styles from './SideMenu.module.css';

const linkData = [
  {
    id: 0,
    currIcon: <DashboardSelectedIcon />,
    icon: <DashboardIcon />,
    name: 'Dashboard',
    route: '/',
  },
  {
    id: 1,
    currIcon: <GeneratorSelectedIcon />,
    icon: <GeneratorIcon />,
    name: 'Generator',
    route: '/generator',
  },
  {
    id: 2,
    currIcon: <DocumentSetsSelectedIcon />,
    icon: <DocumentSetsIcon />,
    name: 'Document Sets',
    route: '/documents',
  },
  {
    id: 3,
    currIcon: <DashboardSelectedIcon />,
    icon: <FileDirectoryIcon />,
    name: 'File Directory',
    route: '/files',
  },
  {
    id: 4,
    currIcon: <DashboardSelectedIcon />,
    icon: <SubmissionsIcon />,
    name: 'Submissions',
    route: '/submissions',
  },
  {
    id: 5,
    currIcon: <DashboardSelectedIcon />,
    icon: <SettingsIcon />,
    name: 'Settings',
    route: '/settings',
  },
  {
    id: 6,
    currIcon: <DashboardSelectedIcon />,
    icon: <AccountIcon />,
    name: 'Account',
    route: '/account',
  },
  {
    id: 7,
    currIcon: <DashboardSelectedIcon />,
    icon: <SignOutIcon />,
    name: 'Sign Out',
    // route: '/exit',
    route: '/login',
  },
];

const AppTitle = () => {
  return (
    <div className={styles.appTitleContainer}>
      <AutoDraftLogo className={styles.logoIconContainer} />
      <h2 className={clsx(styles.appTitle, styles.textContainer)}>AutoDraft</h2>
    </div>
  );
};

const NavigationLink = ({
  icon,
  linkName,
  route,
  currentRoute,
}: {
  icon: ReactElement;
  linkName: string;
  route: string;
  currentRoute: boolean;
}) => {
  return (
    <Link
      className={
        currentRoute ? styles.currNavLinkContainer : styles.navLinkContainer
      }
      to={route}
    >
      <div
        className={
          currentRoute ? styles.currNavIconContainer : styles.navIconContainer
        }
      >
        {icon}
      </div>
      <div
        className={
          currentRoute
            ? clsx(styles.currNavLink, styles.textContainer)
            : clsx(styles.navLink, styles.textContainer)
        }
      >
        <p>{linkName}</p>
      </div>
    </Link>
  );
};

function checkNestedRoute(route: string) {
  if (route == '/submissions') {
    return '/generator';
  } else {
    return route;
  }
}

const NavigationLinks = ({ route }: { route: string }) => {
  route = checkNestedRoute(route);
  return (
    <nav className={styles.navLinksContainer}>
      {linkData.map((link) => {
        return (
          <NavigationLink
            key={link.id}
            icon={route == link.route ? link.currIcon : link.icon}
            linkName={link.name}
            route={link.route}
            currentRoute={Boolean(link.route == route)}
          />
        );
      })}
    </nav>
  );
};

const AutoDraftProCTA = () => {
  return (
    <div className={styles.proCtaContainer}>
      <AutoDraftProIcon className={styles.ctaIcon} />
      <h2 className={styles.ctaTitle}>AutoDraft Pro</h2>
      <p className={styles.ctaDescription}>
        Get access to all features on AutoDraft
      </p>
      <button className={styles.ctaButton}>Get Pro</button>
    </div>
  );
};

const SideMenu = () => {
  let currRoute: string = useLocation().pathname;
  return (
    <div className={styles.sideMenu}>
      <AppTitle />
      <NavigationLinks route={currRoute} />
      <AutoDraftProCTA />
    </div>
  );
};

export default SideMenu;
