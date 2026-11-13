import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ReactComponent as LastMonthIcon } from './../data/assets/last-month-icon-23x9.svg';
import { ReactComponent as ThisMonthIcon } from './../data/assets/this-month-icon-23x9.svg';
import styles from './LineChart.module.css';

interface ILineProps {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

export const SubmissionLineChart = ({ data, options }: ILineProps) => {
  return (
    <div className={styles.submissionChartContainer}>
      <h3 className={styles.submissionTitle}>Submission Insights</h3>
      <div className={styles.submissionContainer}>
        <Line className={styles.lineChart} data={data} options={options} />
      </div>
      <div className={styles.submissionKeysContainer}>
        <div className={styles.submissionKey}>
          <div className={styles.greenColorKey} />
          <p className={styles.submissionKeyText}>New Submissions</p>
        </div>
        <div className={styles.submissionKey}>
          <div className={styles.purpleColorKey} />
          <p className={styles.submissionKeyText}>Updated Submissions</p>
        </div>
        <div className={styles.submissionKey}>
          <div className={styles.redColorKey} />
          <p className={styles.submissionKeyText}>Deleted Submissions</p>
        </div>
      </div>
    </div>
  );
};

export const GenerationLineChart = ({ data, options }: ILineProps) => {
  return (
    <div className={styles.generationChartContainer}>
      <h3 className={styles.generationTitle}>Document Generations</h3>
      <div className={styles.generationContainer}>
        <Line className={styles.lineChart} data={data} options={options} />
      </div>
      <hr className={styles.generationDivider} />
      <div className={styles.generationKeysContainer}>
        <div className={styles.generationKey}>
          <LastMonthIcon className={styles.generationKeyIcon} />
          <div className={styles.generationTextContainer}>
            <p className={styles.generationKeyText}>Last Month</p>
            <p className={styles.generationDataText}>48 Documents</p>
          </div>
        </div>
        <hr className={styles.generationKeyDivider} />
        <div className={styles.generationKey}>
          <ThisMonthIcon className={styles.generationKeyIcon} />
          <div className={styles.generationTextContainer}>
            <p className={styles.generationKeyText}>This Month</p>
            <p className={styles.generationDataText}>30 documents</p>
          </div>
        </div>
      </div>
    </div>
  );
};
