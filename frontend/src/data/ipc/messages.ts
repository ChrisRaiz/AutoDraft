// messages.ts

const {
  authenticateCredentials,
  checkUserEmailAvailable,
  checkTeamNameAvailable,
  createAccount,
  detectPatches,
  patchDocument,
  openFileBrowser,
  getDocumentList,
  getJotFormKey,
  getDocumentFields,
  postDocumentFields,
  onScanProgress,
  removeProgressListener,
} = window.ipcAPI;

export {
  authenticateCredentials,
  checkUserEmailAvailable,
  checkTeamNameAvailable,
  createAccount,
  detectPatches,
  patchDocument,
  openFileBrowser,
  getDocumentList,
  getJotFormKey,
  getDocumentFields,
  postDocumentFields,
  onScanProgress,
  removeProgressListener,
};
