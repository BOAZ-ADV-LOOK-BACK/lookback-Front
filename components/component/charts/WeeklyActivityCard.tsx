'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { CartesianGrid, XAxis, Line } from "recharts"


export function WeeklyActivityCard() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // 백엔드에서 데이터 가져오기
    async function fetchData() {
      const response = await fetch("https://api.look-back.site/api/v1/calendar/dashboard-spendingTime"); // 백엔드 API 엔드포인트
      const data = await response.json();

      // 데이터를 LineChart 형식으로 변환
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
    }

    fetchData();
  }, []);


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



function LinechartChart{ chartData, ...props }: { chartData: any }) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            desktop: {
              label: "Desktop",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </div>
    )
  }
