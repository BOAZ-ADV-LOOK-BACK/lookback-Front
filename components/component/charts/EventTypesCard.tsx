'use client';

import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { CartesianGrid, XAxis, Bar } from "recharts"

import { BarChart } from "recharts"

export function EventTypesCard() {
  const data=[
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];
  return (
    <Card>
      <CardHeader>
        <CardDescription>Event Types</CardDescription>
        <CardTitle>
        <div className="flex gap-2">
            <div className="bg-primary rounded-full w-3 h-3" />
            <div className="bg-secondary rounded-full w-3 h-3" />
            <div className="bg-muted rounded-full w-3 h-3" />
        </div>
        </CardTitle>
      </CardHeader>
    <CardContent className="flex items-center justify-center h-full p-4">
        <BarchartCustomChart data={data} className="w-full h-full" />
    </CardContent>
</Card>
  );
}


function BarchartCustomChart(props: any, data: any) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[300px]"
      >
        <BarChart
          accessibilityLayer
          data={data}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}