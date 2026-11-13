import { useState, useEffect, SetStateAction } from 'react';
import { useLocation } from 'react-router';
import { IconContext } from 'react-icons';
import {
  BsHouseDoorFill,
  BsFileEarmarkFill,
  BsPersonFill,
  BsFolderFill,
  BsThreeDots,
} from 'react-icons/bs';

import NavigationBar from './NavigationBar';
import './Header.css';

const routeData: { [key: string]: { icon: any; title: string } } = {
  '/': { icon: <BsHouseDoorFill />, title: 'Dashboard' },
  '/templates': { icon: <BsFileEarmarkFill />, title: 'Document Selection' },
  '/fields': {
    icon: <BsFileEarmarkFill />,
    title: 'Document Fields',
  },
  '/user': { icon: <BsPersonFill />, title: 'User Profile' },
  '/directory': { icon: <BsFolderFill />, title: 'File Directory' },
};

const Header = ({
  amount,
  search,
  setSearch,
  btnLabel,
}: {
  amount: string;
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
  btnLabel: string;
}) => {
  // let [search, setSearch] = useState<string>('');
  let route: string = useLocation().pathname;
  let curRoute = routeData[route];

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.currentTarget.value);
  }

  // useEffect(() => {
  //   const timeOutId = setTimeout(() => setSearch(search), 500);
  //   return () => clearTimeout(timeOutId);
  // }, [search]);
  console.log(btnLabel);
  return (
    <div className="headerContainer">
      {/* Flexbox #1 - Container */}
      <div className="headerTitleContainer">
        <IconContext.Provider
          value={{
            color: '#ffffff',
            size: '3em',
          }}
        >
          {curRoute.icon}
        </IconContext.Provider>
        <h1 className="pageTitle">{curRoute.title}</h1>
      </div>
      <hr className="headerDivider" />
      {/* Flexbox #1 - Container */}
      <div className="headerToolsContainer">
        {/* Flexbox #1 - Navigation */}
        <div className="navigation">
          <NavigationBar route={route} />
        </div>
        {/* Flexbox #1 - Tools/Options */}
        <div className="tools">
          <p className="amount">{amount}</p>
          {route == '/fields' ? (
            <IconContext.Provider value={{ color: '#ffffff', size: '2.5em' }}>
              <BsThreeDots className="submissionOptions" />
            </IconContext.Provider>
          ) : (
            <input
              type="text"
              name="search"
              className="search"
              value={search}
              onChange={(e) => handleSearch(e)}
              placeholder="Search"
            />
          )}
          <button className="headerButton">
            <span className="nowrap">{btnLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
