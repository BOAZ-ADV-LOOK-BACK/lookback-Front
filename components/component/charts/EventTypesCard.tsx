'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from "axios";

interface ActivityResponse {
  [key: string]: number;
}

interface ChartData {
  name: string;
  value: number;
}

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

    return response.data.spendingTime;
  } catch (err) {
    console.error("API 호출 중 오류:", err);
    throw new Error("API 호출 중 오류가 발생했습니다.");
  }
};

function ActivityBarChart({ data }: { data: ChartData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 40,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis
          dataKey="name"
          padding={{ left: 10, right: 10 }}
          tick={{ fontSize: 12 }}
          tickMargin={16}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickMargin={16}
          width={40}
          label={{ value: '시간 (hours)', angle: -90, position: 'insideLeft', offset: 20 }}
        />
        <Tooltip
          cursor={{ fill: '#f3f4f6', opacity: 0.3 }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-2 border border-gray-200 rounded shadow">
                  <p className="font-medium">{label}</p>
                  <p className="text-blue-600">{`${payload[0].value}시간`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function ActivityChartContainer({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [chartData, setChartData] = React.useState<ChartData[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await weeklyActivityFetch();
        
        const transformedData = Object.entries(data).map(([key, value]) => ({
          name: key,
          value: value,
        }));

        setChartData(transformedData);
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
    return <div className="flex items-center justify-center h-[300px]">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-[300px] text-red-500">Error: {error}</div>;
  }

  return (
    <div className={className}>
      <ActivityBarChart data={chartData} />
    </div>
  );
}

export function WeeklyActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>카테고리별 투자시간</CardTitle>
        <CardDescription>Event Types</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ActivityChartContainer className="w-full h-full" />
      </CardContent>
    </Card>
  );
}

export default WeeklyActivityCard;