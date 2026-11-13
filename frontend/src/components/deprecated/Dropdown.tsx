// // import { IconContext } from 'react-icons';
// // import { BsChevronDown } from 'react-icons/bs';
// // import './Dropdown.css';

// // const Dropdown = ({ items }: { items: any[] }) => {
// //   return (
// //     <div className="dropdownContainer">
// //       <label className="label">Assign user(s) to as task:</label>

// //       <button className="button">
// //         <span className="span">
// //           <IconContext.Provider
// //             value={{
// //               color: '#635FC7',
// //               size: '1.5em',
// //             }}
// //           >
// //             <BsChevronDown />
// //           </IconContext.Provider>
// //         </span>
// //         {
// //           <div className="dropdownBox">
// //             <ul className="listContainer">
// //               {items.map((item, index) => (
// //                 <li key={index} className={`listItem`}>
// //                   <span>{item.name}</span>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         }
// //       </button>
// //     </div>
// //   );
// // };

// // export default Dropdown;

// import { useState, cloneElement, ReactElement } from 'react';

// // const App = () => {
// // const handleMenuOne = () => {
// //   console.log('clicked one');
// // };

// // const handleMenuTwo = () => {
// //   console.log('clicked two');
// // };

// //   return (
// //     <Dropdown
// //       trigger={<button>Dropdown</button>}
// //       menu={[
// //         <button onClick={handleMenuOne}>Menu 1</button>,
// //         <button onClick={handleMenuTwo}>Menu 2</button>,
// //       ]}
// //     />
// //   );
// // };

// const Dropdown = ({
//   trigger,
//   menu,
// }: {
//   trigger: ReactElement;
//   menu: ReactElement[];
// }) => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(!open);
//   };

//   return (
//     <div className="dropdown">
//       {cloneElement(trigger, {
//         onClick: handleOpen,
//       })}
//       {open ? (
//         <ul className="menu">
//           {menu.map((menuItem, index) => (
//             <li key={index} className="menu-item">
//               {cloneElement(menuItem, {
//                 onClick: () => {
//                   menuItem.props.onClick();
//                   setOpen(false);
//                 },
//               })}
//             </li>
//           ))}
//         </ul>
//       ) : null}
//     </div>
//   );
// };

// export default Dropdown;
