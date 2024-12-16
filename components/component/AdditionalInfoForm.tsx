'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";
import axios from 'axios';

const genderOptions = ['남성', '여성', '아직모름'];
const jobOptions = ['학생', '회사원', '자영업', '전문직', '기타'];
const hobbyOptions = ['운동', '독서', '여행', '음악', '영화', '기타'];

export default function AdditionalInfoForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    birth: '',
    gender: '',
    job: '',
    hobby: '',
    otherJob: '',
    otherHobby: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log("토큰 확인:", token);
    
    if (token) {
        console.log("이메일 정보 요청 시작");
        axios.get('https://api.look-back.site/api/v1/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("전체 응답 데이터:", response.data);
            if (response.data.email) {
                console.log("이메일 수신 완료:", response.data.email);
                setFormData(prev => {
                    const newData = {
                        ...prev,
                        email: response.data.email
                    };
                    console.log("업데이트된 formData:", newData);
                    return newData;
                });
            } else {
                console.error("응답에 이메일이 없음:", response.data);
                router.push('/');
            }
        })
        .catch(error => {
            console.error("이메일 정보 요청 실패:", error.response?.data || error.message);
            router.push('/');
        });
    } else {
        console.error("토큰이 없음");
        router.push('/');
    }
  }, [router]);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('토큰이 없습니다');
      }

      console.log("제출할 데이터:", {
        email: formData.email,  // 이메일도 함께 전송
        birth: formData.birth,
        gender: formData.gender,
        job: formData.job === '기타' ? formData.otherJob : formData.job,
        hobby: formData.hobby === '기타' ? formData.otherHobby : formData.hobby,
      });

      const response = await axios.post(
        'https://api.look-back.site/api/v1/users/update-user-info',
        {
          email: formData.email,  // 이메일도 함께 전송
          birth: formData.birth,
          gender: formData.gender,
          job: formData.job === '기타' ? formData.otherJob : formData.job,
          hobby: formData.hobby === '기타' ? formData.otherHobby : formData.hobby,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("서버 응답:", response.data);

      if (response.status === 200) {
        router.push('/dashboard-afterlogin');
      }
    } catch (error) {
      console.error('Error saving user info:', error);
      setError('정보 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email && formData.birth && formData.gender && 
    formData.job && formData.hobby && 
    (formData.job !== '기타' || formData.otherJob) &&
    (formData.hobby !== '기타' || formData.otherHobby);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="m-auto w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">추가 정보 입력</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth">생년월일</Label>
            <Input
              type="date"
              id="birth"
              name="birth"
              value={formData.birth}
              onChange={(e) => handleChange('birth', e.target.value)}
              placeholder="YYYY-MM-DD"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">성별</Label>
            <Select onValueChange={(value) => handleChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job">직업</Label>
            <Select onValueChange={(value) => handleChange('job', value)}>
              <SelectTrigger>
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {jobOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.job === '기타' && (
              <Input
                name="otherJob"
                value={formData.otherJob}
                onChange={(e) => handleChange('otherJob', e.target.value)}
                placeholder="직접 입력"
                className="mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="hobby">취미</Label>
            <Select onValueChange={(value) => handleChange('hobby', value)}>
              <SelectTrigger>
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {hobbyOptions.map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.hobby === '기타' && (
              <Input
                name="otherHobby"
                value={formData.otherHobby}
                onChange={(e) => handleChange('otherHobby', e.target.value)}
                placeholder="직접 입력"
                className="mt-2"
              />
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={!isFormValid || isLoading}
            className="w-full mt-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                저장 중...
              </>
            ) : (
              '확인'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}