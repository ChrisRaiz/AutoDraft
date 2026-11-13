import { ChartData, ChartOptions } from 'chart.js';
import { faker } from '@faker-js/faker';

interface IBarChart {
  data: ChartData<'bar'>;
  options: ChartOptions<'bar'>;
}

const formChartLabels: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const monthLabels: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function getTargetLabels(amount: number) {
  let labels: string[] = [];

  if (currentMonth < amount) {
    let difference = monthLabels.length - (currentMonth - 5);

    while (difference < monthLabels.length) {
      labels.push(monthLabels[difference]);
    }

    let i = 0;
    while (labels.length < amount) {
      labels.push(monthLabels[i]);
      i++;
    }
  } else {
    labels = monthLabels.slice(currentMonth - (amount - 1), currentMonth);
  }

  return labels;
}

const date = new Date();
const currentMonth = date.getMonth();
const targetChartLabels: string[] = getTargetLabels(6);

// "Jotform Turnover" Bar Chart
export const formChartParams: IBarChart = {
  data: {
    labels: formChartLabels,
    datasets: [
      {
        categoryPercentage: 0.4,
        label: 'Form Invites',
        data: formChartLabels.map(() =>
          faker.number.int({ min: 20, max: 100 }),
        ),
        backgroundColor: '#83A4FF',
        borderColor: '#83A4FF',
        borderRadius: 2,
      },
      {
        categoryPercentage: 0.4,
        label: 'Form Responses',
        data: formChartLabels.map(() =>
          faker.number.int({ min: 20, max: 100 }),
        ),
        backgroundColor: '#3CD856',
        borderColor: '#3CD856',
        borderRadius: 2,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#7B91B0',
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: '#7B91B0',
          maxTicksLimit: 6,
          stepSize: 20,
          font: {
            size: 10,
          },
        },
        grid: {
          color: '#00000008',
        },
        border: {
          display: false,
        },
      },
    },
  },
};

// "Reality vs Target" Bar Chart
export const targetChartParams: IBarChart = {
  data: {
    labels: targetChartLabels,
    datasets: [
      {
        label: 'Reality',
        data: targetChartLabels.map(() =>
          faker.number.int({ min: 20, max: 100 }),
        ),
        barThickness: 'flex',
        backgroundColor: '#769BFF',
        borderColor: '#769BFF',
        borderRadius: 3,
        borderWidth: 0,
        order: 0,
      },
      {
        label: 'Target',
        data: targetChartLabels.map(() =>
          faker.number.int({ min: 20, max: 100 }),
        ),
        barThickness: 'flex',
        backgroundColor: '#BF83FF',
        borderColor: '#BF83FF',
        borderRadius: 3,
        order: 0,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#7B91B0',
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
          color: '#7B91B0',
          maxTicksLimit: 6,
          stepSize: 20,
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
          color: '#00000008',
        },
        border: {
          display: false,
        },
      },
    },
  },
};
