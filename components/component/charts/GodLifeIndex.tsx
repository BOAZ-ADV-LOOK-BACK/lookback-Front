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
import axios from "axios";

// API 호출 함수
const fetchProgress = async (): Promise<number> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "/login"; // 로그인 페이지로 이동
  }

  try {
    const response = await axios.post(
      "https://api.look-back.site/api/v1/calendar/dashboard-godLifeBar",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )

    // 상태 코드가 200 범위 내에 있는지 확인
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP 상태 코드 오류: ${response.status}`);
    }

    const data = response.data;
    if (!data.success || typeof data.godLifeBar !== "number") {
      throw new Error("올바르지 않은 API 응답 형식입니다.");
    }

    const godLifeIndex = Math.floor(((data.godLifeBar * 100) / 7) * 1.4); // 보정치 1.4를 곱함
    return Math.min(100, Math.max(0, godLifeIndex)); // 0~100 범위로 제한
  } catch (error: any) {
    console.error("API 호출 중 오류:", error.message || error);
    throw new Error("API 호출 중 오류가 발생했습니다.");
  }
};

export function GodLifeIndex() {
  const [progress, setProgress] = useState<number | null>(null);
  const [moreTime, setMoreTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProgress = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProgress();
        setProgress(data);
        setMoreTime(data/100*20);
        setError(null);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    getProgress();
  }, []);  // onProgress가 변할 때마다 useEffect가 실행됨


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
        <CardDescription>지난 주 보다 {moreTime}시간 더 활동했어요! <br></br> 책 5권을 읽은 것 만큼 성장했어요!</CardDescription>
        <CardTitle>{progress !== null ? `${progress}%` : 'Loading...'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress !== null ? progress : 0} aria-label={`${progress}% progress 향상`} />
      </CardContent>
    </Card>
  );
}
