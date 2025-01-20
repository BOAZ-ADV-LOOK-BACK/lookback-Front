"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import ImgSparrow from '@/public/참새ㅐ.png';
import ImgOwl from '@/public/올빼미ㅣ.png';
import Image from "next/image";
import axios from "axios";

interface Event {
  day: number;
  startTime: number;
  endTime: number;
  duration: number;
}

interface WeeklyData {
  this_week: Event[];
  last_week: Event[];
}

export function ChronotypeAnalysis() {
  const [weeklyData, setWeeklyData] = useState<WeeklyData>({ this_week: [], last_week: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);


  useEffect(() => {
    const fetchWeeklyActivityData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const userName = localStorage.getItem("userName");
        setUserName(userName || "사용자");
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

  // 평균 활동 중간 시간 계산
  const calculateAverageMidTime = (events: Event[]) => {
    if (!events.length) return 0;
    
    return events.reduce((sum, event) => {
      // 중간 시간 계산
      const midTime = (event.startTime + event.endTime) / 2;
      return sum + midTime;
    }, 0) / events.length;
  };

  const averageMidTime = calculateAverageMidTime(weeklyData.this_week);
  const isEveningType = averageMidTime >= 17; // 오후 3시 이후를 기준으로 저녁형 판단

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <p>Loading chronotype data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
    return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle> {userName}님은 {isEveningType ? '저녁형' : '아침형'} 인간이에요{isEveningType ? '🌙' : '☀️'}</CardTitle>
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
