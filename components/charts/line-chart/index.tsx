/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
// import { Card } from "../ui/card";
import { Card } from "@/components/ui/card";
import {
  Chart as ChartJs,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip as ChartTooltip,
  CategoryScale,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Style from "./line-chart.module.css";
// import { RecognitionsDetail } from "@/lib/api/types.recognition";
import zoomPlugin from 'chartjs-plugin-zoom';
import { useTheme } from "next-themes";
import ActionTooltip from "@/components/action-tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import CustomLegend from "../custom-legend";
import { Info } from "lucide-react";
import { RecognitionsDetail } from "@/hooks/api/recognition-service-hooks";
import 'chartjs-adapter-date-fns'; // Impor adaptor untuk mendukung objek Date
import { reverse } from "node:dns";



interface LineChartProps {
  data: RecognitionsDetail;
  withImage?: boolean;
}

ChartJs.register(
  LinearScale,
  PointElement,
  LineElement,
  zoomPlugin,
  Title,
  ChartTooltip,
  Legend,
  CategoryScale,
  TimeScale
);


const LineChart = ({ data, withImage }: LineChartProps) => {
  const { theme } = useTheme();
  // console.log('data', data);
  const [currentIndex, setCurrentIndex] = useState();
  const [isSimple, setsSimple] = useState(true);
  const [legendArray, setLegendArray] = useState<{ index: number; isHidden: boolean; strokeStyle: string; text: string; }[]>([]);  // const [chartElement, setChartElement] = useState();
  const [chartElement, setChartElement] = React.useState<ChartJs | null>(null);
  const [isLong, setIsLong] = useState(false);
  const [width, setWidth] = useState();

  // const data = {};
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  const simpleData = (data: any) => {
    return data.slice(-15);
  };

  const chartData = {
    labels: !isSimple ? data.labels : simpleData(data.labels),

    datasets: [
      {
        label: "Neutral",
        data: !isSimple ? data.neutral : simpleData(data.neutral),
        backgroundColor: "transparent",
        borderColor: "#00B8D4",
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: "Happy",
        data: !isSimple ? data.happy : simpleData(data.happy),
        backgroundColor: "transparent",
        borderColor: "#64DD17",
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: "Sad",
        data: !isSimple ? data.sad : simpleData(data.sad),
        backgroundColor: "transparent",
        borderColor: "#001AFF",
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: "Angry",
        data: !isSimple ? data.angry : simpleData(data.angry),
        backgroundColor: "transparent",
        borderColor: "#FF0000",
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: "Fearful",
        data: !isSimple ? data.fearful : simpleData(data.fearful),
        backgroundColor: "transparent",
        borderColor: "#bf00ff",
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: "Disgusted",
        data: !isSimple ? data.disgusted : simpleData(data.disgusted),
        backgroundColor: "transparent",
        borderColor: "#212121",
        borderWidth: 1,
        tension: 0.3,
      },
      {
        label: "Surprised",
        data: !isSimple ? data.surprised : simpleData(data.surprised),
        backgroundColor: "transparent",
        borderColor: "#FFB700",
        borderWidth: 1,
        tension: 0.3,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        itemSort(a: any, b: any) {
          return b.raw - a.raw;
        },
        callbacks: {
          title: (context: any) => {
            setCurrentIndex(context[0].dataIndex);
            return new Date(context[0].label).toLocaleString("en-GB");
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
          threshold: 5,
          rangeMax: {
            x: null,
          },
        },
        zoom: {
          wheel: {
            enabled: !isSimple,
          },
          pinch: {
            enabled: !isSimple,
          },
          mode: "x",
        },
      },
    },
    scales: {

      x: {
        // reverse: true,
        ticks: {
          autoSkip: false,
          callback: function (this: any, value: any): string | undefined {
            if (this && typeof this.getLabelForValue === 'function') {
              return `${new Date(this.getLabelForValue(value)).toLocaleTimeString("id-ID")}`;
            }
            return undefined;
          },
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Timestamp",
          font: {
            size: 13,
          },
        },
      },
      y: {
        ticks: {
          stepSize: 0.1,
        },
        grid: {
          color: function () {
            return theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(25, 118, 210, 0.2)";
          },
        },
        title: {
          display: true,
          text: "Probability",
          font: {
            size: 13,
          },
        },
      },
    },
  };

  const handleSimpleMode = (checked: any) => {
    // setCurrentIndex();
    setsSimple(checked);
  };

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chart = ChartJs.getChart(chartRef.current) || null;
      setChartElement(chart);
      const generateLabels = chart?.options?.plugins?.legend?.labels?.generateLabels;

      if (generateLabels) {
        const legend = generateLabels(chart);
        const legendArr: { index: number, isHidden: boolean, strokeStyle: string, text: string }[] = [];
        legend.forEach((item) => {
          const index = item.datasetIndex ?? 0;
          const isHidden = item.hidden ?? false; // Provide a default value
          const strokeStyle = typeof item.strokeStyle === 'string' ? item.strokeStyle : '';
          const text = item.text;
          legendArr.push({ index, isHidden, strokeStyle, text });
        });

        if (legendArr) { // Correct the typo here
          setLegendArray(legendArr);
        }
      }
    }
  }, []);

  useEffect(() => {
    setIsLong(data.labels.length > 15);
    // setIsLong(false);
    // setWidth(chartContainerRef?.current?.offsetWidth + data.labels.length * 10);
  }, [data]);


  return (
    <Card className="py-[16px] px-[24px] w-full">
      <div className="flex justify-between mb-2">
        <div>
          <h5 className="font-semibold text-lg mb-0 flex items-center gap-2">
            Details
            <ActionTooltip label="Scroll on chart to see data more clearly" >

              <Info className="w-3 " />
            </ActionTooltip>
          </h5>
          {/* <Subtitle>{LINE_CHART_SUBTITLE}</Subtitle> */}
          <p className="text-sm truncate text-black/[.60] dark:text-gray-300 m-0">
            Realtime Detailed Emotion
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* <ExportModal data={data} /> */}
          <div className="flex items-center space-x-1">

            <ActionTooltip label="Only show the last 15 data" >
              <Label htmlFor="simpleMode">Last 15 data</Label>
            </ActionTooltip>
            <Switch id="simpleMode"
              defaultChecked={isSimple}
              onCheckedChange={handleSimpleMode} />

          </div>
        </div>
      </div>

      <div className="text-center my-4">
        <div className="flex justify-center space-x-4 mb-4 ">
          {/* <ActionTooltip label="Neutral" >
            
          </ActionTooltip> */}
          <span>Filter Emotions: </span>
          {legendArray &&
            legendArray.map((item) => {
              return (
                <CustomLegend
                  key={item.index}
                  item={item}
                  chartElement={chartElement}
                />
              );
            })}
        </div>
      </div>
      <div
        className={`${Style.lineChart} overflow-x-scroll w-full`}
        style={{ overflowX: "scroll" }}
      >
        <div
          ref={chartContainerRef}
          style={{
            position: "relative",
            width: !isSimple && isLong ? `100%` : "100%",
          }}
        >
          <Line
            ref={chartRef}
            data={chartData}
            options={options as any}
            height={400}
          />
        </div>
        <span className="text-black/[.60] dark:text-white text-xs">
          * Emotion captured every 5 second interval
        </span>
      </div>
    </Card>
  );
};

export default LineChart;
