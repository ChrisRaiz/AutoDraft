import styles from './SubmissionStatistics.module.css';

interface IStatisticData {
  id: number;
  title: string;
  value: number;
  category: string;
  percentage: number;
}

const statisticCardData: IStatisticData[] = [
  {
    id: 0,
    title: 'Contact Information',
    value: 4,
    category: 'Fields Filled',
    percentage: 100,
  },
  {
    id: 1,
    title: 'Pre-Form Information',
    value: 7,
    category: 'Fields Filled',
    percentage: 88,
  },
  {
    id: 2,
    title: 'Will Form',
    value: 52,
    category: 'Fields Filled',
    percentage: 68,
  },
  {
    id: 3,
    title: 'Form Errors',
    value: 25,
    category: 'Errors',
    percentage: 28,
  },
];

const SubmissionStatisticsCard = ({
  statisticData,
}: {
  statisticData: IStatisticData;
}) => {
  return (
    <div className={styles.submissionStatisticsCardContainer}>
      <p className={styles.statisticTitleText}>{statisticData.title}</p>
      <div className={styles.statisticContent}>
        <p className={styles.statisticText}>
          <span className={styles.primaryStatisticText}>
            {statisticData.value}
          </span>
          <span className={styles.secondaryStatisticText}>
            &nbsp;{statisticData.category}
          </span>
        </p>
        <div className={styles.statisticPercentageContainer}>
          <p className={styles.statisticPercentageText}>
            {statisticData.percentage}%
          </p>
        </div>
      </div>
    </div>
  );
};

const SubmissionStatistics = ({
  statisticData,
}: {
  statisticData: IStatisticData[];
}) => {
  return (
    <div className={styles.submissionStatisticsContainer}>
      <div className={styles.statisticsBackground}>
        {statisticCardData.map((statistic) => {
          return <SubmissionStatisticsCard statisticData={statistic} />;
        })}
      </div>
    </div>
  );
};

export default SubmissionStatistics;
