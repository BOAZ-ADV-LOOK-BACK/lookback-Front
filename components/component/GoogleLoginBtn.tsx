'use client';

const GoogleLoginBtn = () => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const SCOPE = "https://www.googleapis.com/auth/calendar.readonly";

  const handleGoogleLogin = () => {
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
    window.location.href = googleOAuthUrl;
  };

  return (
    <button 
      onClick={handleGoogleLogin}
      className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
    >
      Google로 로그인
    </button>
  );
};

export default GoogleLoginBtn;