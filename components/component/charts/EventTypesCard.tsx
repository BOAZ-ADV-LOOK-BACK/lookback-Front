'use client';

import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart } from "recharts"

export function EventTypesCard() {
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
        <BarChart className="w-full h-full" />
      </CardContent>
    </Card>
  );
}
