import { useState } from 'react';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { RiHomeFill } from 'react-icons/ri';
import {
  BsHouseDoorFill,
  BsFileEarmarkFill,
  BsPersonFill,
  BsFolderFill,
  BsCloudSunFill,
  BsCloudMoonFill,
  BsGearFill,
} from 'react-icons/bs';
import { MdSettings } from 'react-icons/md';
import { useLocation } from 'react-router';

const icons = [
  { icon: <BsHouseDoorFill />, routeTo: '/', size: '2.4em' },
  { icon: <BsFileEarmarkFill />, routeTo: '/templates', size: '2.1em' },
  { icon: <BsPersonFill />, routeTo: '/user', size: '2.4em' },
  {
    icon: <BsFolderFill style={{ marginTop: 3 }} />,
    routeTo: '/directory',
    size: '2.1em',
  },
];

const NavigationIcon = ({
  icon,
  route,
  routeTo,
  size,
}: {
  icon: any;
  route: string;
  routeTo: string;
  size: string;
}) => {
  return (
    <IconContext.Provider
      value={{
        color: route == routeTo ? '#ffffff' : '#666666',
        size: size,
      }}
    >
      <Link to={routeTo}>{icon}</Link>
    </IconContext.Provider>
  );
};

const NavigationBar = ({ route }: { route: string }) => {
  return (
    <div className="navigationContainer">
      {icons.map(({ icon, routeTo, size }, index) => {
        return (
          <NavigationIcon
            key={index}
            icon={icon}
            routeTo={routeTo}
            size={size}
            route={route}
          />
        );
      })}
      <div className="verticalLine" />
      <IconContext.Provider value={{ color: '#666666', size: '2.2em' }}>
        <BsCloudSunFill style={{ marginBottom: 5 }} />
      </IconContext.Provider>
      <IconContext.Provider value={{ color: '#666666', size: '2.2em' }}>
        <MdSettings />
      </IconContext.Provider>
    </div>
  );
};

export default NavigationBar;
