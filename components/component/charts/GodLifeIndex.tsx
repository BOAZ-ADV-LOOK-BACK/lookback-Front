// [갓생 지수 산정 방식]
// x = 하루 10시간 이상 활동한 날이 20번인 달
// 갓생지수(%단위)는 다음과 같이 산정 x/12*100 (%)

// [디자인]
// 세로로(혹은 가로로) 긴 직사각형을 갓생지수% 만큼 채우는 디자인으로 선정

// [ToDo]
// 필요 module import
// 백엔드에 요청해서 데이터 가져오기
// 그리기(동적으로 가능?)

"use client"

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"

// API 호출 함수
const fetchProgress = async (): Promise<number> => {
  try {
    // const response = await fetch("/api/getdata");
    // if (!response.ok) {
    //   throw new Error("데이터를 가져오는 데 실패했습니다.");
    // }

    // // data: 하루 10시간 이상 활동한 날이 20번인 달
    // const data = await response.json();
    // const godLifeIndex = (data.activeDays / 12) * 100;

    const godLifeIndex = Math.floor((7 / 12) * 100); // 추후 데이터를 API가져와서 갈아끼우면 여기 주석처리, 위쪽에 주석처리한 부분을 사용해야함
    
    return Math.min(100, Math.max(0, godLifeIndex)); // 0~100 범위로 제한
  } catch (error) {
    console.error(error);
    throw new Error("API 호출 중 오류가 발생했습니다.");
  }
};

export function GodLifeIndex() {
  const [progress, setProgress] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProgress = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProgress();
        setProgress(data);
        setError(null);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    getProgress();
  });  // onProgress가 변할 때마다 useEffect가 실행됨
  

  if (isLoading) {
    return <p>Loading...</p>; // 로딩 중 표시
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
  <Card className="flex-1 h-[200px]"> {/* 첫 번째 카드가 높이의 절반을 차지 */}
    <CardHeader>
      <CardDescription>지난 주 보다{progress}시간 더 활동했어요! <br></br> 책 5권을 읽은 것 만큼 성장했어요!</CardDescription>
      <CardTitle>{progress !== null ? `${progress}%` : 'Loading...'}</CardTitle>
    </CardHeader>
    <CardContent>
      <Progress value={progress !== null ? progress : 0} aria-label={`${progress}% progress 향상`} />
    </CardContent>
  </Card>
  );
}
