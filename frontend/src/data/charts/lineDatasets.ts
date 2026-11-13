import { ChartData, ChartOptions, ScriptableContext } from 'chart.js';
import { faker } from '@faker-js/faker';

interface ILineChart {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

// Used for "faker" datasets that aren't date based
function generateDataset(amount: number, min: number = 0, max: number = 100) {
  if (!amount || amount <= 0)
    throw new Error(
      'generateDataset() Error: amount argument is either empty or less than 1! Please provide a number greater than or equal to 1.',
    );

  const result = [];
  for (let i = 0; i < amount; i++) {
    result.push(faker.number.int({ min: min, max: max }));
  }
  console.log(`generateDataset() - Result: ${result}`);
  return result;
}

const submissionChartLabels: string[] = [
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

const endOfMonths: string[] = [
  '31',
  '28',
  '31',
  '30',
  '31',
  '30',
  '31',
  '31',
  '30',
  '31',
  '30',
  '31',
];

const date = new Date();
const month = submissionChartLabels[date.getMonth()];

const generationChartLabels = ['1st Week', '2nd Week', '3rd Week', '4th Week'];
const generationChartPlaceholder = [
  `Start of Month`,
  '8th',
  '12th',
  '16th',
  '20th',
  '24th',
  'End of Month',
];

export const submissionChartParams: ILineChart = {
  data: {
    labels: submissionChartLabels,
    datasets: [
      {
        label: 'New Submissions',
        data: submissionChartLabels.map(() =>
          faker.number.int({ min: 20, max: 55 }),
        ),
        borderColor: '#3CD856',
        backgroundColor: '#3CD85690',
        borderWidth: 4,
        borderJoinStyle: 'round',
        tension: 0.35,
        fill: false,
        order: 0,
      },
      {
        label: 'Updated Submissions',
        data: submissionChartLabels.map(() =>
          faker.number.int({ min: 20, max: 55 }),
        ),
        borderColor: '#BF83FF',
        backgroundColor: '#BF83FF90',
        borderWidth: 4,
        borderJoinStyle: 'round',
        tension: 0.35,
        fill: false,
        order: 1,
      },
      {
        label: 'Deleted Submissions',
        data: submissionChartLabels.map(() =>
          faker.number.int({ min: 20, max: 55 }),
        ),
        borderColor: '#FA5A7D',
        backgroundColor: '#FA5A7D90',
        borderWidth: 4,
        borderJoinStyle: 'round',
        tension: 0.35,
        fill: false,
        order: 2,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#464E5F',
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
        beginAtZero: true,
        ticks: {
          color: '#7B91B0',
          maxTicksLimit: 6,
          stepSize: 15,
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

export const generationChartParams: ILineChart = {
  data: {
    labels: generationChartLabels,
    datasets: [
      {
        label: 'This Month',
        data: generationChartLabels.map(() =>
          faker.number.int({ min: 20, max: 55 }),
        ),
        borderColor: '#769BFF',
        pointBackgroundColor: '#769BFF',
        // backgroundColor: '#BF83FF90',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(181, 201, 255, 1)');
          gradient.addColorStop(0.68, 'rgba(181, 201, 255, 0)');
          return gradient;
        },
        fill: 'start',
        borderWidth: 2,
        borderJoinStyle: 'round',
        tension: 0.35,
        order: 0,
      },
      {
        label: 'Last Month',
        data: generationChartLabels.map(() =>
          faker.number.int({ min: 20, max: 55 }),
        ),
        borderColor: '#3CD856',
        pointBackgroundColor: '#3CD856',
        // backgroundColor: '#3CD85690',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 100);
          gradient.addColorStop(0, 'rgba(173, 255, 202, 0.9)');
          gradient.addColorStop(0.9, 'rgba(173, 255, 202, 0)');

          return gradient;
        },
        fill: 'start',
        borderWidth: 2,
        borderJoinStyle: 'round',
        tension: 0.35,
        order: 1,
      },
    ],
  },
  options: {
    maintainAspectRatio: false,
    responsive: true,
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        stacked: true,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  },
};
