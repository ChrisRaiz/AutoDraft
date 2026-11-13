import { ReactComponent as CloseIcon } from '../../data/assets/close-icon-12x12.svg';
import { ReactComponent as UploadIcon } from '../../data/assets/upload-icon-14x14.svg';
import ActionButton from '../ActionButton';
import styles from './UploadActions.module.css';

const UploadActions = ({ close }: { close: Function }) => {
  // Close button onClick function
  function closeModal() {
    close();
  }

  // Upload button onClick function
  function uploadDocuments() {
    console.log('Upload Button Test');
  }

  return (
    <div className={styles.selectionActions}>
      <ActionButton
        icon={<CloseIcon />}
        label="Close"
        onClick={closeModal}
        style={{
          icon: { marginTop: 2 },
        }}
      />
      <hr className={styles.actionsDivider} />
      <ActionButton
        icon={<UploadIcon />}
        label={'Upload'}
        onClick={uploadDocuments}
        style={{
          button: { background: '#769BFF', color: '#ffffff', border: 'none' },
          icon: { marginTop: 3, width: 11 },
        }}
      />
    </div>
  );
};

export default UploadActions;
