'use client'

import { Button } from "@/components/ui/button";
import { CalendarDays, BarChart2, Clock, ChevronRight } from "lucide-react";
import { useState, useEffect } from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Google 로그인 버튼
const GoogleLoginBtn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const googleSocialLogin = useGoogleLogin({
    // 캘린더 접근 권한 추가
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly openid',
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      const response = await axios.post("https://api.look-back.site/api/v1/login", { code });
      const jwtToken = response.data.access_token;
  
      localStorage.setItem('access_token', jwtToken);
      console.log("Access Token 저장 성공:", localStorage.getItem('access_token')); 
  
      // 로그인 성공 후 바로 페이지 이동
      router.replace('/dashboard-afterlogin');
  
      // 비동기 데이터 동기화 호출
      axios.post(
          "https://api.look-back.site/api/v1/calendar/sync-calendar",
          {}, 
          { headers: { Authorization: `Bearer ${jwtToken}` } }
      ).catch(error => {
          console.error("Calendar sync failed:", error);
      });
  },
    onError: (errorResponse) => {
        console.error("Google login error:", errorResponse);
        setIsLoading(false);
        router.replace('/');
    }
});

  return (
    <Button 
      onClick={googleSocialLogin}
      size="lg"
      disabled={isLoading}
      className="w-full max-w-md bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
    >
      {isLoading ? "로그인 중..." : "Google로 로그인"} <ChevronRight className="ml-2 h-5 w-5" />
    </Button>
  );
};

// 개별 기능 카드
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <Icon className="h-16 w-16 text-blue-500 mb-4 animate-pulse" />
    <h2 className="text-2xl font-semibold mb-2 text-gray-800">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

// 랜딩 페이지 컴포넌트
export default function LandingPage() {
  const [gradientPosition, setGradientPosition] = useState(0);

  useEffect(() => {
      const intervalId = setInterval(() => {
          setGradientPosition((prevPosition) => (prevPosition + 1) % 100);
      }, 50);

      return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        style={{
          backgroundSize: '200% 200%',
          backgroundPosition: `${gradientPosition}% 50%`,
          transition: 'background-position 0.5s ease',
        }}
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="py-6 px-8 w-full bg-white bg-opacity-90 shadow-md">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">look-back</span>
            </div>
          </nav>
        </header>

        <main className="flex-grow flex flex-col justify-center items-center px-8 py-12 bg-white bg-opacity-80">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 text-center max-w-4xl leading-tight">
            당신의 시간을 <span className="text-blue-600">되돌아보세요</span>
          </h1>
          <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl">
            look-back으로 개인 캘린더를 분석하고, 시간 활용을 최적화하세요. 
            당신의 일상을 더 효율적으로 만들어 드립니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 w-full max-w-6xl">
            <FeatureCard 
              icon={BarChart2}
              title="데이터 시각화"
              description="캘린더 데이터를 한눈에 파악할 수 있는 대시보드"
            />
            <FeatureCard 
              icon={Clock}
              title="시간 분석"
              description="효율적인 시간 관리를 위한 상세한 분석"
            />
            <FeatureCard 
              icon={CalendarDays}
              title="캘린더 통합"
              description="다양한 캘린더 서비스와의 손쉬운 연동"
            />
          </div>

          <div className="space-y-4 w-full max-w-md">
            <GoogleLoginBtn />
          </div>
        </main>

        <footer className="py-6 text-center text-white bg-gray-800 bg-opacity-90 w-full">
          <p>&copy; 2024 look-back. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
