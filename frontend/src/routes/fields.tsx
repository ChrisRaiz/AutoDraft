// import { MouseEvent, useEffect, useState, useRef } from 'react';
// import {
//   getFormSubmissions,
//   getFormQuestions,
//   postSubmission,
//   deleteSubmission,
// } from '@/data/connections/jotform';
// import {
//   detectPatches,
//   patchDocument,
//   getDocumentFields,
//   postDocumentFields,
// } from '@/data/ipc/messages';
// import { IconContext } from 'react-icons';
// import { BsDatabaseFillCheck } from 'react-icons/bs';
// import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';
// import { useLocation } from 'react-router-dom';
// import '../renderer/App.css';
// import Collapsible from '@/components/Collapsible';
// import { TextRun, IPatch } from 'docx';
// import mongoose from 'mongoose';
// import {
//   IJotformFetchSubmission,
//   IDocumentFetchFields,
//   IFillableFields,
//   IDetectDocumentPatches,
//   TSubmissionCache,
// } from '@/types/fields.types';

// async function getDocFieldsTest(name: string): Promise<IDocumentFetchFields> {
//   let result: undefined | IDocumentFetchFields;

//   await getDocumentFields(name).then(
//     (res: IDocumentFetchFields) => (
//       console.log('getDocFieldsTest - res:', res), (result = res)
//     ),
//   );

//   if (!result) {
//     throw new Error('getDocFieldsTest is returning undefined!');
//   }

//   return result;
// }

// //TODO - Interfaces/Types for some functions still need to be created
// const Fields = () => {
//   //TODO Figure out which of these variables are required
//   const [submissions, setSubmissions] = useState<any>();
//   // const [clientChildren, setClientChildren] = useState<any>();
//   // const [questions, setQuestions] = useState<any>();
//   // const [activeData, setActiveData] = useState<string[]>([]);
//   // const [filled, setFilled] = useState<{ [key: string]: Boolean }>();
//   const [prevActive, setPrevActive] = useState<[string | null, string | null]>([
//     null,
//     null,
//   ]);
//   const [selected, setSelected] = useState<Map<string, Set<string>>>(
//     () => new Map(),
//   );
//   const [subFieldKeys, setSubFieldKeys] = useState<[string, string][]>();
//   const [emptyConditionalFields, setEmptyConditionalFields] = useState<{
//     [document: string]: {
//       staticFields: Map<string, string>;
//       dynamicFields: Map<string, string>;
//     };
//   }>();

//   //? Reconfigured Variables
//   const { state } = useLocation();
//   const { formId, formName, formPath, formConditionalPaths } = state;
//   const [fields, setFields] = useState<Map<string, string>>(() => new Map());
//   const [emptyFields, setEmptyFields] = useState<{
//     [section: string]: Map<string, string>;
//   }>();
//   const [fillableFields, setFillableFields] = useState<
//     undefined | IFillableFields
//   >();
//   const [clients, setClients] = useState<
//     Map<string, [string, number, string, string][]>
//   >(() => new Map());
//   const [active, setActive] = useState<[string, string] | null>(null);

//   //TODO Updates a submission in Jotform's db to match the submission in the submissionCache
//   function updateSubmission() {
//     if (!subFieldKeys || !fields) {
//       console.warn(
//         'Failed to update submission due to empty fields or empty submission selection',
//       );
//     } else {
//       const updatedFields: { [key: string]: string } = {};

//       for (const field of subFieldKeys) {
//         if (field[0] !== undefined && field[1] !== undefined) {
//           if (fields.has(field[1])) {
//             updatedFields[field[1]] = fields.get(field[1])!;
//           }
//         }
//       }
//       if (active) postSubmission(active[1]!, updatedFields);
//     }
//   }

//   //TODO - Make the logic to execute the IPC (IPC already made)
//   function handleDeleteActiveSubmission() {}

//   //? Fetch the document data to render the fields
//   if (!fillableFields) {
//     getDocFieldsTest(formName).then(
//       (res: IDocumentFetchFields) => (
//         console.log('res._doc:', res._doc), setFillableFields(res._doc)
//       ),
//     );
//   }

//   //? (Cache) If not exists, add a new item every time a submission is selected
//   const submissionCache = useRef<TSubmissionCache>(new Map());

//   //? Adds a submission to the selected data set
//   function addSubmission(client: string, id: string) {
//     console.log(`Adding ${client} to selected`);
//     setSelected((prev: Map<string, Set<string>>) => {
//       const next = new Map(prev);
//       const ids = next.get(client);

//       if (!submissionCache.current.has(id)) {
//         getFormSubmissions(formId, id).then(
//           (res: IJotformFetchSubmission | undefined) => getFieldData(res),
//         );
//       }

//       if (ids) {
//         if (!ids.has(id) && submissionCache.current.has(id)) {
//           ids.add(id);
//           next.set(client, ids);
//         } else {
//           console.warn(`${id} already exists in ${client}'s id set`);
//         }
//       } else {
//         const set: Set<string> = new Set();
//         set.add(id);
//         next.set(client, set);
//       }

//       return next;
//     });
//   }

//   //? Removes a submission to the selected data set
//   function removeSubmission(client: string, id: string) {
//     setSelected((prev: Map<string, Set<string>>) => {
//       const next = new Map(prev);
//       const ids = next.get(client);

//       if (ids) {
//         if (ids.size == 1 && ids.has(id)) {
//           next.delete(client);
//         } else if (ids.size > 1 && ids.has(id)) {
//           ids.delete(id);
//           next.set(client, ids);
//         } else {
//           console.warn(`${id} does not exist in ${client}'s id set`);
//         }
//       }

//       return next;
//     });
//   }

//   //? Updates the field-value for the corresponding submission in the submissionCache when a field is changed by the user
//   function handleFieldChange(field: string, value: string) {
//     setFields((prev: Map<string, string>) => {
//       const next = new Map(prev);
//       next.set(field, value);
//       return next;
//     });
//     if (active) {
//       submissionCache.current.get(active[1])?.fields.set(field, value);
//     } else {
//       throw new Error(
//         `Error occurred while attempting to update a field-value in the submissionCache.
//         Error possibly due to active being null or invalid types of arguments.\n
//         Executing function: handleFieldChange(field: string, value: string)\n
//         Arguments: field: ${field}, value${value}\n
//         Active: ${active}`,
//       );
//     }
//   }

//   //? Handles generating the document sets for all the selected submissions
//   async function handleGenerateSelectedDocuments() {
//     console.log('selected:', selected);
//     // Loop every client in the selected pool (key = name)
//     for (const submissions of selected.values()) {
//       // For every selected submission of the client, patch documents
//       submissions.forEach((submissionId) => {
//         const submissionData:
//           | {
//               fields: Map<string, string>;
//               conditionals: {
//                 [document: string]: {
//                   path: string;
//                   conditions: { field: string; satisfier: string }[];
//                   staticFields: Map<string, string>;
//                   dynamicFields: Map<string, string>;
//                 };
//               };
//             }
//           | undefined = submissionCache.current.get(submissionId);

//         console.log('submissionData:', submissionData);

//         if (!submissionData) {
//           throw new Error(`
//           Error occurred while attempting to generate selected documents.
//           Error most likely due to submissionCache not containing a submissionId's dataset.\n
//           Executing function: handleGenerateSelectedDocuments()\n
//           Submissions: ${submissions}\n
//           SubmissionId: ${submissionId}\n
//           SubmissionCache: ${submissionCache}\n
//           Target Submission: ${submissionCache.current.get(submissionId)} `);
//         }

//         try {
//           patchDocument(
//             formPath,
//             submissionData.fields,
//             submissionData.conditionals || null,
//           );
//         } catch (err) {
//           console.log(
//             `An error has occurred while patching documents for submission ${submissionId}}`,
//           );
//         }
//       });
//     }
//   }

//   //? This will be used when setting up the "Add Document" feature
//   async function createEmptyFields(): Promise<void> {
//     const fieldsMap: { [section: string]: Map<string, string> } = {
//       form: new Map(),
//       pre: new Map(),
//       contact: new Map(),
//     };
//     const conditionalsMap: {
//       [document: string]: {
//         path: string;
//         isApplicable: boolean;
//         evaluation: 'all' | 'any';
//         conditions: { field: string; satisfier: string }[];
//         staticFields: Map<string, string>;
//         dynamicFields: Map<string, string>;
//       };
//     } = {};

//     const fieldTypes = ['control_textbox', 'control_radio', 'control_spinner'];

//     await getFormQuestions('241635427317052')
//       .then((res: any) => {
//         if (!res) {
//           throw new Error('PromiseResult from getFormQuestions() is null');
//         }

//         JSON.parse(JSON.stringify(res), (key, value) => {
//           const fieldData = res.content[key];

//           if (
//             typeof value == 'object' &&
//             fieldTypes.includes(fieldData?.type) &&
//             !fieldData?.text.toLowerCase().includes('hidden')
//           ) {
//             const fieldName = fieldData.name;

//             if (fieldName[0] == 'f') {
//               fieldsMap.form.set(fieldData.qid, fieldData.text);
//             } else if (fieldName[0] == 'p') {
//               fieldsMap.pre.set(fieldData.qid, fieldData.text);
//             } else {
//               fieldsMap.contact.set(fieldData.qid, fieldData.text);
//             }
//           }
//         });
//       })
//       .catch((err) => {
//         throw new Error(`An error occurred during formQuestions(): ${err}`);
//       });

//     for (const document in formConditionalPaths) {
//       await detectPatches(formConditionalPaths[document].path)
//         .then((res: IDetectDocumentPatches) => {
//           console.log('RES:', res);
//           conditionalsMap[res.conditional] = {
//             // Variable value literals will be automated once "add document" feature is created
//             // Temporary Variables: path, isApplicable, evaluation, conditions
//             path: './src/data/templates/wills/Short-Term Guardian.docx',
//             isApplicable: false,
//             evaluation: 'any',
//             conditions: [
//               { field: 'Child 1 | Under 18?', satisfier: 'Yes' },
//               { field: 'Child 2 | Under 18?', satisfier: 'Yes' },
//               { field: 'Child 3 | Under 18?', satisfier: 'Yes' },
//               { field: 'Child 4 | Under 18?', satisfier: 'Yes' },
//               { field: 'Child 5 | Under 18?', satisfier: 'Yes' },
//               { field: 'Child 6 | Under 18?', satisfier: 'Yes' },
//               { field: 'Child 7 | Under 18?', satisfier: 'Yes' },
//               { field: 'Child 8 | Under 18?', satisfier: 'Yes' },
//             ],
//             staticFields: res.staticData,
//             dynamicFields: res.dynamicData,
//           };
//         })
//         .catch((err: Error) => console.log('ERR:', err));
//     }

//     console.log('fields.tsx - conditionalsMap:', conditionalsMap);
//     setEmptyFields(fieldsMap);
//     setEmptyConditionalFields(conditionalsMap);
//   }

//   //? This builds the field dataset from the submissionData argument
//   function getFieldData(submissionData: IJotformFetchSubmission | undefined) {
//     console.log('Submission Data:', submissionData);
//     // Occurs if submission data was deleted through Jotform or failure to fetch submission data.
//     if (!submissionData || !submissionData.content[0].answers)
//       throw new Error('Submission data is empty!');

//     // Occurs if the form (property) in the db does not exist, error probably occurred during POST for the document's fields.
//     if (!fillableFields?.fields) throw new Error('DB Fields data is empty!');

//     const fieldData: Map<string, string> = new Map();
//     const conditionData: {
//       [document: string]: {
//         path: string;
//         conditions: { field: string; satisfier: string }[];
//         staticFields: Map<string, string>;
//         dynamicFields: Map<string, string>;
//       };
//     } = {};

//     const submissionId: string = submissionData.content[0].id;
//     const answers: { [id: string]: { [property: string]: string } } =
//       submissionData.content[0].answers;

//     // Generate the current date so a check doesn't have to be made every iteration of the loop for date properties
//     const date: Date = new Date();
//     const year: number = date.getFullYear();
//     const month: number = date.getMonth() + 1;
//     const day: number = date.getDay();

//     // Reformats date to match other date formats (purely aesthetics)
//     let formattedMonth;
//     if (month < 10) formattedMonth = `0${month}`;
//     let formattedDay;
//     if (day < 10) formattedDay = `0${day}`;

//     // Formats the submission data for rendering and document patching efficiently by reducing loop iterations and
//     // checks by accessing the data by it's question id rather than parsing the JSON. This is more efficient due to
//     // non-field elements such as headings and dividers also being present in the JSON.
//     for (const [qid, question] of fillableFields.fields.form.entries()) {
//       if (answers[qid].text && answers[qid].answer) {
//         if (answers[qid].text !== question) {
//           throw new Error(
//             `Submission data question "${answers[qid].text}" does not match the expected question "${question}" at qid ${qid}.`,
//           );
//         }

//         fieldData.set(question, answers[qid].answer!);
//       }
//     }

//     // Sets the admin date key-value to the properly formatted date (current date)
//     fieldData.set(
//       'Admin | Date',
//       `${formattedMonth ? formattedMonth : month}-${formattedDay ? formattedDay : day}-${year}`,
//     );

//     // Check every conditional document if it applies based on submission data
//     for (const document in fillableFields.conditionals) {
//       const { path, evaluation, conditions, staticFields, dynamicFields } =
//         fillableFields.conditionals[document];
//       if (evaluation == 'any') {
//         for (const condition of conditions.values()) {
//           if (fieldData.get(condition.field) === condition.satisfier) {
//             conditionData[document] = {
//               path: path,
//               conditions: conditions,
//               staticFields: staticFields,
//               dynamicFields: dynamicFields,
//             };
//             break;
//           }
//         }
//       } else if (evaluation == 'all') {
//         let isApplicable = true;

//         for (const condition of conditions.values()) {
//           if (fieldData.get(condition.field) !== condition.satisfier) {
//             isApplicable = false;
//             break;
//           }
//         }

//         if (isApplicable)
//           conditionData[document] = {
//             path: path,
//             conditions: conditions,
//             staticFields: staticFields,
//             dynamicFields: dynamicFields,
//           };
//       }
//     }

//     submissionCache.current.set(submissionId, {
//       fields: fieldData,
//       conditionals: conditionData,
//     });

//     return fieldData;
//   }

//   //? This handles building the dataset for the active submission
//   useEffect(() => {
//     if (fillableFields && active && active !== prevActive) {
//       const cachedSubmission = submissionCache.current.get(active[1]);
//       // Use Cached Submission if available
//       if (cachedSubmission && cachedSubmission.fields) {
//         setFields(cachedSubmission.fields);
//       } else {
//         // Build submission dataset and set/cache it
//         getFormSubmissions(formId, active[1]).then(
//           (res: IJotformFetchSubmission | undefined) =>
//             setFields(getFieldData(res)),
//         );
//       }
//     }
//   }, [active]);

//   //? This handles building the dataset for the client submissions
//   useEffect(() => {
//     function getNames(data: any) {
//       // Values: name, id, submissionId, created_at
//       const names: Map<string, [string, number, string, string][]> = new Map();
//       for (const submission of data.content) {
//         const name: string = submission.answers[19].answer;
//         const submissionId: string = submission.id.toString();
//         const date = `${submission.created_at.slice(5, 10)}-${submission.created_at.slice(0, 4)}`;
//         if (names.has(name)) {
//           const prev = names.get(name);
//           prev?.push([name, prev.length, submissionId, date]);
//           names.set(name, prev!);
//         } else {
//           names.set(name, [[name, 0, submissionId, date]]);
//         }
//       }
//       return names;
//     }

//     if (!submissions) {
//       getFormSubmissions(formId).then(
//         (res) => (setSubmissions(res), setClients(getNames(res))),
//       );
//     }
//   }, []);

//   return (
//     <div className="fieldsContainer">
//       <div className="leftListsContainer">
//         <input
//           type="text"
//           name="search"
//           className="clientSearch"
//           placeholder="Search"
//         />
//         <div className="clientList">
//           {
//             <ul className="listContainer">
//               {[...clients.entries()].map((client) => (
//                 <Collapsible
//                   key={client[1][0][0]}
//                   open={false}
//                   header={client[0]}
//                 >
//                   {client[1].map((submission) => (
//                     <li
//                       key={submission![1]}
//                       className={
//                         active &&
//                         active[0] == submission[0] &&
//                         active[1] == submission[2]
//                           ? 'activeListItem'
//                           : 'listItem'
//                       }
//                       value={submission[0]}
//                       onClick={() => (
//                         setActive([submission[0], submission[2]]),
//                         active ? setPrevActive(active) : null
//                       )}
//                     >
//                       {submission[3]}
//                       <IconContext.Provider
//                         value={{
//                           color:
//                             selected.has(client[0]) &&
//                             selected.get(client[0])?.has(submission[2])
//                               ? '#ffffff'
//                               : '#ffffff50',
//                           size: '1.1em',
//                         }}
//                       >
//                         {selected.has(client[0]) &&
//                         selected.get(client[0])?.has(submission[2]) ? (
//                           <>
//                             <FaRegDotCircle
//                               className="selectedButton"
//                               onClick={(
//                                 event: React.MouseEvent<
//                                   SVGElement,
//                                   globalThis.MouseEvent
//                                 >,
//                               ) => (
//                                 active && active[0]
//                                   ? event.stopPropagation()
//                                   : null,
//                                 removeSubmission(client[0], submission[2])
//                               )}
//                             />
//                           </>
//                         ) : (
//                           <>
//                             <FaRegCircle
//                               className="selectedButton"
//                               onClick={(
//                                 event: React.MouseEvent<
//                                   SVGElement,
//                                   globalThis.MouseEvent
//                                 >,
//                               ) => (
//                                 active && active[0]
//                                   ? event.stopPropagation()
//                                   : null,
//                                 addSubmission(client[0], submission![2])
//                               )}
//                             />
//                           </>
//                         )}
//                       </IconContext.Provider>
//                     </li>
//                   ))}
//                 </Collapsible>
//               ))}
//             </ul>
//           }
//         </div>
//       </div>
//       <div className="rightListsContainer">
//         <div className="fieldsSubmissionTitleContainer">
//           <IconContext.Provider value={{ color: '#ffffff', size: '2.5em' }}>
//             <BsDatabaseFillCheck />
//           </IconContext.Provider>
//           <h2 className={'fieldsSubmissionTitle'}>
//             {active ? `${active[0]} | ${active[1]}` : 'Select a submission'}
//           </h2>
//         </div>
//         <div className="fieldsList">
//           <ul className="fieldsUL">
//             {[...fields.entries()].sort().map(([field, value]) => (
//               <li key={field} className="fieldListItem">
//                 <p className="fieldTitle">{field}</p>
//                 <input
//                   name={value}
//                   value={value}
//                   className="fieldInput"
//                   onChange={(e) =>
//                     handleFieldChange(field, e.currentTarget.value)
//                   }
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="console">
//           <button
//             onClick={() => (
//               console.clear(),
//               console.log('createEmptyFields:', createEmptyFields())
//             )}
//           >
//             Create Document Fields
//           </button>
//           <button onClick={() => console.log(emptyFields)}>
//             Log Empty Fields
//           </button>
//           <button onClick={() => console.log(emptyConditionalFields)}>
//             Log Empty Conditional Fields
//           </button>
//           <button
//             onClick={async () =>
//               postDocumentFields(formName, emptyFields, emptyConditionalFields)
//             }
//           >
//             Post Document Fields
//           </button>
//           <button onClick={() => handleGenerateSelectedDocuments()}>
//             Handle Generate Selected Documents
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Fields;

// //! Deprecated functions kept temporarily

// //! Old dataset builder for selected/active submission
// // function getSubmissionFields(
// //   data: any,
// // ): [Map<string, string>, { [condition: string]: boolean }] {
// //   // console.log('getSubmissionFields - data:', data);
// //   const filledFields: { [key: string]: Boolean } = {};
// //   const fieldsMap: Map<string, string> = new Map();
// //   const children: { [key: string]: boolean } = {};

// //   JSON.parse(JSON.stringify(data), (key, value) => {
// //     const filledRegex = /.*Fields Filled\??$/g;
// //     const childRegex = /^Child [1-8] \| Under 18\?$/g;
// //     const text = data.content[0].answers[key]?.text;
// //     const answer = data.content[0].answers[key]?.answer;
// //     // console.log(`getSubmissionFields | Key: ${key} | Value: ${value}`);
// //     if (typeof value == 'object' && answer) {
// //       if (answer?.month) {
// //         fieldsMap.set(text, `${answer.month}-${answer.day}-${answer.year}`);
// //       } else if (answer?.first) {
// //         fieldsMap.set(text, `${answer.first} ${answer.last}`);
// //       } else if (answer?.full) {
// //         fieldsMap.set(text, `${answer.full}`);
// //       } else if (answer?.addr_line1) {
// //         fieldsMap.set(
// //           text,
// //           `${answer.addr_line1} ${answer.city} ${answer.state}, ${answer.postal}`,
// //         );
// //       } else if (filledRegex.test(text)) {
// //         filledFields[text] = answer.toLowerCase() == 'true' ? true : false;
// //       } else if (childRegex.test(text)) {
// //         children[text] = answer.toLowerCase() == 'yes' ? true : false;
// //         fieldsMap.set(text, answer);
// //       } else {
// //         fieldsMap.set(text, answer);
// //       }
// //     }
// //   });

// //   return [fieldsMap, children];
// // }

// //! Old dataset builder for selected/active submission
// // useEffect(() => {
// //   function getFields(data: any) {
// //     // console.log(data);
// //     const filledFields: { [key: string]: Boolean } = {};
// //     const fieldsMap: Map<string, string> = new Map();
// //     const fieldKeys: [string, string][] = [];
// //     const children: { [key: number]: boolean } = {};
// //     const date = `${data.content[0].created_at.slice(5, 10)}-${data.content[0].created_at.slice(0, 4)}`;

// //     JSON.parse(JSON.stringify(data), (key, value) => {
// //       const filledRegex = /.*Fields Filled\??$/g;
// //       const childRegex = /^Child [1-8] \| Under 18\?$/g;
// //       const text = data.content[0].answers[key]?.text;
// //       const answer = data.content[0].answers[key]?.answer;
// //       // console.log(`useEffect - getFields | Key: ${key} | Value: ${value}`);

// //       if (/^\d{0,3}$/g.test(key)) {
// //         fieldKeys.push([key, data.content[0].answers[key]?.text]);
// //       }
// //       if (typeof value == 'object' && answer) {
// //         if (answer?.month) {
// //           fieldsMap.set(text, `${answer.month}-${answer.day}-${answer.year}`);
// //         } else if (answer?.first) {
// //           fieldsMap.set(text, `${answer.first} ${answer.last}`);
// //         } else if (answer?.full) {
// //           fieldsMap.set(text, `${answer.full}`);
// //         } else if (answer?.addr_line1) {
// //           fieldsMap.set(
// //             text,
// //             `${answer.addr_line1} ${answer.city} ${answer.state}, ${answer.postal}`,
// //           );
// //         } else if (filledRegex.test(text)) {
// //           filledFields[text] = answer.toLowerCase() == 'true' ? true : false;
// //         } else if (childRegex.test(text)) {
// //           children[text] = answer.toLowerCase() == 'yes' ? true : false;
// //           fieldsMap.set(text, answer);
// //         } else {
// //           fieldsMap.set(text, answer);
// //         }
// //       }
// //     });

// //     setClientChildren(children);
// //     setSubFieldKeys(fieldKeys);
// //     setFilled(filledFields);

// //     if (active[0]) {
// //       setActiveData([active[0], date]);
// //     }

// //     return fieldsMap;
// //   }

// //   if (active[1] && active !== prevActive) {
// //     getFormSubmissions(formId, active[1]).then((res) =>
// //       setFields(getFields(res)),
// //     );
// //   }
// // }, [active]);
