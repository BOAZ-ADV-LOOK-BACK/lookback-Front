'use client';

import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GodLifeProgressCardProps {
  progress: number | null;
}

export function GodLifeProgressCard({ progress }: GodLifeProgressCardProps) {
  return (
    <Card className="flex-1 h-[200px]">
      <CardHeader>
        <CardDescription>
          지난 주 보다 14.8시간 더 활동했어요! <br />
          책 5권을 읽은 것 만큼 성장했어요!
        </CardDescription>
        <CardTitle>{progress !== null ? `${progress}%` : 'Loading...'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress 
          value={progress !== null ? progress : 0} 
          aria-label={`${progress}% progress 향상`} 
        />
      </CardContent>
    </Card>
  );
}