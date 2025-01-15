'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { ResponsiveLine } from '@nivo/line';
import axios from "axios";


//백엔드에서 받아올 데이터 형식 
interface ActivityResponse {
  [key: string]: number;
}

//차트 그릴 때 사용할 데이터 형식
interface ChartData {
  x: string;
  y: number;
}

interface TransformedData {
  id: string;
  data: ChartData[];
}

interface LineChartProps {
  data: TransformedData[];
}

//백엔드 API 호출 함수 
const weeklyActivityFetch = async (): Promise<ActivityResponse> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "/login";
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const response = await axios.post(
      "https://api.look-back.site/api/v1/calendar/dashboard-spendingTime",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP 상태 코드 오류: ${response.status}`);
    }

    console.log("호출된 data:", response.data.spendingTime)

    return response.data.spendingTime
  } catch (err: Error | unknown) {
    console.error("API 호출 중 오류:", err);
    throw new Error("API 호출 중 오류가 발생했습니다.");
  }
};

// 라인 차트 컴포넌트
function LineChart({ data }: LineChartProps) {
  return (
    <div className="h-[300px]"> {/* 명시적인 높이 지정 */}
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 60, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
          min: 'auto',
          max: 'auto',
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 60,
            itemsSpacing: 10,
            itemWidth: 80,
            itemHeight: 20,
            itemDirection: "left-to-right",
            symbolSize: 12,
            symbolShape: "circle",
            itemTextColor: "#000",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#555",
                },
              },
            ],
          },
        ]}
        role="application"
      />
    </div>
  );
}

// 라인차트 컨테이너 컴포넌트
function LinechartChart({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [chartData, setChartData] = React.useState<TransformedData[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await weeklyActivityFetch();
        
        const transformedData = Object.entries(data).map(([key, value]) => ({
          x: key,
          y: value,
        }));

        

        setChartData([
          {
            id: "활동별 소요 시간",
            data: transformedData,
          },
        ]);
        setError(null);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={className}>
      <ChartContainer>
        <LineChart data={chartData} />
      </ChartContainer>
    </div>
  );
}

// 메인 카드 컴포넌트
export function WeeklyActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>이번 주 이하윤님의 활동</CardTitle>
        <CardDescription>Tasks Completed</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full p-1">
        <LinechartChart className="w-full h-full" />
      </CardContent>
    </Card>
  );
}

export default WeeklyActivityCard;


