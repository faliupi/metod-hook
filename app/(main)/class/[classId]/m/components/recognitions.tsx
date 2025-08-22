// import LineChart from "../charts/line-chart";
'use client'
// import  { RecognitionsDetail, RecognitionsOverview, RecognitionsSummary } from "@/lib/api/types.recognition";
// import DoughnutChart from "../charts/doughnut-chart";
// import LineChart from "../charts/line-chart";
// import RadarChart from "../charts/radar-chart";
import { usePathname } from "next/navigation";
import LineChart from "@/components/charts/line-chart";
import RadarChart from "@/components/charts/radar-chart";
import DoughnutChart from "@/components/charts/doughnut-chart";
import { Card } from "@/components/ui/card";
import { RecognitionsDetail, RecognitionsOverview, RecognitionsSummary } from "@/hooks/api/recognition-service-hooks";

interface RecognitionsProps {
  recognitionDetail: RecognitionsDetail;
  recognitionOverview: RecognitionsOverview;
  recognitionSummary: RecognitionsSummary;
  withImage?: boolean;
}

export default function Recognitions({
  recognitionDetail,
  recognitionOverview,
  recognitionSummary,
  // withImage = false,
}: RecognitionsProps) {
  const pathname = usePathname();

  // console.log('recognition overview', recognitionOverview)
  // console.log('recognition detail', recognitionDetail)
  // console.log('recognition summary', recognitionSummary)



  return (
    <div className="w-full space-y-2">
      {pathname.includes('/class') && (
        <div>
          <Card style={{ padding: '16px 24px' }}>
            <div className="mb-2">
              {/* <h1>Line Chart</h1> */}
              <LineChart data={recognitionDetail} />
            </div>
            {/* {detailData ? (
          <LineChart data={detailData} withImage={withImage} />
        ) : (
          <Card bodyStyle={{ padding: '16px 24px' }}>
            <div className="mb-2">
              <h5 className="font-semibold text-lg mb-0">
                {LINE_CHART_TITLE}
              </h5>
              <Subtitle>{LINE_CHART_SUBTITLE}</Subtitle>
            </div>
            <Empty />
          </Card>
        )} */}
          </Card>
        </div>
      )}
      <div className="grid grid-cols-1  md:grid-cols-2 gap-2">
        <div>
          <RadarChart data={recognitionOverview} />
          {/* {overviewData ? (
          <RadarChart data={overviewData} />
        ) : (
          <Card bodyStyle={{ padding: '16px 24px' }}>
            <div className="mb-2">
              <h5 className="font-semibold text-lg mb-0">
                {RADAR_CHART_TITLE}
              </h5>
              <Subtitle>{RADAR_CHART_SUBTITLE}</Subtitle>
            </div>
            <Empty />
          </Card>
        )} */}
        </div>
        <div>
          <DoughnutChart data={recognitionSummary} />
          {/* {summaryData ? (
          <DoughnutChart data={summaryData} />
        ) : (
          <Card bodyStyle={{ padding: '16px 24px' }}>
            <div className="mb-2">
              <h5 className="font-semibold text-lg mb-0">
                {DOUGHNUT_CHART_TITLE}
              </h5>
              <Subtitle>{DOUGHNUT_CHART_SUBTITLE}</Subtitle>
            </div>
            <Empty />
          </Card>
        )} */}
        </div>
      </div>
    </div>
  );
}
