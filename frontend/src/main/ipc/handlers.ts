import * as fs from 'fs';
import axios from 'axios';
import path from 'path';
import { IpcMainInvokeEvent, app, dialog } from 'electron';
import { BrowserWindow, IpcMainEvent, ipcMain } from 'electron';
import { IPatch, patchDocument, TextRun } from 'docx';
import { mainWindow } from '../main';
import { IPC_ACTIONS } from './actions';
import dotenv from 'dotenv';
// import { postDocumentFields, getDocumentFields } from '../mongoDB/db';
import WordExtractor from 'word-extractor';

const {
  AUTHENTICATE_CREDENTIALS,
  CHECK_USER_EMAIL_AVAILABLE,
  CHECK_TEAM_NAME_AVAILABLE,
  CREATE_ACCOUNT,
  DETECT_PATCHES,
  PATCH_DOCUMENT,
  OPEN_FILE_BROWSER,
  GET_DOCUMENT_LIST,
  GET_JOTFORM_KEY,
  GET_DOCUMENT_FIELDS,
  POST_DOCUMENT_FIELDS,
  ON_SCAN_PROGRESS,
  REMOVE_PROGRESS_LISTENER,
} = IPC_ACTIONS.Window;

const downloadPath = app.getPath('downloads');
const appPath = app.getAppPath();

// ? Read a document and return fields
const handleDetectPatches = async (
  event: IpcMainInvokeEvent,
  files: IFile[],
): Promise<IFileData[]> => {
  const WordExtractor = require('word-extractor');
  const extractor: WordExtractor = new WordExtractor();
  const fieldRegex: RegExp = // {{Category | Field }}
    /\{\{[a-zA-Z1-9]+(?: [a-zA-Z1-9]+)*(?: (?:[a-zA-Z1-9]|\*))? \| [a-zA-Z1-9]+(?: [a-zA-Z1-9]+)*\}\}/g;
  const filesData: IFileData[] = [];
  const totalFiles: number = files.length;
  const startTime = Date.now();

  for (let i = 0; i < files.length; i++) {
    const file: IFile = files[i];
    const staticFields: Map<string, string> = new Map();
    const dynamicFields: Map<string, string> = new Map();
    let conditional: string | string[] = file.path.split(/[/.]/);
    conditional = conditional[conditional.length - 2];

    event.sender.send(ON_SCAN_PROGRESS, {
      currentFile: {
        name: file.name,
        index: i + 1,
      },
      totalFiles: totalFiles,
      percentage: Math.round((i / totalFiles) * 100),
      elapsedMs: Date.now() - startTime,
      status: 'Scanning for detectable fields',
    });

    await extractor
      .extract(file.path)
      .then((doc) => {
        const docFields = new Set(doc.getBody().match(fieldRegex));

        for (const field of docFields) {
          // Removes {{}} to match with fieldData keys
          const formattedField = field.slice(2, -2);

          // The first check is for large documents that may contain many duplicate fields since "indexOf('*')" has a
          // time complexity of O(n); trading off slower execution for small documents or no duplicate fields
          if (
            staticFields.has(formattedField) ||
            dynamicFields.has(formattedField)
          ) {
            continue;
          } else if (field.indexOf('*') >= 1) {
            dynamicFields.set(formattedField, '');
          } else {
            staticFields.set(formattedField, '');
          }
        }
      })
      .catch((err) => {
        throw new Error(
          `An error occurred while extracting field data from path (${file.path})\n${err}`,
        );
      });
    console.log(`Pushing ${file.name} data into filesData array!`);
    console.table({
      ...file,
      fields: {
        conditional: conditional,
        static: staticFields,
        dynamic: dynamicFields,
      },
    });

    filesData.push({
      ...file,
      fields: {
        conditional: conditional,
        static: staticFields,
        dynamic: dynamicFields,
      },
    });

    event.sender.send(ON_SCAN_PROGRESS, {
      currentFile: { name: file.name, index: i + 1 },
      totalFiles,
      percentage: Math.round(((i + 1) / totalFiles) * 100),
      elapsedMs: Date.now() - startTime,
      status:
        i + 1 === totalFiles ? 'Scan complete' : 'Scanning for detectable fields',
    });

    // Pause so each file's progress is visible in the Scan modal
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
  return filesData;
};
// const handleDetectPatches = async (event: IpcMainInvokeEvent, path: string) => {
//   let conditional: string | string[] = path.split(/[/.]/);
//   conditional = conditional[conditional.length - 2];

//   const WordExtractor = require('word-extractor');
//   const extractor: WordExtractor = new WordExtractor();
//   const fieldRegex: RegExp = // {{Category | Field }}
//     /\{\{[a-zA-Z1-9]+(?: [a-zA-Z1-9]+)*(?: (?:[a-zA-Z1-9]|\*))? \| [a-zA-Z1-9]+(?: [a-zA-Z1-9]+)*\}\}/g;
//   const staticData: Map<string, string> = new Map();
//   const dynamicData: Map<string, string> = new Map();

//   event.sender.send('scan-documents-progress', {

//   })
//   await extractor
//     .extract(path)
//     .then((doc) => {
//       console.log('doc:', doc);
//       const docFields = new Set(doc.getBody().match(fieldRegex));
//       console.log(
//         'strict regex test:',
//         '{{Civil Litigation | Field 3}}'.match(fieldRegex),
//       );
//       console.log({ docFields });
//       for (const field of docFields) {
//         // Removes {{}} to match with fieldData keys
//         const formattedField = field.slice(2, -2);

//         // The first check is for large documents that may contain many duplicate fields since "indexOf('*')" has a
//         // time complexity of O(n); trading off slower execution for small documents or no duplicate fields
//         if (staticData.has(formattedField) || dynamicData.has(formattedField)) {
//           continue;
//         } else if (field.indexOf('*') >= 1) {
//           dynamicData.set(formattedField, '');
//         } else {
//           staticData.set(formattedField, '');
//         }
//       }
//     })
//     .catch((err) => {
//       throw new Error(
//         `An error occurred while extracting field data from path (${path})\n${err}`,
//       );
//     });
//   console.log({
//     [conditional]: { staticFields: staticData, dynamicFields: dynamicData },
//   });
//   // return {
//   //   [conditional]: { staticFields: staticData, dynamicFields: dynamicData },
//   // };
//   return { conditional, staticData, dynamicData };
// };

// ? Patch documents
const handlePatchDocument = async (
  event: IpcMainEvent,
  path: string,
  data: Map<string, string>,
  conditionals?: {
    [document: string]: {
      path: string;
      conditions: { field: string; satisfier: string }[];
      staticFields: { [field: string]: string };
      dynamicFields: { [field: string]: string };
    };
  } | null,
) => {
  const webContent: IpcMainEvent['sender'] = event?.sender;
  const window: Electron.BrowserWindow | null =
    BrowserWindow.fromWebContents(webContent);

  // if (conditions) {
  //   console.log('CONDITIONS NOT EMPTY');
  //   for (const document in conditions) {
  //     await patchConditionalDocuments(conditions[document]);
  //   }
  // }
  // console.log('handlePatchDocument() - data argument:', data);
  // const conditionalData: Map<string, string[]> = createConditionData();
  // const conditionalPatchData: Map<string, string>[] = await readDocx(
  //   './src/data/templates/wills/Short-Term Guardian.docx',
  //   conditionalData,
  //   data,
  // );

  // function createConditionData() {
  //   const conditionData: Map<string, string[]> = new Map();
  //   for (const path in conditions) {
  //     for (const condition in conditions[path]) {
  //       if (conditions[path][condition]) {
  //         const key: string = condition.split(/[1-9]/g)[0].trim();
  //         const value: string[] | null = /[1-9]/g.exec(condition);
  //         const prev: string[] = conditionData.get(key) || [];

  //         if (value) {
  //           prev.push(value[0]);
  //         } else {
  //           throw new Error(
  //             `ERROR: Occurred during createConditionData(), an invalid condition argument was passed to ipc(handlePatchDocument()). Condition value for condition ${condition} is null when it should be a string.`,
  //           );
  //         }

  //         conditionData.set(key, prev);
  //       }
  //     }
  //   }
  //   return conditionData;
  // }

  // ? Create the core patches data set for the core documents
  async function createCorePatches(
    coreData: Map<string, string>,
    highlight: 'yellow' | 'none' = 'none',
  ) {
    if (!coreData)
      throw new Error('Data argument is empty for fn createCorePatches()');

    const corePatches: Record<string, IPatch> = {};

    for (const [field, value] of coreData) {
      corePatches[field] = {
        type: 'paragraph',
        children: [new TextRun({ text: value, highlight: highlight })],
      };
    }
    console.log('createCorePatches() - corePatches:', corePatches);
    return corePatches;
  }

  // ? Patches the core documents
  function patchCoreDocuments(
    corePatches: Record<string, IPatch>,
    path: string,
  ) {
    patchDocument({
      outputType: 'nodebuffer',
      keepOriginalStyles: true,
      data: fs.readFileSync(path),
      patches: corePatches,
    }).then((doc) => {
      let i = 1;
      let path = downloadPath + '/Patched Document.docx';

      // Rewrites file name in case of file name already taken
      while (fs.existsSync(path)) {
        path = downloadPath + `/temp-core-document(${i}).docx`;
        i++;
      }

      fs.writeFileSync(path, doc);
      // fs.writeFileSync('./src/data/temp/temp-core-document.docx', doc);
    });
  }

  // ? Create the dynamic fields data set for a single conditional document
  function createDynamicData(
    conditions: { field: string; satisfier: string }[],
    dynamicFields: { [field: string]: string },
  ): { [field: string]: string }[] {
    const dynamicData: { [field: string]: string }[] = [];
    let i = 0;
    for (const condition of conditions) {
      if (data.get(condition.field) === condition.satisfier) {
        let dynamicValue: string | undefined = condition.field
          .split('|', 1)[0] // Get the Section string
          .trim() // Clear whitespace
          .split(' ') // Split the Section string section and value
          .at(-1); // Get the Section value

        if (!dynamicValue) {
          throw new Error(`
              Error occurred while attempting to hydrate conditional dynamic fields in the handlePatchDocument() ipc handler.
              Error most likely due to the dynamicValue variable being undefined/null. Variable data is a substring of condition.field found via string/array methods\n
              Executing function: hydrateConditionalFields(conditionalData)\n
              dynamicValue: ${dynamicValue}
              condition.field: ${condition.field}`);
        }

        for (const field in dynamicFields) {
          const fieldKey = field.replace('*', dynamicValue);
          const fieldValue = data.get(fieldKey);
          if (fieldValue) {
            if (dynamicData[i]) {
              dynamicData[i][field] = fieldValue;
            } else {
              let dynamicFieldData: { [field: string]: string } = {};
              dynamicFieldData[field] = fieldValue;
              dynamicData.push(dynamicFieldData);
            }
          } else {
            throw new Error('fieldValue is undefined or null');
          }
        }
        i += 1;
      }
    }
    console.log('createDynamicFields() - dynamicData:', dynamicData);
    return dynamicData;
  }

  // ? Create the conditional patches static data set for a single conditional document
  // ? Dynamic data is added to the patches separately due to frequently changing fieldValues
  function createConditionalPatches(
    staticData: { [field: string]: string },
    highlight: 'yellow' | 'none' = 'none',
  ): Record<string, IPatch> {
    const conditionalPatches: Record<string, IPatch> = {};

    for (const fieldKey in staticData) {
      const fieldValue = staticData[fieldKey];

      conditionalPatches[fieldKey] = {
        type: 'paragraph',
        children: [new TextRun({ text: fieldValue, highlight: highlight })],
      };
    }
    console.log(
      'createConditionalPatches() - conditionalPatches:',
      conditionalPatches,
    );
    return conditionalPatches;
  }

  // ? Patches a singular conditional document for every dataset usable by dynamicFields
  async function patchConditionalDocuments(
    documentName: string,
    conditionalData: {
      path: string;
      conditions: { field: string; satisfier: string }[];
      staticFields: { [field: string]: string };
      dynamicFields: { [field: string]: string };
    },
    highlight: 'yellow' | 'none' = 'none',
  ) {
    const conditionalPatches: Record<string, IPatch> = createConditionalPatches(
      conditionalData.staticFields,
      'yellow',
    );

    const dynamicData: { [field: string]: string }[] = createDynamicData(
      conditionalData.conditions,
      conditionalData.dynamicFields,
    );

    // Loop every dynamic data set to produce the corresponding conditional document for each
    for (const dynamicDataSet of dynamicData) {
      // Loop every dynamic field in the conditional document to input the dynamicDataSet values
      for (const fieldKey in conditionalData.dynamicFields) {
        const fieldValue = dynamicDataSet[fieldKey];

        conditionalPatches[fieldKey] = {
          type: 'paragraph',
          children: [new TextRun({ text: fieldValue, highlight: highlight })],
        };
      }

      // Generate the patched document for the current dynamicDataSet
      // Temp documents are numbered for the order to merge them in
      await patchDocument({
        outputType: 'nodebuffer',
        keepOriginalStyles: true,
        data: fs.readFileSync(conditionalData.path),
        patches: conditionalPatches,
      })
        .then((doc) => {
          let i = 1;
          let path = `./src/data/temp/temp-conditional-${documentName}-document-${i}.docx`;

          // Rewrites file name to properly order the documents
          while (fs.existsSync(path)) {
            i++;
            path = `./src/data/temp/temp-conditional-${documentName}-document-${i}.docx`;
          }

          fs.writeFileSync(path, doc);
        })
        .catch((err) => console.log(err));
    }
  }

  // ? Merge all the patched documents in the temp directory
  function mergePatchedDocuments() {
    const fs = require('fs');

    const DocxMerger = require('docx-merger');

    const files = [
      fs.readFileSync(
        '/Users/chris/Documents/GitHub/Document-Generator/frontend/src/data/temp/temp-core-document.docx',
      ),
      // fs.readFileSync(
      //   '/Users/chris/Documents/GitHub/Document-Generator/frontend/src/data/temp/temp-conditional-Short-Term Guardian-document-1.docx',
      // ),
    ];

    fs.readdirSync(appPath + '/src/data/temp').forEach((fileName: string) => {
      if (fileName.includes('temp-conditional')) files.push(fileName);
    });

    console.log('files:', files);

    const docxMerger = new DocxMerger({}, files);

    docxMerger.save('nodebuffer', (data: any) => {
      fs.writeFileSync(
        '/Users/chris/Documents/GitHub/Document-Generator/frontend/src/data/temp/merged-core-conditional-documents.docx',
        data,
      );
    });
  }

  // ? Create Core Documents
  await createCorePatches(data, 'none').then((res) =>
    patchCoreDocuments(res, path),
  );

  // for (const document in conditionals) {
  //   const conditions = conditionals[document].conditions;
  //   const dynamicFields = conditionals[document].dynamicFields;
  //   const staticFields = conditionals[document].staticFields;
  //   const dynamicData = createDynamicData(conditions, dynamicFields);
  //   createConditionalPatches(staticFields, 'yellow');
  // }

  // ? Create Conditional Documents
  for (const document in conditionals) {
    patchConditionalDocuments(document, conditionals[document], 'yellow');
  }

  // ? Merge Core & Conditional Documents
  // mergePatchedDocuments();
};

const handleGetDocumentList = () => {
  const files: string[] = [];
  console.log(appPath);
  fs.readdirSync(appPath + '/src/data/templates').forEach((file) => {
    let fileName = file.split('.')[0];
    files.push(fileName);
  });
  console.log(`files: ${files}`);
  return files;
};

const handleGetJotFormKey = () => {
  dotenv.config();
  return process.env.JOTFORM_API_KEY;
};

// const handleGetDocumentFields = async (
//   event: IpcMainInvokeEvent,
//   docName: string,
// ) => {
//   let docFields;

//   await getDocumentFields(docName)
//     .then((res) => (docFields = res))
//     .catch((err) => console.error(err));

//   // console.log('handleGetDocumentFields - Document Fields:', docFields);

//   return docFields;
// };

// const handlePostDocumentFields = async (
//   event: IpcMainEvent,
//   docName: string,
//   docFields: { [section: string]: Map<string, string> },
//   docConditionals: {
//     [document: string]: {
//       path: string;
//       isApplicable: boolean;
//       evaluation: 'all' | 'any';
//       conditions: { field: string; satisfier: string }[];
//       staticFields: Map<string, string>;
//       dynamicFields: Map<string, string>;
//     };
//   },
// ) => {
//   await postDocumentFields(docName, docFields, docConditionals).catch((err) =>
//     console.error(err),
//   );
//   return `Successfully posted document fields for ${docName}`;
// };

// ? Open native file browser
const openFileBrowser = async (
  event: IpcMainInvokeEvent,
): Promise<{ path: string; name: string; size: number }[] | null> => {
  if (!mainWindow) return null;

  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    buttonLabel: 'Select',
    filters: [{ name: 'Documents', extensions: ['doc', 'docx'] }],
  });

  if (canceled) return null;

  const filesData = [];
  for (const filePath of filePaths) {
    console.log('filePath:', filePath);
    const fileName = path.basename(filePath);
    const fileSize = fs.statSync(filePath).size;
    filesData.push({
      path: filePath,
      name: fileName,
      size: fileSize,
    });
  }
  console.table(filesData);
  return filesData;
};

// ? Check if user email is available
const checkUserEmailAvailable = async (
  event: IpcMainInvokeEvent,
  email: string,
): Promise<{
  status: number;
  available: boolean | undefined;
  message?: string | Error;
}> => {
  if (!email)
    return {
      status: 400,
      available: undefined,
      message: 'Missing email value',
    };

  const config = {
    method: 'get',
    url: 'http://localhost:3000/api/user/check/email',
    data: {
      email: email,
    },
  };

  try {
    const res = await axios(config);

    return {
      status: res.status,
      available: res.data.available,
      message: res.data.message,
    };
  } catch (err: any) {
    return {
      status: 500,
      available: undefined,
      message: err,
    };
  }
};

// ? Check if team name is available
const checkTeamNameAvailable = async (
  event: IpcMainInvokeEvent,
  name: string,
): Promise<{
  status: number;
  available: boolean | undefined;
  message?: string | Error;
}> => {
  if (!name)
    return { status: 400, available: false, message: 'Missing name value' };

  const config = {
    method: 'get',
    url: 'http://localhost:3000/api/team/check/name',
    data: {
      name: name,
    },
  };

  try {
    const res = await axios(config);

    return {
      status: res.status,
      available: res.data.available,
      message: res.statusText,
    };
  } catch (err: any) {
    return {
      status: 500,
      available: undefined,
      message: err,
    };
  }
};

// ? Authenticate user credentials (Login)
const authenticateCredentials = async (
  event: IpcMainInvokeEvent,
  email: string,
  password: string,
): Promise<{
  status: number;
  authenticated: boolean;
  message?: string | Error;
}> => {
  if (!email || !password)
    return {
      status: 400,
      authenticated: false,
      message: 'Missing email or password value',
    };

  const config = {
    method: 'get',
    url: 'http://localhost:3000/api/user/authenticate',
    data: {
      email: email,
      password: password,
    },
  };

  try {
    const res = await axios(config);

    if (res.status !== 200) {
      return {
        status: 404,
        authenticated: false,
        message: res.statusText,
      };
    }

    return {
      status: 200,
      authenticated: true,
      message: res.statusText,
    };
  } catch (err: any) {
    return {
      status: 500,
      authenticated: false,
      message: err,
    };
  }
};

// ? Create a new user (createAccount)
const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
): Promise<{
  status: number;
  success: boolean;
  data?: any;
  message?: string | Error;
}> => {
  if (!firstName || !lastName || !email || !phone || !password)
    return {
      status: 400,
      success: false,
      message: 'Missing or invalid required field input',
    };

  const config = {
    method: 'post',
    url: 'http://localhost:3000/api/user/create',
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
    },
  };

  try {
    const res = await axios(config);

    if (res.status !== 201) {
      return {
        status: res.status,
        success: false,
        message: res.statusText,
      };
    }

    return {
      status: 201,
      success: true,
      data: res.data,
      message: res.statusText,
    };
  } catch (err: any) {
    return {
      status: 500,
      success: false,
      message: err,
    };
  }
};

// ? Get tier by name (createAccount)
const findTierByName = async (
  tierName: string,
): Promise<{
  status: number;
  success: boolean;
  data?: any;
  message?: string | Error;
}> => {
  if (!tierName) {
    return {
      status: 400,
      success: false,
      message: 'Missing or invalid required field input',
    };
  }

  const config = {
    method: 'get',
    url: 'http://localhost:3000/api/tier/read/name',
    data: {
      name: tierName,
    },
  };

  try {
    const res = await axios(config);

    if (res.status !== 200) {
      return {
        status: res.status,
        success: false,
        message: res.statusText,
      };
    }

    return {
      status: 200,
      success: true,
      data: res.data,
      message: res.statusText,
    };
  } catch (err: any) {
    return {
      status: 500,
      success: false,
      message: err,
    };
  }
};

// ? Create a new team (createAccount)
const createTeam = async (
  name: string,
  ownerId: string,
  ownerFirstName: string,
  ownerLastName: string,
  packageTierId: string,
  packageFrequency: string,
): Promise<{ status: number; success: boolean; message?: string | Error }> => {
  if (
    !name ||
    !ownerId ||
    !ownerFirstName ||
    !ownerLastName ||
    !packageTierId ||
    !packageFrequency
  )
    return {
      status: 400,
      success: false,
      message: 'Missing or invalid required field input',
    };

  const config = {
    method: 'post',
    url: 'http://localhost:3000/api/team/create',
    data: {
      name: name,
      ownerId: ownerId,
      ownerFirstName: ownerFirstName,
      ownerLastName: ownerLastName,
      packageTierId: packageTierId,
      packageFrequency: packageFrequency,
    },
  };

  try {
    const res = await axios(config);

    if (res.status !== 201) {
      return {
        status: res.status,
        success: false,
        message: res.statusText,
      };
    }

    return {
      status: 201,
      success: true,
      message: res.statusText,
    };
  } catch (err: any) {
    return {
      status: 500,
      success: false,
      message: err,
    };
  }
};

// ? Create a new account
const createAccount = async (
  event: IpcMainInvokeEvent,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
  teamName: string,
  packageName: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum',
  packageFrequency: 'monthly' | 'annually',
): Promise<{ status: number; success: boolean; message?: string | Error }> => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !teamName ||
    !packageName ||
    !packageFrequency
  )
    return {
      status: 400,
      success: false,
      message: 'Missing or invalid required field input',
    };

  try {
    const tier = await findTierByName(packageName);

    // console.log('tier:', tier);

    if (tier.status !== 200) {
      return {
        status: tier.status,
        success: false,
        message: 'An error occurred while fetching tier data',
      };
    }

    const user = await createUser(firstName, lastName, email, phone, password);

    // console.log('user:', user);

    if (user.status !== 201) {
      return {
        status: user.status,
        success: false,
        message: 'An error occurred while posting user data',
      };
    }

    // console.log('user.data.user:', user.data.user);
    console.log('teamName:', teamName);
    console.log('user.data.user._id:', user.data.user._id);
    console.log('user.data.user.name.first:', user.data.user.name.first);
    console.log('user.data.user.name.last:', user.data.user.name.last);
    console.log('tier.data.tier._id:', tier.data.tier._id);
    console.log('packageFrequency:', packageFrequency);

    const team = await createTeam(
      teamName,
      user.data.user._id,
      user.data.user.name.first,
      user.data.user.name.last,
      tier.data.tier._id,
      packageFrequency,
    );

    console.log('team:', team);

    if (team.status !== 201) {
      return {
        status: team.status,
        success: false,
        message: 'An error occurred while posting team data',
      };
    }

    return {
      status: 201,
      success: true,
      message: 'Successfully created new account!',
    };
  } catch (err: any) {
    return {
      status: 500,
      success: false,
      message: err,
    };
  }
};

export const registerIPCHandlers = () => {
  ipcMain.on(PATCH_DOCUMENT, handlePatchDocument);
  // ipcMain.on(POST_DOCUMENT_FIELDS, handlePostDocumentFields);
  ipcMain.handle(OPEN_FILE_BROWSER, openFileBrowser);
  ipcMain.handle(DETECT_PATCHES, handleDetectPatches);
  ipcMain.handle(CHECK_USER_EMAIL_AVAILABLE, checkUserEmailAvailable);
  ipcMain.handle(CHECK_TEAM_NAME_AVAILABLE, checkTeamNameAvailable);
  ipcMain.handle(CREATE_ACCOUNT, createAccount);
  // ipcMain.handle(GET_DOCUMENT_FIELDS, handleGetDocumentFields);
  ipcMain.handle(AUTHENTICATE_CREDENTIALS, authenticateCredentials);
  ipcMain.handle(GET_DOCUMENT_LIST, handleGetDocumentList);
  ipcMain.handle(GET_JOTFORM_KEY, handleGetJotFormKey);
};

//! Old Code (Temporarily storing for development build, remove for production build)
// async function readDocx(
//   path: string,
//   conditions: Map<string, string[]>,
//   data: Map<string, string>,
// ) {
//   const WordExtractor = require('word-extractor');
//   const extractor: WordExtractor = new WordExtractor();
//   const fieldRegex: RegExp =
//     /\{\{[a-zA-Z]+(?: [a-zA-Z]+)*(?: (?:[1-9]|\*))? \| [a-zA-Z]+(?: [a-zA-Z]+)*\}\}/g;
//   const staticPatchData: Map<string, string> = new Map();
//   const dynamicPatchData: Map<string, string> = new Map();

//   await extractor
//     .extract('./src/data/templates/wills/Short-Term Guardian.docx')
//     .then((doc) => {
//       const docFields = new Set(doc.getBody().match(fieldRegex));
//       const conditionKey = conditions.keys().next().value;
//       const values = conditions.get(conditionKey) || [];
//       console.log('Initial values:', values);
//       for (const field of docFields) {
//         const fieldKey = field.slice(2, -2);

//         if (field.indexOf('*') >= 1) {
//           dynamicPatchData.set(fieldKey, '');
//         } else {
//           staticPatchData.set(
//             fieldKey,
//             data.get(fieldKey) || `No data found for ${fieldKey}`,
//           );
//         }
//       }
//     })
//     .catch((err) => {
//       throw new Error(
//         `An error occurred while extracting field data from path (${path})\n${err}`,
//       );
//     });

//   return [staticPatchData, dynamicPatchData];
// }

// const DocxMerger = require('docx-merger');
// const path = require('path');
// const fileNames: string[] = [];
// let coreDocument = fs.readFileSync(
//   path.resolve(appPath + '/src/data/temp', 'temp-core-document.docx'),
//   'buffer',
// );

// fs.readdirSync(appPath + '/src/data/temp').forEach((fileName) => {
//   if (fileName.includes('temp-conditional')) fileNames.push(fileName);
// });

// for (const fileName of fileNames) {
//   const conditionalDocument = fs.readFileSync(
//     path.resolve(appPath + '/src/data/temp', fileName),
//     'binary',
//   );
//   const mergedDocument = new DocxMerger({}, [
//     coreDocument,
//     conditionalDocument,
//   ]);
//   fs.rmSync(appPath + '/src/data/temp/temp-core-document.docx');
//   mergedDocument.save('nodebuffer', function (data) {
//     // fs.writeFile("output.zip", data, function(err){/*...*/});
//     fs.writeFile('temp-core-document.docx', data, function (err) {
//       throw new Error(
//         'An error occurred while merging temp patched documents',
//         err,
//       );
//     });
//   });
//   coreDocument = fs.readFileSync(
//     path.resolve(appPath + '/src/data/temp', 'temp-core-document.docx'),
//     'binary',
//   );
// }
// const file1 = fs.readFileSync(path.resolve(appPath + '/src/data/temp', ))

// const file1 = fs.readFileSync(path.resolve(__dirname, 'template.docx'), 'binary');
// const file2 = fs.readFileSync(path.resolve(__dirname, 'template1.docx'), 'binary');

// var docx = new DocxMerger({},[file1,file2]);

// //SAVING THE DOCX FILE

// docx.save('nodebuffer',function (data) {
//     // fs.writeFile("output.zip", data, function(err){/*...*/});
//     fs.writeFile("output.docx", data, function(err){/*...*/});
// });
// }

//? Saving file to downloads (Example)
// await patchDocument({
//   outputType: 'nodebuffer',
//   keepOriginalStyles: true,
//   data: fs.readFileSync(conditionalData.path),
//   patches: conditionalPatches,
// }).then((doc) => {
//   let i = 1;
//   let path = downloadPath + '/Patched Document.docx';

//   // Rewrites file name in case of file name already taken
//   while (fs.existsSync(path)) {
//     path = downloadPath + `/Patched Document(${i}).docx`;
//     i++;
//   }

//   fs.writeFileSync('./src/data/temp/temp-conditional-document.docx', doc);
// });

// async function createConditionalPatches(
//   path: string,
//   staticPatchData: Map<string, string>,
//   dynamicPatchData: Map<string, string>,
//   conditionVariants: Map<string, string[]>,
//   highlight: 'yellow' | 'none',
// ) {
//   const patches: Record<string, IPatch> = {};
//   const conditionValues = conditionalData.values().next().value;

//   for (const [field, value] of staticPatchData) {
//     patches[field] = {
//       type: 'paragraph',
//       children: [new TextRun({ text: value, highlight: highlight })],
//     };
//   }

//   for (const conditionValue of conditionValues) {
//     for (const [field, value] of dynamicPatchData) {
//       const fieldFormat = field.replace('*', conditionValue);
//       const fieldValue = data.get(fieldFormat);
//       patches[field] = {
//         type: 'paragraph',
//         children: [new TextRun({ text: fieldValue, highlight: highlight })],
//       };
//     }

//     await patchDocument({
//       outputType: 'nodebuffer',
//       keepOriginalStyles: true,
//       data: fs.readFileSync(path),
//       patches: patches,
//     }).then((doc) => {
//       let i = 1;
//       let conditionalPath =
//         downloadPath + '/Conditional Patched Document.docx';

//       while (fs.existsSync(conditionalPath)) {
//         conditionalPath =
//           downloadPath + `/Conditional Patched Document(${i}).docx`;
//         i++;
//       }
//       fs.writeFileSync(conditionalPath, doc);
//     });
//   }
// }

// createConditionalPatches(
//   './src/data/templates/wills/Short-Term Guardian.docx',
//   conditionalPatchData[0],
//   conditionalPatchData[1],
//   conditionalData,
//   'yellow',
// );
// console.log('CREATE CONDITION DATA:', createConditionData());

// function createPatches(highlight: 'yellow' | 'none') {
//   const patches: Record<string, IPatch> = {};
//   for (const [field, value] of data) {
//     patches[field] = {
//       type: 'paragraph',
//       children: [new TextRun({ text: value, highlight: highlight })],
//     };
//   }

//   return patches;
// }

// function createConditionalPatches(highlight: 'yellow' | 'none') {
//   if (conditions) {
//     const conditionalPatches: Record<string, IPatch> = {};
//     for (const path in conditions) {
//       console.log('PATH:', path);
//       conditions[path];
//       for (const condition in conditions[path]) {
//         if (conditions[path][condition]) {
//           conditionalPatches[condition] = {
//             type: 'paragraph',
//             children: [
//               new TextRun({
//                 text: data.get(condition),
//                 highlight: highlight,
//               }),
//             ],
//           };
//         }
//       }
//     }
//   }
// }

// createConditionalPatches();

// patchDocument({
//   outputType: 'nodebuffer',
//   keepOriginalStyles: true,
//   data: fs.readFileSync(path),
//   patches: createPatches('yellow'),
// }).then((doc) => {
//   console.log('test');
//   let i = 1;
//   let path = downloadPath + '/Patched Document.docx';

//   while (fs.existsSync(path)) {
//     path = downloadPath + `/Patched Document(${i}).docx`;
//     i++;
//   }
//   fs.writeFileSync('./src/data/temp/temporary core document.docx', doc);
// });

// patchDocument({
//   outputType: 'nodebuffer',
//   keepOriginalStyles: true,
//   data: fs.readFileSync(path),
//   patches: createPatches('yellow'),
// }).then((doc) => {
//   console.log('test');
//   let i = 1;
//   let path = downloadPath + '/Patched Document.docx';

//   while (fs.existsSync(path)) {
//     path = downloadPath + `/Patched Document(${i}).docx`;
//     i++;
//   }
//   fs.writeFileSync(path, doc);
// });

// patchDocument({
//   outputType: 'nodebuffer',
//   keepOriginalStyles: true,
//   data: fs.readFileSync(path),
//   patches: createPatches('yellow'),
// }).then((doc) => {
//   console.log('test');
//   let i = 1;
//   let path = downloadPath + '/Patched Document.docx';

//   while (fs.existsSync(path)) {
//     path = downloadPath + `/Patched Document(${i}).docx`;
//     i++;
//   }
//   fs.writeFileSync(path, doc);
// });
