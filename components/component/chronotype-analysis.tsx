"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import ImgSparrow from '@/public/sparrow_transparent.png';
import ImgOwl from '@/public/owl_transparent.png';
import Image from "next/image";

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
        <CardTitle> 이하윤님은 {isEveningType ? '저녁형' : '아침형'} 인간이에요 </CardTitle>
        <CardDescription>매일 활동 시간</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center p-6">
        <div className="relative w-72 h-40">
          <div
            className={`absolute left-4 top-0 flex flex-col items-center justify-center w-36 h-36 rounded-full transition-all duration-300 overflow-hidden ${
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
            <span className="text-sm font-medium z-10 relative">아침형 인간</span>
            <Image
              src={ImgSparrow}
              alt="Morning person"
              width={70}
              height={70}
              className="opacity-70"
            />
          </div>
          
          <div
            className={`absolute right-4 top-0 flex flex-col items-center justify-center w-36 h-36 rounded-full transition-all duration-300 overflow-hidden ${
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
            <span className="text-sm font-medium z-10 relative">저녁형 인간</span>
            <Image
              src={ImgOwl}
              alt="Evening person"
              width={70}
              height={70}
              className="opacity-70"
            />
          </div>
        </div>
      </CardContent>
    </Card>
    )
}
