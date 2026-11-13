import { useState, useCallback, DragEventHandler } from 'react';
import { ReactComponent as DragDropIcon } from '../../data/assets/drag-drop-icon-14x14.svg';
import UploadActions from './UploadActions';
import styles from './UploadDocumentsModal.module.css';

const UploadDocumentsModal = ({
  visible,
}: {
  visible: { value: boolean; setter: Function };
}) => {
  const [fileName, setFileName] = useState<string>('');

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFileName(files[0].path);
    }
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  if (visible.value) {
    return (
      <div className={styles.overlay}>
        <div className={styles.uploadModal}>
          <div className={styles.header}>
            <h3 className={styles.title}>Upload Documents</h3>
            <div className={styles.actionsContainer}>
              <UploadActions close={visible.setter} />
            </div>
          </div>
          <div className={styles.uploadedFiles}>
            <p className={styles.noUploads}>No uploaded documents</p>
          </div>
          <div
            className={styles.fileDropArea}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <DragDropIcon className={styles.dragDropIcon} />
            <p className={styles.fileDropHelper}>Drag & Drop File Here</p>
          </div>
        </div>
      </div>
    );
  }

  return;
};

export default UploadDocumentsModal;
