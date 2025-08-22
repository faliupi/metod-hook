'use client'
import ActionTooltip from '@/components/action-tooltip';
import { Card } from '@/components/ui/card';
import { RecognitionsSummary } from '@/hooks/api/recognition-service-hooks';
// import { RecognitionsSummary } from '@/lib/api/types.recognition';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import datalabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  datalabels
);

if (ChartJS.defaults.plugins.datalabels) {
  ChartJS.defaults.plugins.datalabels.display = false;
}
interface DoughnutChartProps {
  data: RecognitionsSummary
  height?: number
  width?: number
}

const DoughnutChart = ({ data, height = 400, width = 400 }: DoughnutChartProps) => {
  const defaultWidth = 400;
  const defaultHeight = 400;
  const isPipMode = width !== defaultWidth && height !== defaultHeight;
  const chartData = {
    labels: data?.labels,
    // labels: ['Positive', 'Negative'],
    datasets: [
      {
        label: 'Recognition',
        data: data?.datas,
        // data: {
        //   Recognition: 10,
        //   'Non-Recognition': 20,
        // },
        backgroundColor: ['rgba(84, 214, 51, 0.85)', 'rgba(214, 51, 51, 0.85)'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: true,
        formatter: (value: number | string) => (value ? `${value}%` : ''),
        color: '#fff',
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const emoji = () => {
    if (!data?.datas.length) return '';
    else if (data?.datas.includes(NaN)) return '😐';
    // else if (data.datas.includes(NaN)) return <span className={`${(width !== defaultWidth && height !== defaultHeight) ? 'text-sm' : ''}`}>😐</span>;
    else if (data?.datas[0] > data.datas[1]) return '🙂';
    // else if (data.datas[0] > data.datas[1]) return <span className={`${(width !== defaultWidth && height !== defaultHeight) ? 'text-sm' : ''}`}>🙂</span>;
    else return '🙁';
  };

  const generateTooltipLabelByEmoji = () => {
    if (!data?.datas.length) return '';
    else if (data?.datas.includes(NaN)) return '😐';
    else if (data?.datas[0] > data.datas[1]) return 'Keep it up! 😉';
    else return 'Hope you okay! 😔';
  }

  const message = generateTooltipLabelByEmoji();

  return (
    <Card className='py-[16px] px-[24px] mb-10  dark:bg-gray-800
    bg-white
    rounded-lg
    shadow-md

    dark:shadow-none
    dark:border dark:border-gray-700
    border' >
      <div className="mb-2">
        {/* <h5 className="font-semibold text-lg mb-0">{DOUGHNUT_CHART_TITLE}</h5> */}
        <h5 className="font-semibold text-lg mb-0">Summary</h5>
        {/* <Subtitle>{DOUGHNUT_CHART_SUBTITLE}</Subtitle> */}
        <p className="text-sm truncate text-black/[.60] m-0 dark:text-gray-300">
          Realtime Detailed Emotion
        </p>
      </div>
      <div className='relative' style={{ width: '100%', textAlign: 'center' }}>
        <div className="my-4">
          <Doughnut
            data={chartData}
            options={options}
            height={height}
            width={width}
          />
        </div>
        <div
        >

          <ActionTooltip label={message} className='text-base' >
            <div className={`absolute inset-0 ${isPipMode ? 'top-28' : 'top-44'}  cursor-default`}>
              {/* <span className='text-6xl'> */}
              <span className={(isPipMode) ? '' : 'text-6xl'}>
                {emoji()}
              </span>
            </div>
          </ActionTooltip>
        </div>
      </div>
    </Card>
  );
};

export default DoughnutChart;
