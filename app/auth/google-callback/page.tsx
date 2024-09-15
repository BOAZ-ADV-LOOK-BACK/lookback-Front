'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GoogleCallback = () => {
  const router = useRouter();

  useEffect(() => {
    // URL에서 access token 가져오기
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = fragment.get('access_token');

    if (accessToken) {
      // 액세스 토큰으로 필요한 작업 수행 (예: 백엔드로 토큰 전달)
      console.log("Access Token:", accessToken);

      // 백엔드로 액세스 토큰 전송
      sendTokenToBackend(accessToken)
        .then(() => {
          // 후속 처리 후 원하는 페이지로 리디렉션
          router.replace('/dashboard');
        })
        .catch((error) => {
          console.error('Error sending token to backend:', error);
          router.replace('/');
        });
    } else {
      // 토큰이 없는 경우 오류 처리
      console.error('Access token not found');
      router.replace('/');
    }
  }, [router]);

  const sendTokenToBackend = async (accessToken: string) => {
    try {
      const response = await fetch('/api/save-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to send token to backend');
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-white rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-white rounded-full animate-ping opacity-75"></div>
      </div>
      <h1 className="text-3xl font-bold text-white animate-pulse">처리 중...</h1>
    </div>
  );
};

export default GoogleCallback;
