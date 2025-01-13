'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { CartesianGrid, XAxis, Line } from "recharts"
import { ResponsiveLine } from "@nivo/line"


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

function LinechartChart(props: any) {
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
            data={[
              { month: "January", desktop: 186 },
              { month: "February", desktop: 305 },
              { month: "March", desktop: 237 },
              { month: "April", desktop: 73 },
              { month: "May", desktop: 209 },
              { month: "June", desktop: 214 },
            ]}
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

  function LineChart(props: any) {
    return (
      <div {...props}>
        <ResponsiveLine
          data={[
            {
              id: "이번 주",
              data: [
                { x: "Mon", y: 43 },
                { x: "Tue", y: 137 },
                { x: "Wed", y: 61 },
                { x: "Thu", y: 145 },
                { x: "Fri", y: 26 },
                { x: "Sat", y: 154 },
                { x: "Sun", y: 104 }
              ],
            },
            {
              id: "지난 주",
              data: [
                { x: "Mon", y: 60 },
                { x: "Tue", y: 48 },
                { x: "Wed", y: 177 },
                { x: "Thu", y: 78 },
                { x: "Fri", y: 96 },
                { x: "Sat", y: 204 },
                { x: "Sun", y: 30 }
              ],
            },
          ]}
          margin={{ top: 10, right: 10, bottom: 60, left: 40 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 16,
          }}
          colors={["#2563eb", "#e11d48"]}
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
              anchor: "bottom", // 범례 위치 (하단)
            direction: "row", // 범례 방향 (가로)
            justify: false,
            translateX: 0, // X축 이동량
            translateY: 60, // Y축 이동량
            itemsSpacing: 10, // 범례 항목 간 간격
            itemWidth: 80, // 범례 항목 너비
            itemHeight: 20, // 범례 항목 높이
            itemDirection: "left-to-right", // 아이콘과 텍스트의 정렬 방향
            symbolSize: 12, // 범례 아이콘 크기
            symbolShape: "circle", // 범례 아이콘 모양
            itemTextColor: "#000", // 텍스트 색상
            effects: [
              {
                on: "hover", // 호버 효과
                style: {
                  itemTextColor: "#555", // 호버 시 텍스트 색상
                },
              },
            ],
            }
          ]}
          role="application"
        />
      </div>
    )
  }