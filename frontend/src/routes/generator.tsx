import { useState } from 'react';
import { ReactComponent as ValidStatusIcon } from './../data/assets/valid-status-icon-30x30.svg';
import { ReactComponent as InvalidStatusIcon } from './../data/assets/invalid-status-icon-30x30.svg';
import { ReactComponent as NewSetIcon } from './../data/assets/new-set-icon-10x10.svg';
import { ReactComponent as AddDocumentsIcon } from './../data/assets/export-icon-16x16.svg';
import { ReactComponent as SearchIcon } from './../data/assets/search-icon-14x15.svg';
import ProgressBar from '@/components/ProgressBar';
import UploadDocumentsModal from '@/components/uploadModal/UploadDocumentsModal';
import { CompletedDisplayFraction } from '@/components/CompletedDisplay';
import styles from './generator.module.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { setDatasets } from 'react-chartjs-2/dist/utils';

interface ISetList {
  id: number;
  status: {
    code: number;
    error: string | null;
  };
  docId: string;
  documentSet: string;
  files: string;
  stats: {
    percentage: number;
    complete: number;
    total: number;
  };
}

interface IColors {
  color: string;
  light: string;
  dark: string;
}

const setListData: ISetList[] = [
  {
    id: 0,
    status: {
      code: 200,
      error: null,
    },
    docId: '01',
    documentSet: 'Will Set',
    files: '8',
    stats: {
      percentage: 95,
      complete: 125,
      total: 132,
    },
  },
  {
    id: 1,
    status: {
      code: 200,
      error: null,
    },
    docId: '02',
    documentSet: 'Intake Form',
    files: '1',
    stats: {
      percentage: 33,
      complete: 21,
      total: 64,
    },
  },
  {
    id: 2,
    status: {
      code: 404,
      error: 'File not found',
    },
    docId: '03',
    documentSet: 'Stock Purchase Agreement',
    files: '12',
    stats: {
      percentage: 82,
      complete: 203,
      total: 248,
    },
  },
  {
    id: 3,
    status: {
      code: 200,
      error: null,
    },
    docId: '04',
    documentSet: 'Power of Attorney',
    files: '3',
    stats: {
      percentage: 29,
      complete: 24,
      total: 83,
    },
  },
];

const colors: IColors[] = [
  {
    color: '#0095FF', // Blue
    light: '#E8EDFF', // Light Blue
    dark: '#769BFF', // Dark Blue
  },
  {
    color: '#BF83FF', // Purple
    light: '#F3E8FF', // Light Purple
    dark: '#884DFF', // Dark Purple
  },
  {
    color: '#03AC20', // Green
    light: '#DCFCE7', // Light Green
    dark: '#3CD856', // Dark Green
  },
  {
    color: '#FF947A', // Orange
    light: '#FFF4DE', // Light Orange
    dark: '#FF8900', // Dark Orange
  },
];

const SetListRow = ({ setData }: { setData: ISetList }) => {
  let colorIndex = setData.id;

  if (colorIndex > 4) {
    const value = Number(colorIndex) / 4;

    if (Number.isInteger(value)) colorIndex = 0;
    else colorIndex = (value - Math.trunc(value)) * 4;
  }

  return (
    <div
      className={
        Number(setData.docId) % 2 == 0
          ? clsx(styles.setRowContainer, styles.altRowBackground)
          : styles.setRowContainer
      }
    >
      <div className={styles.statusCategory}>
        {setData.status.code == 200 ? (
          <ValidStatusIcon className={styles.statusIcon} />
        ) : (
          <InvalidStatusIcon className={styles.statusIcon} />
        )}
      </div>
      <div className={styles.idCategory}>
        <p className={styles.rowDataText}>{setData.docId}</p>
      </div>
      <div className={styles.setCategory}>
        <p className={styles.rowDataText}>{setData.documentSet}</p>
      </div>
      <div className={styles.filesCategory}>
        <p className={styles.rowDataText}>{setData.files}</p>
      </div>
      <div className={styles.progressCategory}>
        <ProgressBar
          complete={setData.stats.percentage}
          colors={{
            background: colors[colorIndex].light,
            border: colors[colorIndex].color,
          }}
          width={'95%'}
        />
      </div>
      <div className={styles.completedCategory}>
        <p className={styles.rowDataText}>
          <CompletedDisplayFraction
            complete={setData.stats.complete}
            total={setData.stats.total}
            colors={{
              text: colors[colorIndex].color,
              background: colors[colorIndex].light,
              border: colors[colorIndex].dark,
            }}
          />
        </p>
      </div>
      <div className={styles.actionsCategory}>
        <AdditionalActionsButton />
        <GenerateButton />
      </div>
    </div>
  );
};

const AdditionalActionsButton = () => {
  return (
    <button className={styles.additionalActionsButton}>
      <p className={styles.additionalButtonText}>...</p>
    </button>
  );
};

const GenerateButton = () => {
  return (
    <Link to={'/submissions'}>
      <button className={styles.generateButton}>
        <p className={styles.generateButtonText}>&gt;</p>
      </button>
    </Link>
  );
};

const Generator = () => {
  const [sortBy, setSortBy] = useState<{
    category: string;
    order: 'ascending' | 'descending';
  }>({ category: 'id', order: 'ascending' });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.documentSetSelectionContainer}>
        <div className={styles.selectionHeader}>
          <h3 className={styles.selectionTitle}>Document Set Selection</h3>
          <div className={styles.selectionActions}>
            <div className={styles.searchBarContainer}>
              <SearchIcon className={styles.searchIcon} />
              <input
                className={styles.selectionSearchBar}
                placeholder="Search here..."
              ></input>
            </div>
            <hr className={styles.actionsDivider} />
            <div className={styles.actionsButtons}>
              <button
                className={styles.newSetButton}
                onClick={() => console.log('new set button test successful!')}
              >
                <NewSetIcon className={styles.newSetIcon} />
                <p className={styles.newSetText}>New Set</p>
              </button>
              <Link to={'/upload'} style={{ textDecoration: 'none' }}>
                <button
                  className={styles.addDocumentsButton}
                  // onClick={() => toggleDocumentsModal()}
                >
                  <AddDocumentsIcon className={styles.addDocumentsIcon} />
                  <p className={styles.addDocumentsText}>Add Documents</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.selectionListContainer}>
          <div className={styles.selectionCategoriesContainer}>
            <button className={clsx(styles.sortButton, styles.statusCategory)}>
              Status
            </button>
            <button className={clsx(styles.sortButton, styles.idCategory)}>
              #
            </button>
            <button className={clsx(styles.sortButton, styles.setCategory)}>
              Document Set
            </button>
            <button className={clsx(styles.sortButton, styles.filesCategory)}>
              Files
            </button>
            <button
              className={clsx(styles.sortButton, styles.progressCategory)}
            >
              Progress
            </button>
            <button
              className={clsx(styles.sortButton, styles.completedCategory)}
            >
              Completed
            </button>
            <button className={clsx(styles.sortButton, styles.actionsCategory)}>
              Actions
            </button>
          </div>
          <hr className={styles.categoryDivider} />
          <ol className={styles.documentsList}>
            {setListData.map((data) => {
              return (
                <div>
                  <SetListRow setData={data} />
                  <hr className={styles.rowDivider} />
                </div>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Generator;
