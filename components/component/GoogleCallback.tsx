'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const GoogleCallback = () => {
  const router = useRouter();
  const [hashValue, setHashValue] = useState('');

  console.log("Component rendering");

  useEffect(() => {
    console.log("useEffect 실행 시작");
    
    // window 객체가 존재하는지 확인
    if (typeof window !== "undefined") {
      console.log("Hash value: ", window.location.hash);
      setHashValue(window.location.hash);

      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = fragment.get('access_token');

      if (accessToken) {
        sendTokenToBackend(accessToken)
          .then(() => {
            router.replace('/dashboard-afterlogin');
          })
          .catch(() => {
            router.replace('/');
          });
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  const sendTokenToBackend = async (accessToken: string) => {
    try {
      const response = await fetch('https://api.look-back.site/api/v1/save-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to send token to backend');
      }
    } catch (error) {
      console.error('Error sending token to backend:', error);
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
      {hashValue && <p className="mt-4 text-white">처리 중...</p>}
    </div>
  );
};

export default GoogleCallback;