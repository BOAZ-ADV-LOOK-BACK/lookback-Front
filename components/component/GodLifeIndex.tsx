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
  // 실제 API 호출로 대체해야 합니다
  // 예시:
  // const response = await fetch('https://api.look-back.site/api/v1/save-token', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ access_token: accessToken }),
  // });

  await new Promise(resolve => setTimeout(resolve, 1000)) // 1초 지연을 시뮬레이션
  return Math.floor(Math.random() * 101) // 0-100 사이의 랜덤 값 반환
}

export function GodLifeIndex() {
  const [progress, setProgress] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getProgress = async () => {
      try {
        setIsLoading(true)
        const data = await fetchProgress()
        setProgress(data)
        setError(null)
      } catch (err) {
        setError('데이터를 불러오는 데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    getProgress()
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">로딩 중...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-64 h-96 bg-gray-200 rounded-lg overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-500 ease-out"
          style={{ height: `${progress}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-700">{`${progress}%`}</span>
        </div>
      </div>
      <span className="mt-4 text-2xl font-bold">갓생지수!</span>
    </div>
  )
}