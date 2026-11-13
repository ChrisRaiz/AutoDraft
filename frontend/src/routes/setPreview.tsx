import { useDrag } from 'react-dnd';
import { Reorder, useDragControls, DragControls } from 'framer-motion';
import React, { useRef, useState } from 'react';
import BoldButton from '@/components/BoldButton';
import BaseButton from '@/components/BaseButton';
import { ReactComponent as SaveIcon } from '@/data/assets/save-icon-16x14.svg';
import { ReactComponent as DeleteIcon } from '@/data/assets/delete-icon-17x14.svg';
import { ReactComponent as ReturnIcon } from '@/data/assets/return-icon-12x11.svg';
import { ReactComponent as PrevIcon } from '@/data/assets/left-chevron-icon-9x15.svg';
import { ReactComponent as NextIcon } from '@/data/assets/right-chevron-icon-9x15.svg';
import { ReactComponent as DragIcon } from '@/data/assets/drag-icon-34x26.svg';
import styles from './setPreview.module.css';
import { clsx } from 'clsx';

interface IFile {
  id: number;
  name: string;
  pageCount: string;
  selected: boolean;
}

const filesData: IFile[] = [
  { id: 0, name: 'Cover Sheet', pageCount: '1', selected: true },
  { id: 1, name: 'Index', pageCount: '1', selected: false },
  { id: 2, name: 'Last Will & Testament', pageCount: '14', selected: false },
  { id: 3, name: 'DPOA Health', pageCount: '8', selected: false },
  { id: 4, name: 'DPOA Property', pageCount: '8', selected: false },
  { id: 5, name: 'HIPAA Authorization', pageCount: '4', selected: false },
  { id: 6, name: 'Living Will', pageCount: '2', selected: false },
  { id: 7, name: 'Short-Term Guardianship', pageCount: '5', selected: false },
  { id: 8, name: 'Legacy', pageCount: '37', selected: false },
];

const FilePreview = () => {
  return (
    <div className={styles.previewContainer}>
      <p className={styles.previewTitle}>
        File Preview{' '}
        <span className={styles.previewSubtitle}>| Index - 1 Page</span>
      </p>
      <div className={styles.previewFile}></div>
      <div className={styles.previewNavigation}>
        <button className={styles.navigationButton}>
          <PrevIcon />
        </button>
        <p className={styles.previewCount}>Page 1 of 1</p>
        <button className={styles.navigationButton}>
          <NextIcon />
        </button>
      </div>
    </div>
  );
};

import { animate, MotionValue, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)';

function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);

  useEffect(() => {
    let isActive = false;
    value.onChange((latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, '5px 5px 10px rgba(0,0,0,0.3)');
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
}

const Item = ({
  file,
  idx,
  selected,
  selectedIndex,
  files,
}: {
  file: IFile;
  idx: number;
  selected: boolean;
  selectedIndex: { value: number; setter: Function };
  files: { value: IFile[]; setter: Function };
}) => {
  // console.log('Item - selected:', selected);
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={file}
      id={idx.toString()}
      dragListener={false}
      dragControls={dragControls}
    >
      <FileItem
        idx={idx}
        fileNumber={(idx + 1).toString()}
        fileName={file.name}
        pageCount={file.pageCount}
        dragControls={dragControls}
        selected={selected}
        selectedIndex={selectedIndex}
        files={files}
      />
    </Reorder.Item>
  );
};

const FileList = ({
  files,
  selectedIndex,
  selectedFileId,
}: {
  files: {
    value: IFile[];
    setter: Function;
    rawSetter: React.Dispatch<React.SetStateAction<IFile[]>>;
  };
  selectedIndex: { value: number; setter: Function };
  selectedFileId: number;
}) => {
  const handleReorder = (newOrder: IFile[]) => {
    files.rawSetter(newOrder);

    const movedItem = newOrder.find((file) => file.id == selectedFileId);
    if (movedItem) {
      const newIndex = newOrder.indexOf(movedItem);
      selectedIndex.setter(newIndex);
    }
  };

  return (
    <div className={styles.fileContainer}>
      <div className={styles.fileHeader}>
        <div className={styles.fileTitleContainer}>
          <p className={styles.fileTitle}>Documents Order</p>
          <p className={styles.fileSubtitle}>Will Set Documents</p>
        </div>
        <div className={styles.fileButtonsContainer}>
          <BoldButton
            icon={<SaveIcon />}
            label="Options"
            color="#5D5FEF"
            onClick={() => console.log('save test')}
          />
          <BoldButton
            icon={<DeleteIcon />}
            label="Delete"
            color="#FA5A7D"
            onClick={() => console.log('delete test')}
          />
        </div>
      </div>
      <hr className={styles.categoryDivider} />
      <Reorder.Group
        axis="y"
        onReorder={handleReorder}
        values={files.value}
        layoutScroll={true}
        className={styles.fileList}
      >
        {files.value.map((file, idx) => {
          let selected;
          if (file.selected) {
            selected = true;
          } else {
            selected = false;
          }
          return (
            <Item
              key={file.name}
              file={file}
              idx={idx}
              selected={selected}
              selectedIndex={selectedIndex}
              files={files}
            />
          );
        })}
      </Reorder.Group>
    </div>
  );
};

const FileItem = ({
  idx,
  fileNumber,
  fileName,
  pageCount,
  dragControls,
  selected,
  selectedIndex,
  files,
}: {
  idx: number;
  fileNumber: string;
  fileName: string;
  pageCount: string;
  dragControls: DragControls;
  selected: boolean;
  selectedIndex: { value: number; setter: Function };
  files: { value: IFile[]; setter: Function };
}) => {
  const dragItem = useRef<string | null>();

  const selectionStyles = selected
    ? {
        container: clsx(styles.fileItemContainer, styles.selectedFileContainer),
        circle: clsx(styles.circleBackground, styles.selectedCircle),
        number: clsx(styles.fileNumber, styles.selectedFileNumber),
        name: clsx(styles.fileName, styles.selectedFileName),
        page: clsx(styles.pageCount, styles.selectedPageCount),
        drag: clsx(styles.fileActions, styles.selectedFileActions),
      }
    : {
        container: clsx(
          styles.fileItemContainer,
          styles.unselectedFileContainer,
        ),
        circle: clsx(styles.circleBackground, styles.unselectedCircle),
        number: clsx(styles.fileNumber, styles.unselectedFileNumber),
        name: clsx(styles.fileName, styles.unselectedFileName),
        page: clsx(styles.pageCount, styles.unselectedPageCount),
        drag: clsx(styles.fileActions, styles.unselectedFileActions),
      };

  function selectFile() {
    if (dragItem.current == 'drag') {
      dragItem.current = null;
    } else {
      files.setter(idx);
    }
  }

  return (
    <div
      className={selectionStyles.container}
      onClick={() => selectFile()}
      onPointerDown={() => (dragItem.current = null)}
      // onPointerUp={() => findFile()}
    >
      <div className={styles.fileItemInformation}>
        <div className={selectionStyles.circle}>
          <p className={selectionStyles.number}>{fileNumber}</p>
        </div>

        <p className={selectionStyles.name}>
          {fileName}
          <br />
          <span className={selectionStyles.page}>{pageCount} Page</span>
        </p>
      </div>
      <div
        className={styles.fileActions}
        onPointerDown={(e) => (
          e.stopPropagation(),
          (dragItem.current = 'drag'),
          dragControls.start(e)
        )}
      >
        <DragIcon />
      </div>
    </div>
  );
};

// TODO - STOP TRYING TO USE INDEXES, SEARCH THE ARRAY USING THE FILE DATA
const SetPreview = () => {
  const [files, setFiles] = useState<IFile[]>(filesData); // Files data will be here to update "selected" property to apply styles properly
  const [selectedFileId, setSelectedFileId] = useState<number>(filesData[0].id);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  function handleSelect(newIndex: number) {
    const filesCopy = [...files];

    const currFile = files.find((file) => file.id == selectedFileId);
    console.log('findFile - currFile:', currFile);

    const currIndex = currFile ? files.indexOf(currFile) : null;

    console.log('findFile - newIndex:', currIndex);

    if (!currIndex && currIndex !== 0)
      throw new Error(
        `Unable to find file with matching id: ${selectedFileId}`,
      );

    const newFileId = files[newIndex].id;

    filesCopy[currIndex].selected = false;
    filesCopy[newIndex].selected = true;

    setFiles(filesCopy);
    setSelectedFileId(newFileId);
    setSelectedIndex(newIndex);
  }

  function handleDragSelection(newSelectedIndex: number) {
    console.log('handleDragSelection - selectedIndex:', selectedIndex);
    console.log('handleDragSelection - newSelectedIndex:', newSelectedIndex);
    if (selectedIndex == newSelectedIndex) return;
    setSelectedIndex(newSelectedIndex);
  }

  // console.log('SetPreview - selectedIndex:', selectedIndex);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <p className={styles.headerTitle}>Document Set Editor</p>
        <div className={styles.actionsContainer}>
          <BoldButton
            icon={<SaveIcon />}
            label="Save Set"
            color="#5D5FEF"
            onClick={() => console.log('files:', files)}
          />
          <BoldButton
            icon={<DeleteIcon />}
            label="Delete Set"
            color="#FA5A7D"
            onClick={() => console.log('delete test')}
          />
          <hr className={styles.actionsDivider} />
          <BaseButton
            icon={<ReturnIcon />}
            label="Document Sets"
            onClick={() => console.log('return test')}
          />
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <FilePreview />
        <FileList
          files={{ value: files, setter: handleSelect, rawSetter: setFiles }}
          selectedIndex={{ value: selectedIndex, setter: handleDragSelection }}
          selectedFileId={selectedFileId}
        />
      </div>
    </div>
  );
};

export default SetPreview;
