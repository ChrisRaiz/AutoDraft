import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ReactComponent as RealityIcon } from './../data/assets/reality-icon-14x14.svg';
import { ReactComponent as TargetIcon } from './../data/assets/target-icon-14x14.svg';
import styles from './BarChart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

interface IBarProps {
  data: ChartData<'bar'>;
  options: ChartOptions<'bar'>;
}

export const FormBarChart = ({ data, options }: IBarProps) => {
  return (
    <div className={styles.formStatContainer}>
      <h3 className={styles.submissionTitle}>Form Turnovers</h3>
      <div className={styles.submissionContainer}>
        <Bar className={styles.barChart} data={data} options={options} />
      </div>
      <div className={styles.submissionKeysContainer}>
        <div className={styles.submissionKey}>
          <div className={styles.greenColorKey} />
          <p className={styles.submissionKeyText}>Form Invites</p>
        </div>
        <div className={styles.submissionKey}>
          <div className={styles.purpleColorKey} />
          <p className={styles.submissionKeyText}>Form Responses</p>
        </div>
      </div>
    </div>
  );
};

export const TargetBarChart = ({ data, options }: IBarProps) => {
  return (
    <div className={styles.targetStatContainer}>
      <h3 className={styles.targetTitle}>Reality vs Target</h3>
      <div className={styles.targetContainer}>
        <Bar className={styles.barChart} data={data} options={options} />
      </div>
      <div className={styles.targetKeysContainer}>
        <div className={styles.targetKey}>
          <div className={styles.realityIconContainer}>
            <RealityIcon className={styles.targetKeyIcon} />
          </div>
          <div className={styles.targetTextContainer}>
            <p className={styles.targetKeyText}>Reality Submissions</p>
            <p className={styles.targetKeySubtext}>March Total</p>
          </div>
          <p className={styles.targetRealityData}>23</p>
        </div>
        <div className={styles.targetKey}>
          <div className={styles.targetIconContainer}>
            <TargetIcon className={styles.targetKeyIcon} />
          </div>
          <div className={styles.targetTextContainer}>
            <p className={styles.targetKeyText}>Target Submissions</p>
            <p className={styles.targetKeySubtext}>March Goal</p>
          </div>
          <p className={styles.targetTargetData}>50</p>
        </div>
      </div>
    </div>
  );
};
