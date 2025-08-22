/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Card } from "@/components/ui/card";
import { RecognitionsOverview } from "@/hooks/api/recognition-service-hooks";
// import { RecognitionsOverview } from "@/lib/api/types.recognition";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useTheme } from "next-themes";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface RadarChartProps {
  data: RecognitionsOverview
}

const RadarChart = ({data}:RadarChartProps) => {
  const {theme} = useTheme();
  const chartData = {
    labels: data.labels,
    // labels: ["a", "b", "c"],
    datasets: [
      {
        data: data.datas,
        // data: {
        //   "a": 10,
        // },
        // backgroundColor: "rgba(25, 118, 210, 0.2)",
        // borderColor: "rgba(25, 118, 210, 1)",
        // pointBackgroundColor: "rgba(25, 118, 210, 1)",
        // pointHoverBackgroundColor: "#fff",
        // pointHoverBorderColor: "rgba(25, 118, 210, 1)",

        backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(25, 118, 210, 0.2)",
        borderColor: theme === "dark" ? "rgba(25, 118, 210, 1)" : "rgba(25, 118, 210, 1)",
        // borderColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(25, 118, 210, 1)",
        // pointBackgroundColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(25, 118, 210, 1)",
        pointBackgroundColor: theme === "dark" ? "rgba(25, 118, 210, 1)" : "rgba(25, 118, 210, 1)",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(25, 118, 210, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(25, 118, 210, 0.2)",
        },
        angleLines: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(25, 118, 210, 0.2)",
        },
        pointLabels: {
          font: {
            size: 12,
          },
        },
        ticks: {
          display: false,
          stepSize: 25,
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label({ formattedValue }: { formattedValue: string }) {
            return `${formattedValue}%`;
          },
        },
        displayColors: false,
      },
    },
  };
  return (
    <Card style={{ padding: "16px 24px" }} className="
      dark:bg-gray-800
      bg-white
      rounded-lg
      shadow-md

      dark:shadow-none
      dark:border dark:border-gray-700
      border
    ">
      <div className="mb-2">
        <h5 className="font-semibold text-lg mb-0">Overview</h5>
        {/* <Subtitle>{RADAR_CHART_SUBTITLE}</Subtitle> */}
        <p
          className="
          text-base
          text-gray-500
          dark:text-gray-400
          mb-0
        "
        >
          Emotion spread during this meeting
        </p>
      </div>
      <div className="text-center">
          <div className="my-4">
            <Radar
              data={chartData}
              options={options as any}
              height={400}
              width={400}
            />
          </div>
        </div>

    </Card>
  );
};

export default RadarChart;
