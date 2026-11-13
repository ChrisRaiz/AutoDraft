// import { IconContext } from 'react-icons';
// import { BsCheckCircleFill, BsThreeDots } from 'react-icons/bs';
// import { Link } from 'react-router-dom';
// import { useOutletContext } from 'react-router-dom';
// import '../renderer/App.css';

// const Templates = () => {
//   const { documents }: { documents: string[] } = useOutletContext();

//   const documentIds: {
//     [key: string]: {
//       formId: string;
//       formName: string;
//       formPath: string;
//       formConditionalPaths: {
//         [key: string]: {
//           path: string;
//           isApplicable: boolean;
//           evaluation: 'all' | 'any';
//           conditions: { field: string; satisfier: string }[];
//           // checkConditions: (field: boolean) => void;
//         };
//       };
//     };
//   } = {
//     will: {
//       formId: '241635427317052',
//       formName: 'will',
//       formPath: './src/data/templates/wills/Will Documents.docx',
//       formConditionalPaths: {
//         shortTermGuardianship: {
//           path: './src/data/templates/wills/Short-Term Guardian.docx',
//           isApplicable: false,
//           evaluation: 'any',
//           conditions: [
//             { field: 'Child 1 | Under 18?', satisfier: 'yes' },
//             { field: 'Child 2 | Under 18?', satisfier: 'yes' },
//             { field: 'Child 3 | Under 18?', satisfier: 'yes' },
//             { field: 'Child 4 | Under 18?', satisfier: 'yes' },
//             { field: 'Child 5 | Under 18?', satisfier: 'yes' },
//             { field: 'Child 6 | Under 18?', satisfier: 'yes' },
//             { field: 'Child 7 | Under 18?', satisfier: 'yes' },
//             { field: 'Child 8 | Under 18?', satisfier: 'yes' },
//           ],
//           // checkConditions: function (fieldValue: boolean) {
//           //   for(const field of this.conditions) {
//           //     if (field) {
//           //       this.isApplicable = !this.isApplicable;
//           //       break;
//           //     }
//           //   }
//           // },
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       {documents
//         ? documents.map((doc: string, index: number) => {
//             return (
//               <div className="listItemContainer" key={index}>
//                 <div className="listItemContent">
//                   <div className="listItemTitle">
//                     <IconContext.Provider
//                       value={{ color: '#50C878', size: '1.5em' }}
//                     >
//                       <BsCheckCircleFill />
//                     </IconContext.Provider>
//                     <li>{doc}</li>
//                   </div>
//                   <div className="listItemButtons">
//                     <button className="optionsButton">
//                       <IconContext.Provider
//                         value={{ color: '#ffffff', size: '1em' }}
//                       >
//                         <BsThreeDots />
//                       </IconContext.Provider>
//                     </button>
//                     <Link to={'/fields'} state={documentIds.will}>
//                       <button className="generateButton">&gt;</button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         : null}
//     </div>
//   );
// };

// export default Templates;
