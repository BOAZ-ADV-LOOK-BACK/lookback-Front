'use client';
// app/googlelogin/page.tsx
import GoogleLoginBtn from '@/components/component/GoogleLoginBtn';

const GoogleLoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">환영합니다</h1>
        <p className="text-center text-gray-600 mb-8">Google 계정으로 로그인하세요</p>
        <div className="space-y-4">
          <GoogleLoginBtn />
          <div className="text-center text-sm text-gray-500">
            <p>계속 진행하시면 다음 사항에 동의하는 것으로 간주됩니다</p>
            <p>
              <a href="#" className="text-blue-500 hover:underline">서비스 이용약관</a> 및{' '}
              <a href="#" className="text-blue-500 hover:underline">개인정보 처리방침</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginPage;