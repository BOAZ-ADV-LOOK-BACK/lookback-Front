// components/component/UserInfoCard.tsx
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

const UserInfoCard = ({ user }) => {
  return (
    <Card className='p-6'>
      <div className='flex items-center space-x-4'>
        <Avatar src={user.avatar} alt={user.name} className='w-16 h-16' />
        <div>
          <h2 className='text-2xl font-semibold'>{user.name}</h2>
          <p className='text-gray-600'>{user.email}</p>
          <p className='text-gray-600'>{user.phone}</p>
        </div>
      </div>
    </Card>
  );
};

export default UserInfoCard;