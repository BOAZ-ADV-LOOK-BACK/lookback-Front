'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DecodedUser {
  name: string;
  picture: string;
}

interface CalendarEvent {
  summary: string;
  start: { dateTime: string };
}

const GoogleLoginBtn = () => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const router = useRouter();

  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const SCOPE = "https://www.googleapis.com/auth/calendar.readonly";

  const handleGoogleLogin = () => {
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPE}`;
    window.location.href = googleOAuthUrl;
  };

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = fragment.get('access_token');
    
    if (accessToken) {
      fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
        .then(res => res.json())
        .then(data => {
          setUser({
            name: data.name,
            picture: data.picture
          });
          return fetchCalendarEvents(accessToken);
        })
        .then(calendarData => {
          setEvents(calendarData.items);
        })
        .catch(error => console.error('Error fetching data:', error));
      
      // Clear the hash to prevent 404 errors
      // router.replace('/dashboard');
    }
  }, [router]);

  const fetchCalendarEvents = (accessToken: string) => {
    const now = new Date().toISOString();
    return fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now}&maxResults=10&singleEvents=true&orderBy=startTime&access_token=${accessToken}`)
      .then(res => res.json());
  };

  return (
    <div className="w-full">
      {!user ? (
        <button 
          onClick={handleGoogleLogin}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Google로 로그인
        </button>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">환영합니다, {user.name}님</h3>
          <img 
            src={user.picture} 
            alt="사용자 프로필" 
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
          />
          <h4 className="text-lg font-semibold text-gray-700 mb-2">다가오는 일정</h4>
          <ul className="text-left">
            {events.map((event, index) => (
              <li key={index} className="mb-2">
                {event.summary} - {new Date(event.start.dateTime).toLocaleString()}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => setUser(null)} 
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 mt-4"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginBtn;