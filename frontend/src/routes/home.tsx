import { useState, useEffect, ReactElement, SVGProps } from 'react';
import { getDocumentList } from '@/data/ipc/messages';
import { getErrorMessage } from '../../functions/getErrorMessage';
import { getJotformUser } from '@/data/connections/jotform';
import Header from '@/components/Header';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  submissionChartParams,
  generationChartParams,
} from '@/data/charts/lineDatasets';
import { formChartParams, targetChartParams } from '@/data/charts/barDatasets';
import {
  SubmissionLineChart,
  GenerationLineChart,
} from '@/components/LineChart';
import { FormBarChart, TargetBarChart } from '@/components/BarChart';
import StatisticCard from '@/components/StatisticCard';
import DocumentRow from '@/components/DocumentRow';
import { ReactComponent as ExportIcon } from './../data/assets/export-icon-16x16.svg';
import { ReactComponent as GeneratedDocumentsIcon } from './../data/assets/generated-documents-icon-40x40.svg';
import { ReactComponent as NewSubmissionsIcon } from './../data/assets/new-submissions-icon-40x40.svg';
import { ReactComponent as SubmissionUpdatesIcon } from './../data/assets/submission-updates-icon-40x40.svg';
import { ReactComponent as DeletedSubmissionsIcon } from './../data/assets/deleted-submissions-icon-40x40.svg';
import styles from './home.module.css';
import clsx from 'clsx';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const cardData = [
  {
    id: 0,
    icon: <GeneratedDocumentsIcon />,
    count: 5,
    category: 'Generated\nDocs',
    background: '#FFE2E5',
  },
  {
    id: 1,
    icon: <NewSubmissionsIcon />,
    count: 20,
    category: 'New\nSubmissions',
    background: '#FFF4DE',
  },
  {
    id: 2,
    icon: <SubmissionUpdatesIcon />,
    count: 5,
    category: 'Submission\nUpdates',
    background: '#DCFCE7',
  },
  {
    id: 3,
    icon: <DeletedSubmissionsIcon />,
    count: 8,
    category: 'Deleted\nSubmissions',
    background: '#F3E8FF',
  },
];

const documentsData: {
  key: number;
  id: string;
  docSet: string;
  complete: number;
  colors: {
    text: string;
    background: string;
    border: string;
  };
}[] = [
  {
    key: 0,
    id: '01',
    docSet: 'Will Set',
    complete: 95,
    colors: {
      text: '#0095FF',
      background: '#E8EDFF',
      border: '#769BFF',
    },
  },
  {
    key: 1,
    id: '02',
    docSet: 'Intake Form',
    complete: 82,
    colors: {
      text: '#03AC20',
      background: '#DCFCE7',
      border: '#3CD856',
    },
  },
  {
    key: 2,
    id: '03',
    docSet: 'Stock Purchase Agreement',
    complete: 33,
    colors: {
      text: '#884DFF',
      background: '#F3E8FF',
      border: '#BF83FF',
    },
  },
];

const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.statTopRowContainer}>
        <div className={styles.todayStatContainer}>
          <div className={styles.todayHeaderContainer}>
            <div>
              <h3 className={styles.todayTitle}>Today's Statistics</h3>
              <p className={styles.todaySubtitle}>Document Summaries</p>
            </div>
            <button className={styles.todayExportButton}>
              <ExportIcon className={styles.todayExportIcon} />
              Export
            </button>
          </div>
          <div className={styles.todayCardsContainer}>
            {cardData.map((card) => {
              return (
                <StatisticCard
                  key={card.id}
                  icon={card.icon}
                  count={card.count}
                  category={card.category}
                  background={card.background}
                />
              );
            })}
          </div>
        </div>
        <SubmissionLineChart
          data={submissionChartParams.data}
          options={submissionChartParams.options}
        />
      </div>
      <div className={styles.statMidRowContainer}>
        <FormBarChart
          data={formChartParams.data}
          options={formChartParams.options}
        />
        <GenerationLineChart
          data={generationChartParams.data}
          options={generationChartParams.options}
        />
        <TargetBarChart
          data={targetChartParams.data}
          options={targetChartParams.options}
        />
      </div>
      <div className={styles.statBotRowContainer}>
        <div className={styles.documentStatContainer}>
          <h3 className={styles.documentTitle}>Top Documents</h3>
          <div className={styles.documentCategoriesContainer}>
            <div className={styles.documentIdContainer}>
              <p className={styles.documentCategoryText}>#</p>
            </div>
            <div className={styles.documentSetContainer}>
              <p className={styles.documentCategoryText}>Document Set</p>
            </div>
            <div className={styles.documentProgressContainer}>
              <p className={styles.documentCategoryText}>Progress</p>
            </div>
            <div className={styles.documentCompletedContainer}>
              <p className={styles.documentCategoryText}>Completed</p>
            </div>
          </div>
          <div className={styles.documentDataContainer}>
            {documentsData.map((doc) => {
              return (
                <DocumentRow
                  key={doc.key}
                  id={doc.id}
                  documentSet={doc.docSet}
                  complete={doc.complete}
                  colors={doc.colors}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
