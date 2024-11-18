"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import ImgSparrow from '@/public/참새ㅐ.png';
import ImgOwl from '@/public/올빼미ㅣ.png';
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
        <CardDescription>주 활동 유형</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center p-6">
        <div className="relative w-72 h-40">
          <div
            className={`absolute left-4 top-0 flex flex-col items-center justify-center rounded-full transition-all duration-300 overflow-hidden ${
              !isEveningType
                ? 'bg-blue-500 text-white z-10' 
                : 'bg-blue-200 text-blue-800 z-0'
            }`}
            style={{
              width: !isEveningType ? '200px' : '120px', // 아침형일 때 크기 30% 증가
              height: !isEveningType ? '200px' : '120px',
              // transform: !isEveningType ? 'scale(1.3)' : 'scale(1)',
              boxShadow: !isEveningType
                ? '0 10px 25px rgba(59, 130, 246, 0.5)'
                : '0 5px 15px rgba(59, 130, 246, 0.3)',
            }}
          >
            <span className={`z-10 relative transition-transform duration-300 ${
      !isEveningType ? 'text-xl font-bold opacity-100' : 'text-sm font-medium opacity-70'
    }`}>아침형 인간</span>
            <Image
              src={ImgSparrow}
              alt="Morning person"
              width={!isEveningType ? 100 : 70} // 이미지 크기 조정
              height={!isEveningType ? 100 : 70}
              className={`transition-all duration-300 ${
                !isEveningType ? 'opacity-100 filter-none' : 'opacity-70 filter-none'
              }`}
            />
          </div>
          
          <div
            className={`absolute right-4 top-0 flex flex-col items-center justify-center rounded-full transition-all duration-300 overflow-hidden ${
              isEveningType
                ? 'bg-purple-500 text-white z-10'
                : 'bg-purple-200 text-purple-800 z-0'
            }`}
            style={{
              width: isEveningType ? '200px' : '120px', // 저녁형일 때 크기 30% 증가
              height: isEveningType ? '200px' : '120px',
              // transform: isEveningType ? 'scale(1.3)' : 'scale(1)',
              boxShadow: isEveningType
                ? '0 10px 25px rgba(147, 51, 234, 0.5)'
                : '0 5px 15px rgba(147, 51, 234, 0.3)',
            }}
          >
            <span className={`z-10 relative font-medium transition-transform duration-300 ${
      isEveningType ? 'text-xl font-bold opacity-100' : 'text-sm font-medium opacity-70'
    }`}>저녁형 인간</span>
            <Image
              src={ImgOwl}
              alt="Evening person"
              width={isEveningType ? 100 : 70} // 이미지 크기 조정
              height={isEveningType ? 100 : 70}
              className={`transition-all duration-300 ${
                isEveningType ? 'opacity-100 filter-none' : 'opacity-70 filter-none'
              }`}
            />
          </div>
        </div>
      </CardContent>
    </Card>
    )
}
