'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const genderOptions = ['남성', '여성', '아직모름'];
const jobOptions = ['학생', '회사원', '자영업', '전문직', '기타'];
const hobbyOptions = ['운동', '독서', '여행', '음악', '영화', '기타'];

export default function AdditionalInfoForm() {
  const router = useRouter();
  const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      birth: '',
      gender: '',
      job: '',
      hobby: '',
      otherJob: '',
      otherHobby: ''
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      axios.get('https://api.look-back.site/api/v1/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const email = response.data?.email;
        if (email) setValue('email', email);
      })
      .catch(() => router.push('/'));
    } else {
      router.push('/');
    }
  }, [setValue, router]);

  const onSubmit = async (data: any) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('토큰이 없습니다.');

      const payload = {
        ...data,
        job: data.job === '기타' ? data.otherJob : data.job,
        hobby: data.hobby === '기타' ? data.otherHobby : data.hobby,
      };

      await axios.post(
        'https://api.look-back.site/api/v1/users/update-user-info',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      router.push('/dashboard-afterlogin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="m-auto w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">추가 정보 입력</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>이메일</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input {...field} disabled className="bg-gray-100" />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>생년월일</Label>
            <Controller
              name="birth"
              control={control}
              render={({ field }) => (
                <Input type="date" placeholder="YYYY-MM-DD" {...field} />
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>성별</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
            {isSubmitting ? '저장 중...' : '확인'}
          </Button>
        </form>
      </div>
    </div>
  );
}
