"use client";

import React, { useState, useEffect } from "react";
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
import axios from "axios";

export function CalendarEventVisualization() {
  const [weeklyData, setWeeklyData] = useState({ this_week: [], last_week: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyActivityData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          "https://api.look-back.site/api/v1/calendar/weekly-activity",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          setWeeklyData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch weekly activity data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyActivityData();
  }, []);

  // X축의 날짜 레이블을 요일로 변경
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const CustomXAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={10}>
          {dayNames[payload.value]}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-bold">{dayNames[data.day]}</p>
          <p>Start: {data.startTime}:00</p>
          <p>End: {data.endTime}:00</p>
          <p>Duration: {data.duration} hours</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p>Loading activity data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>나는 주로 언제 활동할까?🏃🏻‍♂️</CardTitle>
        <CardDescription>주 활동 시간대</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]" aria-label="Calendar event visualization chart">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
              style={{
                background: "linear-gradient(to bottom, #ffebcd 50%, #2c3e50)",
                borderRadius: "8px"
              }}
            >
              <XAxis
                type="number"
                dataKey="day"
                domain={[0, 6]}
                ticks={[0, 1, 2, 3, 4, 5, 6]}
                tick={<CustomXAxisTick />}
                axisLine={{ stroke: "#ffffff" }}
                tickLine={{ stroke: "#ffffff" }}
                tick={{ fill: "#ffffff", fontSize: 10 }}
              />
              <YAxis
                type="number"
                dataKey="startTime"
                name="Time"
                domain={[24, 0]}
                ticks={[0, 6, 12, 18, 24]}
                tickFormatter={(value) => `${value}:00`}
                axisLine={{ stroke: "#0000FF" }}
                tickLine={{ stroke: "#0000FF" }}
                tick={{ fill: "#0000FF", fontSize: 10 }}
                reversed
              />
              <ZAxis type="number" dataKey="duration" range={[20, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={12} stroke="#666" strokeDasharray="3 3" />
              
              {/* 이번 주 데이터 */}
              {weeklyData.this_week.map((event, index) => (
                <ReferenceLine
                  key={`this-week-${index}`}
                  segment={[
                    { x: event.day, y: event.startTime },
                    { x: event.day, y: event.endTime }
                  ]}
                  stroke="#ff4d4d"
                  strokeWidth={3}
                />
              ))}
              
              {/* 지난 주 데이터 (반투명하게 표시) */}

              {/* 중간선 */}
              <ReferenceLine y={12} stroke="#666" strokeDasharray="3 3" />

            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default CalendarEventVisualization;