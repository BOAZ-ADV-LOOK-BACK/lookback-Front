"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChronotypeAnalysisProps {
  eventData: Array<{
    midTime: number
  }>
}

export function ChronotypeAnalysis({ eventData }: ChronotypeAnalysisProps = {
  eventData: [
    { midTime: 13 },
    { midTime: 12.5 },
    { midTime: 16 },
    { midTime: 10 },
    { midTime: 16 },
    { midTime: 13.5 },
    { midTime: 11.5 },
    { midTime: 13.5 },
    { midTime: 13 }
  ]
}) {
    let averageMidTime = 0;
    if (eventData && eventData.length > 0) {
        averageMidTime = eventData.reduce((sum, event) => sum + event.midTime, 0) / eventData.length;
    }

    const isEveningType = averageMidTime > 12.5;

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-center">
            이하윤님은 {isEveningType ? '저녁형' : '아침형'} 인간이에요
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <div className="relative w-64 h-40">
            <div
              className={`absolute left-0 top-0 flex items-center justify-center w-32 h-32 rounded-full transition-all duration-300 ${
                !isEveningType
                  ? 'bg-blue-500 text-white z-10 scale-110'
                  : 'bg-blue-200 text-blue-800 z-0'
              }`}
            >
              <span className="text-sm font-medium">아침형 인간</span>
            </div>
            <div
              className={`absolute right-0 top-0 flex items-center justify-center w-32 h-32 rounded-full transition-all duration-300 ${
                isEveningType
                  ? 'bg-purple-500 text-white z-10 scale-110'
                  : 'bg-purple-200 text-purple-800 z-0'
              }`}
            >
              <span className="text-sm font-medium">저녁형 인간</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
}
