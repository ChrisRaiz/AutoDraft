import { useState, useEffect, useCallback, useRef, DragEvent } from 'react';
import { openFileBrowser, detectPatches, onScanProgress } from '@/data/ipc/messages';
import BoldButton from '@/components/BoldButton';
import BaseButton from '@/components/BaseButton';
import { Link } from 'react-router-dom';
import { ReactComponent as SelectDocumentIcon } from './../data/assets/select-document-icon-16x14.svg';
import { ReactComponent as AddDocumentsIcon } from './../data/assets/export-icon-16x16.svg';
import { ReactComponent as DragDropIcon } from './../data/assets/drag-drop-icon-14x14.svg';
import { ReactComponent as DocxIcon } from './../data/assets/docx-file-icon-33x41.svg';
import { ReactComponent as DeleteIcon } from './../data/assets/x-delete-icon-17x17.svg';
import { ReactComponent as PrevIcon } from './../data/assets/left-chevron-icon-10x11.svg';
import { ReactComponent as NextIcon } from './../data/assets/right-chevron-icon-10x11.svg';
import { ReactComponent as ContinueIcon } from '@/data/assets/save-icon-16x14.svg';
import { ReactComponent as ClearIcon } from '@/data/assets/delete-icon-17x14.svg';
import { ReactComponent as ReturnIcon } from '@/data/assets/return-icon-12x11.svg';

import styles from './upload.module.css';

// Number of UploadItem(s) to render in the UploadList component
const maxListItems = 4;
const baseIndexes = Array.from({ length: maxListItems }, (e, i) => i);

const PageNavigation = ({
  pages,
  // currentPage,
  // totalPages,
}: {
  pages: {
    value: { total: number; current: number };
    setter: { prev: Function; next: Function };
  };
  // currentPage: number;
  // totalPages: number;
}) => {
  return (
    <div className={styles.navigationContainer}>
      <button
        className={styles.navigationButton}
        onClick={() => pages.setter.prev()}
      >
        <PrevIcon />
      </button>
      <p className={styles.pageText}>
        {pages.value.current} of {pages.value.total}
      </p>
      <button
        className={styles.navigationButton}
        onClick={() => pages.setter.next()}
      >
        <NextIcon />
      </button>
    </div>
  );
};

function getPageIndexes(
  filesData: { name: string; path: string; size: number }[],
  currentPage: number,
  totalPages: number,
) {
  if (currentPage <= 1) {
    return baseIndexes;
    // } else if (currentPage === totalPages - 1) {
    //   const lastIndexes: number[] = baseIndexes.map(
    //     (index) => index + maxListItems * (currentPage - 1),
    //   );
    //   const res: number[] = [];
    //   for (let i = 0; i < maxListItems; i++) {
    //     if (filesData[lastIndexes[i]]) {
    //       res.push(lastIndexes[i]);
    //     } else {
    //       break;
    //     }
    //   }
    //   let i = 0;
    //   while (i < 10) {
    //     console.log('...');
    //     i += 1;
    //   }
    //   console.log('currentPage === totalPages - 1 - res:', res);
    //   while (i < 10) {
    //     console.log('...');
    //     i += 1;
    //   }
    //   return res;
  } else {
    return baseIndexes.map((index) => index + maxListItems * (currentPage - 1));
  }
}

const UploadList = ({
  filesData,
  pages,
}: {
  filesData: {
    value: { name: string; path: string; size: number }[];
    setter: Function;
  };
  pages: { current: number; total: number };
}) => {
  const pageIndexes: number[] = getPageIndexes(
    filesData.value,
    pages.current,
    pages.total,
  );
  return (
    <div className={styles.uploadList}>
      {pages.current === 0 ? (
        <p className={styles.nullText}>No Files Uploaded</p>
      ) : (
        pageIndexes.map((index) => {
          if (filesData.value[index]) {
            return (
              <UploadItem
                key={filesData.value[index].name}
                data={{
                  name: filesData.value[index].name,
                  size: filesData.value[index].size,
                  index: index,
                }}
                remove={filesData.setter}
              />
            );
          } else {
            return;
          }
        })
      )}
    </div>
  );
};

const UploadItem = ({
  data,
  remove,
}: {
  data: { name: string; size: number; index: number };
  remove: Function;
}) => {
  const formattedSize = byteConverter(data.size);
  if (data.name.endsWith('.docx')) {
    data.name = data.name.slice(0, -5);
  }

  return (
    <div className={styles.itemContainer}>
      <div className={styles.leftContent}>
        <div className={styles.iconContainer}>
          <DocxIcon />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.fileText}>
            {data.name}
            <br />
            <span className={styles.sizeText}>
              {formattedSize.value} {formattedSize.unit}
            </span>
          </p>
        </div>
      </div>
      <div className={styles.rightContent}>
        <button
          className={styles.deleteButton}
          onClick={() => remove(data.index)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

function byteConverter(bytes: number): {
  unit: 'Bytes' | 'KB' | 'MB' | 'GB';
  value: number;
} {
  if (bytes >= 1000) return { unit: 'KB', value: Math.trunc(bytes / 1000) };
  else if (bytes >= 1000000)
    return { unit: 'MB', value: Math.trunc(bytes / 1000000) };
  else if (bytes >= 1000000000)
    return { unit: 'GB', value: Math.trunc(bytes / 1000000000) };
  else return { unit: 'Bytes', value: bytes };
}

// interface IFilesData {
//   name: string;
//   path: string;
//   size: number;
//   fields: {
//     conditional: string;
//     staticData: Map<string, string>;
//     dynamicData: Map<string, string>;
//   }[];
// }

const Upload = () => {
  const [filesData, setFilesData] = useState<IFileData[]>([]);
  const [isScanning, setScanning] = useState<boolean>(false); //! THIS NEEDS TO BE FALSE, ONLY TRUE FOR STYLING PURPOSES
  const [currentScan, setCurrentScan] = useState<{
    name: string;
    index: number;
  }>({ name: '', index: -1 });
  const [pages, setPages] = useState<{ total: number; current: number }>({
    total: 0,
    current: 0,
  });
  const [scanMetadata, setScanMetadata] = useState<{
    currentFile: {
      name: string;
      index: number;
    };
    totalFiles: number;
    percentage: number;
    timeRemaining: number;
    status: string;
  }>({ currentFile: { name: '', index: -1 }, totalFiles: 0, percentage: 0, timeRemaining: 0, status: '' });

  // Remove an uploaded file
  function deleteUpload(index: number) {
    if (index > filesData.length) return;
    const filesDataCopy = [...filesData];
    filesDataCopy.splice(index, 1);
    const newTotal = getTotalPages(filesDataCopy.length);
    if (pages.current === pages.total && pages.total !== newTotal) {
      setPages({ total: newTotal, current: newTotal });
    } else if (pages.current !== pages.total) {
      setPages({ ...pages, total: newTotal });
    }
    setFilesData(filesDataCopy);
  }

  // Calculates page count for uploaded files
  function getTotalPages(length: number) {
    const res = Math.ceil(length / maxListItems);
    return res;
  }

  // Drag and drop file upload handler
  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
    filesData: IFileData[],
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    const filesDataCopy: IFileData[] = [...filesData];

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (!files[i].name.endsWith('.docx')) {
          continue;
        }
        filesDataCopy.push({
          name: files[i].name,
          path: files[i].path,
          size: files[i].size,
          fields: {
            conditional: '',
            static: new Map(),
            dynamic: new Map(),
          },
        });
      }
      const newTotal = getTotalPages(filesDataCopy.length);
      setFilesData(filesDataCopy);

      if (pages.current === 0) {
        setPages({ total: newTotal, current: 1 });
      } else {
        setPages({ ...pages, total: newTotal });
      }
    }
  };

  // Open os' native file browser for uploading files
  async function selectFile() {
    await openFileBrowser().then((res: IFileData[]) => {
      if (!res) return;
      const filesDataCopy: IFileData[] = [...filesData];
      for (const file of res) {
        filesDataCopy.push(file);
      }
      const newTotal = getTotalPages(filesDataCopy.length);
      setFilesData(filesDataCopy);

      if (pages.current === 0) {
        setPages({ total: newTotal, current: 1 });
      } else {
        setPages({ ...pages, total: newTotal });
      }
    });
  }

  // Navigate to previous page of uploaded files
  function handlePrevPage() {
    if (pages.current === 1) return;
    const newCurrent = pages.current - 1;
    setPages({ ...pages, current: newCurrent });
  }

  // Navigate to next page of uploaded files
  function handleNextPage() {
    if (pages.current === pages.total) return;
    const newCurrent = pages.current + 1;
    setPages({ ...pages, current: newCurrent });
  }

  // Helper function for timeouts
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Scan all uploaded files
  async function scanUploads(filesData: IFileData[]) {
    setScanMetadata({
      ...scanMetadata,
      status: 'Initializing document scanner',
    });

    setScanning(true);
    await sleep(1500);
    
    setScanMetadata({
      ...scanMetadata,
      status: `Sending documents to scanner`,
    });

    await detectPatches(filesData).then((res: IFileData[]) => {
      setFilesData(res);
    });

    await sleep(1500);
    setScanning(false);
  }
  // async function scanUploads(filesData: IFileData[]) {
  //   setScanMetadata({
  //     ...scanMetadata,
  //     status: 'Initializing scannable documents',
  //   });
  //   setScanning(true);
  //   await sleep(1500);
  //   const filesDataCopy: IFileData[] = [...filesData];
  //   for (let i = 0; i < filesData.length; i++) {
  //     console.log(filesData[i].name);
  //     const fileName: string = filesData[i].name.slice(
  //       0,
  //       filesData[i].name.length - 5,
  //     );
  //     await sleep(1500);
  //     setScanMetadata({
  //       ...scanMetadata,
  //       status: `Scanning for detectable fields`,
  //     });
  //     setCurrentScan({ name: fileName, index: i });
  //     await detectPatches(filesData).then((res: IFileData[]) =>
  //       setFilesData(res),
  //     );
  //     await sleep(1500);
  //   }
  //   setScanning(false);
  // }

  // Clear all uploaded files
  function clearData() {
    setFilesData([]);
    setPages({
      total: 0,
      current: 0,
    });
  }

  console.table(filesData);

  return (
    <div className={styles.pageContainer}>
      {isScanning ? (
        <Scan status={scanMetadata.status} startFile={filesData[0].name}/>
      ) : null}
      <div className={styles.uploadContainer}>
        <div className={styles.pageHeader}>
          <span className={styles.navigationPosition}>
            <PageNavigation
              pages={{
                value: pages,
                setter: { prev: handlePrevPage, next: handleNextPage },
              }}
            />
          </span>
          <h3 className={styles.pageTitle}>Upload Documents</h3>
          <div className={styles.pageActions}>
            <div className={styles.fileButtonsContainer}>
              <BoldButton
                icon={<ContinueIcon />}
                label="Continue"
                color="#5D5FEF"
                onClick={() => scanUploads(filesData)}
              />
              <BoldButton
                icon={<ClearIcon />}
                label="Clear"
                color="#FA5A7D"
                onClick={() => clearData()}
              />
            </div>
            <hr className={styles.actionDivider} />
            <div className={styles.actionButtons}>
              <BaseButton
                icon={<SelectDocumentIcon />}
                label="Browse Files"
                onClick={async () => await selectFile()}
              />
              <Link to={'/documents'} className={styles.link}>
                <BaseButton
                  icon={<ReturnIcon />}
                  label="Return to Previous"
                  onClick={() => console.log('return test')}
                />
              </Link>
            </div>
          </div>
        </div>
        <UploadList
          filesData={{ value: filesData, setter: deleteUpload }}
          pages={pages}
        />
      </div>
      <FileDrop files={{ value: filesData, setter: handleDrop }} />
    </div>
  );
};

const FileDrop = ({
  files,
}: {
  files: {
    value: { name: string; path: string; size: number }[];
    setter: Function;
  };
}) => {
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <div className={styles.fileDropContainer}>
      <div
        className={styles.fileDropArea}
        onDrop={(e) => files.setter(e, files.value)}
        onDragOver={(e) => handleDragOver(e)}
      >
        <DragDropIcon className={styles.dragDropIcon} />
        <p className={styles.fileDropHelper}>Drag & Drop Files Here</p>
      </div>
    </div>
  );
};

// status is shown until the first progress message arrives from the scanner
const Scan = ({ status, startFile }: { status: string, startFile: string }) => {
  const [metadata, setMetadata] = useState<ScanProgressData | null>(null);
  const [secsRemaining, setSecsRemaining] = useState(0);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);
  const displayedRef = useRef(0);
  // The bar glides linearly from `from` to `to` over `duration` ms
  const segment = useRef({ from: 0, to: 0, start: 0, duration: 1 });
  const lastStepTime = useRef<number | null>(null);
  // Matches the per-file pause in handleDetectPatches until a real interval is measured
  const stepInterval = useRef(1500);

  // Each time a file finishes, glide to the new percentage over the time the previous file
  // took. The next file finishes as the glide ends, so the bar never stops between files
  useEffect(() => {
    let frame: number;

    const tick = (now: number) => {
      const { from, to, start, duration } = segment.current;
      const t = Math.min(1, (now - start) / duration);
      displayedRef.current = from + (to - from) * t;
      setDisplayedPercentage(displayedRef.current);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const unsubscribe = onScanProgress((data) => {
      if (data.percentage > segment.current.to) {
        const now = performance.now();
        if (lastStepTime.current !== null) {
          stepInterval.current = now - lastStepTime.current;
        }
        lastStepTime.current = now;
        segment.current = {
          from: displayedRef.current,
          to: data.percentage,
          start: now,
          // Finish the last glide early so the bar has time to settle flat before the modal closes
          duration:
            data.percentage === 100
              ? stepInterval.current * 0.5
              : stepInterval.current,
        };
      }

      setMetadata(data);

      if (data.percentage > 0) {
        // Extrapolate total time from how long it took to get this far
        const estimatedTotalMs = (data.elapsedMs / data.percentage) * 100;
        const remainingMs = estimatedTotalMs - data.elapsedMs;
        setSecsRemaining(Math.max(0, Math.round(remainingMs / 1000)));
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <div className={styles.blackOverlay} />
      <div className={styles.scanContainer}>
        <div className={styles.textPadding}>
          <p className={styles.fileName}>{metadata?.currentFile.name || startFile}</p>
          <div className={styles.spaceBetweenTextContainer}>
            <p className={styles.completePercentage}>
              <span className={styles.percentage}>
                {Math.floor(displayedPercentage)}%
              </span>{' '}
              Completed
            </p>
            <p className={styles.timeRemaining}>
              <span className={styles.time}>{secsRemaining}</span> secs
              remaining
            </p>
          </div>
        </div>
        <LoadingBar percentage={displayedPercentage} />
        <div className={styles.textPadding}>
          <p className={styles.scanStatus}>{metadata?.status ?? status}</p>
        </div>
      </div>
    </>
  );
};

const LoadingBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className={styles.barContainer}>
      <div
        className={
          percentage >= 100
            ? `${styles.barFill} ${styles.barComplete}`
            : styles.barFill
        }
        style={{ width: `${percentage}%` }}
      >
        <div className={styles.waveBack} />
        <div className={styles.waveFront} />
      </div>
    </div>
  );
};

export default Upload;
