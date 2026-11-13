import { ElectronHandler, IpcAPI } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    ipcAPI: IpcAPI;
  }

  interface File {
    path: string;
  }

  interface IFile {
    name: string;
    path: string;
    size: number;
  }

  interface IFileData extends IFile {
    fields: {
      conditional: string;
      static: Map<string, string>;
      dynamic: Map<string, string>;
    };
  }

  interface ScanProgressData {
    currentFile: {
      name: string;
      index: number;
    };
    totalFiles: number;
    percentage: number;
    elapsedMs: number;
    status: string;
  }
}

export {};
