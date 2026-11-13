import { mainWindow } from './main';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { IPC_ACTIONS } from './ipc/actions';

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

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.invoke(channel);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;

interface DocumentTypes {
  docName: string;
  docFields: { [section: string]: Map<string, string> };
  docConditionals: {
    [key: string]: {
      staticFields: Map<string, string>;
      dynamicFields: Map<string, string>;
    };
  };
}

const ipcAPI = {
  authenticateCredentials: (email: string, password: string) =>
    ipcRenderer.invoke(AUTHENTICATE_CREDENTIALS, email, password),
  checkUserEmailAvailable: (email: string) =>
    ipcRenderer.invoke(CHECK_USER_EMAIL_AVAILABLE, email),
  checkTeamNameAvailable: (name: string) =>
    ipcRenderer.invoke(CHECK_TEAM_NAME_AVAILABLE, name),
  createAccount: (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    teamName: string,
    packageName: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum',
    packageFrequency: 'monthly' | 'annually',
  ) =>
    ipcRenderer.invoke(
      CREATE_ACCOUNT,
      firstName,
      lastName,
      email,
      phone,
      password,
      teamName,
      packageName,
      packageFrequency,
    ),
  postDocumentFields: (
    docName: string,
    docFields: { [section: string]: Map<string, string> },
    docConditionals: {
      [key: string]: {
        staticFields: Map<string, string>;
        dynamicFields: Map<string, string>;
      };
    },
  ) =>
    ipcRenderer.send(POST_DOCUMENT_FIELDS, docName, docFields, docConditionals),
  patchDocument: (
    path: string,
    data: Map<string, string>,
    conditionals: {
      [document: string]: {
        path: string;
        conditions: { field: string; satisfier: string }[];
        staticFields: { [field: string]: string };
        dynamicFields: { [field: string]: string };
      };
    } | null,
  ) => ipcRenderer.send(PATCH_DOCUMENT, path, data, conditionals),
  getDocumentFields: (docName: string) =>
    ipcRenderer.invoke(GET_DOCUMENT_FIELDS, docName),
  detectPatches: (files: IFile[]) => ipcRenderer.invoke(DETECT_PATCHES, files),
  getDocumentList: () => ipcRenderer.invoke(GET_DOCUMENT_LIST),
  getJotFormKey: () => ipcRenderer.invoke(GET_JOTFORM_KEY),
  openFileBrowser: () => ipcRenderer.invoke(OPEN_FILE_BROWSER),
  // Returns an unsubscribe function for use as a useEffect cleanup
  onScanProgress: (callback: (data: ScanProgressData) => void) => {
    const listener = (_event: IpcRendererEvent, data: ScanProgressData) =>
      callback(data);
    ipcRenderer.on(ON_SCAN_PROGRESS, listener);
    return () => {
      ipcRenderer.removeListener(ON_SCAN_PROGRESS, listener);
    };
  },
  removeProgressListener: () =>
    ipcRenderer.removeAllListeners(ON_SCAN_PROGRESS),
};

contextBridge.exposeInMainWorld('ipcAPI', ipcAPI);

export type IpcAPI = typeof ipcAPI;
