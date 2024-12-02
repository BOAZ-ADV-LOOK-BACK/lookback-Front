'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { Pie, PieChart } from "recharts"

export function CategoryDistributionCard() {
  return (
    <Card className="flex-1 h-[400px]">
      <CardHeader>
        <CardTitle>내가 가장 많이 수행한 카테고리는?</CardTitle>
        <CardDescription>일정 카테고리 비율</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0 overflow-hidden">
        <div className="w-full h-full max-h-[100%] flex items-center justify-center translate-y-[-5%]">
          <PiechartcustomChart className="aspect-[4/3] w-[100%] h-auto" />
        </div>
      </CardContent>
    </Card>
  );
}



function PiechartcustomChart(props: any) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            visitors: {
              label: "Visitors",
            },
            chrome: {
              label: "Chrome",
              color: "hsl(var(--chart-1))",
            },
            safari: {
              label: "Safari",
              color: "hsl(var(--chart-2))",
            },
            firefox: {
              label: "Firefox",
              color: "hsl(var(--chart-3))",
            },
            edge: {
              label: "Edge",
              color: "hsl(var(--chart-4))",
            },
            other: {
              label: "Other",
              color: "hsl(var(--chart-5))",
            },
          }}
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={[
                { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
                { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
                { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
                { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
                { browser: "other", visitors: 90, fill: "var(--color-other)" },
              ]}
              dataKey="visitors"
              nameKey="browser"
            />
          </PieChart>
        </ChartContainer>
      </div>
    )
  }