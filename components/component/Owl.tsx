
"use client"

import React from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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
  { day: 365, startTime: 8, endTime: 18 },
]

// 데이터를 중간 지점 형식으로 변환
const eventData = events.map(event => ({
  day: event.day,
  midTime: (event.startTime + event.endTime) / 2,
  startTime: event.startTime,
  endTime: event.endTime,
  duration: event.endTime - event.startTime,
}))

// 월의 첫 날 계산 (간단한 버전, 윤년은 고려하지 않음)
const monthStarts = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="font-bold">Day: {data.day}</p>
        <p>Start: {data.startTime}:00</p>
        <p>End: {data.endTime}:00</p>
        <p>Duration: {data.duration} hours</p>
      </div>
    )
  }
  return null
}

const CustomXAxisTick = ({ x, y, payload }) => {
  const index = monthStarts.indexOf(payload.value)
  if (index !== -1) {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={12}>
          {monthNames[index]}
        </text>
      </g>
    )
  }
  return null
}

export function CalendarEventVisualization() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Calendar Event Visualization</CardTitle>
        <CardDescription>Visualizing event durations throughout the year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[600px]" aria-label="Calendar event visualization chart">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 40 }}>
              <XAxis 
                type="number" 
                dataKey="day" 
                name="Day" 
                domain={[1, 365]} 
                ticks={monthStarts}
                tick={<CustomXAxisTick />}
                axisLine={{ stroke: '#666' }}
                tickLine={{ stroke: '#666' }}
              />
              <YAxis 
                type="number" 
                dataKey="midTime" 
                name="Time" 
                domain={[24, 0]} 
                ticks={[0, 6, 12, 18, 24]}
                tickFormatter={(value) => `${value}:00`}
                axisLine={{ stroke: '#666' }}
                tickLine={{ stroke: '#666' }}
                reversed
              />
              <ZAxis type="number" dataKey="duration" range={[20, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={12} stroke="#666" strokeDasharray="3 3" />
              {eventData.map((event, index) => (
                <ReferenceLine
                  key={`line-${index}`}
                  segment={[{ x: event.day, y: event.startTime }, { x: event.day, y: event.endTime }]}
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              ))}
              <Scatter
                data={eventData}
                fill="#8884d8"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}