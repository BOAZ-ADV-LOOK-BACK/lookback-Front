'use client'

import { Button } from "@/components/ui/button";
import { CalendarDays, BarChart2, Clock, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from 'react';
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
    <div className="relative group">
      {/* 배경 글로우 효과 */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-md group-hover:blur-lg opacity-70 transition duration-200"></div>
      
      {/* 버튼 */}
      <Button 
        onClick={googleSocialLogin}
        size="lg"
        disabled={isLoading}
        className="relative w-full max-w-md bg-gradient-to-r from-gray-900/90 to-gray-800/90 text-white font-bold py-6 px-8 rounded-full 
                 hover:from-gray-800/90 hover:to-gray-700/90 
                 transition-all duration-300 transform hover:scale-[1.02] 
                 border border-gray-700/50 hover:border-purple-500/50
                 backdrop-blur-sm shadow-xl
                 flex items-center justify-center gap-3"
      >
        {/* Google 로고 */}
        <div className="bg-white p-2 rounded-full">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </div>

        {/* 텍스트 */}
        <span className="text-lg">
          {isLoading ? "로그인 중..." : "Google로 시작하기"}
        </span>

        {/* 화살표 아이콘 */}
        <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
      </Button>
    </div>
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
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
      setIsVisible(true);
      const intervalId = setInterval(() => {
          setGradientPosition((prevPosition) => (prevPosition + 1) % 100);
      }, 50);

      return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900 w-full">
      {/* 배경 애니메이션 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(64,64,255,0.2),rgba(0,0,0,0))]" />
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30"
          style={{
            backgroundSize: '400% 400%',
            backgroundPosition: `${gradientPosition}% 50%`,
            transition: 'background-position 0.5s ease',
          }}
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 w-full">
        {/* 네비게이션 */}
        <header className="fixed w-full z-50 backdrop-blur-md bg-white/10">
          <nav className="w-full px-6 py-4">
            <div className="flex items-center space-x-3">
              <CalendarDays className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                look-back
              </span>
            </div>
          </nav>
        </header>

        {/* 히어로 섹션 */}
        <main className="pt-24 w-full">
          <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center w-full">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                과거를 제대로 알면{" "}
                <span className="block mt-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  더 나은 미래로 나아갈 수 있습니다.
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                look-back으로 당신의 시간 활용 패턴을 분석하고 미래를 계획하세요.
                <span className="block mt-2 text-gray-400">
                  더 나은 내일을 위한 통찰력을 제공합니다.
                </span>
              </p>
            </div>

            {/* 기능 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-6 mb-16">
              <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border border-gray-700 hover:border-blue-500/50 hover:shadow-blue-500/20 hover:shadow-2xl group transition-all duration-300">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full group-hover:bg-blue-500/30 transition-all duration-300"></div>
                    <BarChart2 className="h-20 w-20 text-blue-400 relative z-10 mx-auto transform group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">패턴 분석</h3>
                  <p className="text-gray-400">당신의 시간 활용 패턴을 심층적으로 분석하여 인사이트 제공</p>
                </div>
              </div>
              
              <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border border-gray-700 hover:border-purple-500/50 hover:shadow-purple-500/20 hover:shadow-2xl group transition-all duration-300">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full group-hover:bg-purple-500/30 transition-all duration-300"></div>
                    <Clock className="h-20 w-20 text-purple-400 relative z-10 mx-auto transform group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">시간 최적화</h3>
                  <p className="text-gray-400">데이터 기반으로 당신의 시간을 더 가치있게 사용하는 방법 제시</p>
                </div>
              </div>
              
              <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border border-gray-700 hover:border-pink-500/50 hover:shadow-pink-500/20 hover:shadow-2xl group transition-all duration-300">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full group-hover:bg-pink-500/30 transition-all duration-300"></div>
                    <CalendarDays className="h-20 w-20 text-pink-400 relative z-10 mx-auto transform group-hover:scale-110 group-hover:text-pink-300 transition-all duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-300 transition-colors">미래 설계</h3>
                  <p className="text-gray-400">과거 데이터를 기반으로 더 나은 미래를 위한 인사이트 제공</p>
                </div>
              </div>
            </div>

            {/* 로그인 버튼 */}
            <div className={`w-full max-w-md transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <GoogleLoginBtn />
            </div>
          </div>
        </main>

        {/* 푸터 */}
        <footer className="py-8 text-center text-gray-400 backdrop-blur-md bg-gray-900/50 w-full">
          <p>&copy; 2024 look-back. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}