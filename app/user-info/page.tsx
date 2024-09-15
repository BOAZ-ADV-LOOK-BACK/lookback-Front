// app/user-info/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { UserInfoCard } from '@/components/component/UserInfoCard';

const UserInfoPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // 실제 구현에서는 여기서 API를 호출하여 사용자 데이터를 가져와야 합니다.
      const userData = {
        name: '홍길동',
        email: 'hong@example.com',
        phone: '010-1234-5678',
        avatar: '/placeholder-user.jpg'
      };
      setUser(userData);
    };

    fetchUserData();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>사용자 정보</h1>
      {user && <UserInfoCard user={user} />}
    </div>
  );
};

export default UserInfoPage;