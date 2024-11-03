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

// 가상의 API 호출 함수
const fetchProgress = async (): Promise<number> => {
  await new Promise(resolve => setTimeout(resolve, 1000)) // 1초 지연을 시뮬레이션


  return Math.floor(Math.random() * 101) // 0-100 사이의 랜덤 값 반환, 실제 값 하나 return하게 하면 더 이상 계속 안 변함

  // 실제 API 호출로 대체해야 합니다
  // 예시:
  // const response = await fetch('https://api.look-back.site/api/v1/save-token', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ access_token: accessToken }),
  // });
}

interface GodLifeIndexProps {
  onProgress: (progress: number | null) => void;  // progress를 전달할 콜백 함수
}

export function GodLifeIndex({ onProgress }: GodLifeIndexProps) {
  const [progress, setProgress] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProgress = async () => {
      try {
        setIsLoading(true)
        const data = await fetchProgress()
        setProgress(data)
        onProgress(data)  // progress 값을 부모 컴포넌트로 전달
        setError(null)
      } catch (err) {
        setError('데이터를 불러오는 데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    getProgress()
  }, [onProgress])  // onProgress가 변할 때마다 useEffect가 실행됨
  

  if (isLoading) {
    return null; // 로딩 중일 때는 아무것도 렌더링하지 않음
  }

  if (error) {
    console.error(error);
    return null;
  }

  return null; // 이제 이 컴포넌트는 progress만 전달하고 아무것도 렌더링하지 않음
}
