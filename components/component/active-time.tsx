"use client";

import React from "react";
import {
  ComposedChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Line
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 가상의 이벤트 데이터 (실제로는 Google Calendar API에서 받아온 데이터를 사용해야 합니다)
const events = [
  { day: 1, startTime: 9, endTime: 17 },
  { day: 32, startTime: 10, endTime: 15 },
  { day: 60, startTime: 14, endTime: 18 },
  { day: 91, startTime: 8, endTime: 12 },
  { day: 152, startTime: 13, endTime: 19 },
  { day: 213, startTime: 11, endTime: 16 },
  { day: 274, startTime: 9, endTime: 14 },
  { day: 305, startTime: 10, endTime: 17 },
  { day: 365, startTime: 8, endTime: 18 }
];

// 데이터를 중간 지점 형식으로 변환
const eventData = events.map((event) => ({
  day: event.day,
  midTime: (event.startTime + event.endTime) / 2,
  startTime: event.startTime,
  endTime: event.endTime,
  duration: event.endTime - event.startTime
}));

// 월의 첫 날 계산 (간단한 버전, 윤년은 고려하지 않음)
const monthStarts = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-bold">Day: {data.day}</p>
        <p>Start: {data.startTime}:00</p>
        <p>End: {data.endTime}:00</p>
        <p>Duration: {data.duration} hours</p>
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = ({ x, y, payload }) => {
  const index = monthStarts.indexOf(payload.value);
  if (index !== -1) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={10}>
          {monthNames[index]}
        </text>
      </g>
    );
  }
  return null;
};

// 낮/밤 스타일을 적용하는 함수
const getLineStyle = (midTime) => {
  if (midTime <= 12) {
    // 밤 스타일 (차트 아래쪽)
    return { stroke: "#fff", strokeWidth: 2, strokeDasharray: "5 5" };
  } else {
    // 낮 스타일 (차트 위쪽)
    return { stroke: "#ffae42", strokeWidth: 2 };
  }
};

export function CalendarEventVisualization() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>나는 주로 언제 활동할까?</CardTitle>
        <CardDescription>주 활동 시간대</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]" aria-label="Calendar event visualization chart">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
              style={{
                background: "linear-gradient(to bottom, #ffebcd 50%, #2c3e50)", // 위는 밝은색, 아래는 어두운색
                borderRadius: "8px"
              }}
            >
              <XAxis
                type="number"
                dataKey="day"
                name="Day"
                domain={[1, 365]}
                ticks={monthStarts}
                tick={<CustomXAxisTick />}
                axisLine={{ stroke: "#ffffff" }}  // 축 색상
                tickLine={{ stroke: "#ffffff" }}  // 축의 tick 선 색상
                tick={{ fill: "#ffffff", fontSize: 10}}        // 글씨 색상
              />
              <YAxis
                type="number"
                dataKey="midTime"
                name="Time"
                domain={[24, 0]}
                ticks={[0, 6, 12, 18, 24]}
                tickFormatter={(value) => `${value}:00`}
                axisLine={{ stroke: "#0000FF" }}  // Y축 색상
                tickLine={{ stroke: "#0000FF" }}  // Y축의 tick 선 색상
                tick={{ fill: "#0000FF",fontSize: 10 }}        // Y축 글씨 색상
                reversed
              />
              <ZAxis type="number" dataKey="duration" range={[20, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={12} stroke="#666" strokeDasharray="3 3" />
              {eventData.map((event, index) => {
                const isBeforeNoon = event.midTime <=12;
                return (
                <ReferenceLine
                  key={`line-${index}`}
                  segment={[
                    { x: event.day, y: event.startTime },
                    { x: event.day, y: event.endTime }
                  ]}
                  stroke={isBeforeNoon ? "#8884d8" : "#ff4d4d"}
                  strokeWidth={7}
                />
              );
            })}
              
              <Scatter 
                data={eventData}
                fill="#000000"
                shape="circle"
              />

              <Line
                type="monotone"
                data={eventData}
                dataKey="midTime"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                connectNulls={true}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
