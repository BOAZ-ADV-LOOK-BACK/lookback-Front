// 기준 변경해야 함
// 오전 6시 ~ 오후 6시 사이에 존재하는 활동보다
// 오후 6시 ~ 오전 6시 사이에 존재하는 활동 개수가 많으면 저녁형 인간

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

    const isEveningType = averageMidTime > 17;

    return (
        <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-center">
            이하윤님은 {isEveningType ? '저녁형' : '아침형'} 인간이에요
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <div className="relative w-72 h-40">
            <div
              className={`absolute left-4 top-0 flex items-center justify-center w-36 h-36 rounded-full transition-all duration-300 ${
                !isEveningType
                  ? 'bg-blue-500 text-white z-10 scale-105 shadow-lg'
                  : 'bg-blue-200 text-blue-800 z-0 shadow-md'
              }`}
              style={{
                boxShadow: !isEveningType
                  ? '0 10px 25px rgba(59, 130, 246, 0.5)'
                  : '0 5px 15px rgba(59, 130, 246, 0.3)',
              }}
            >
              <span className="text-sm font-medium">아침형 인간</span>
            </div>
            
            <div
              className={`absolute right-4 top-0 flex items-center justify-center w-36 h-36 rounded-full transition-all duration-300 ${
                isEveningType
                  ? 'bg-purple-500 text-white z-10 scale-105 shadow-lg'
                  : 'bg-purple-200 text-purple-800 z-0 shadow-md'
              }`}
              style={{
                boxShadow: isEveningType
                  ? '0 10px 25px rgba(147, 51, 234, 0.5)'
                  : '0 5px 15px rgba(147, 51, 234, 0.3)',
              }}
            >
              <span className="text-sm font-medium">저녁형 인간</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
}
