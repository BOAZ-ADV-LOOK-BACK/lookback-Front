// AdditionalInfoForm.js
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

const genderOptions = ['남성', '여성', '아직모름'];
const jobOptions = ['학생', '회사원', '자영업', '전문직', '기타'];
const hobbyOptions = ['운동', '독서', '여행', '음악', '영화', '기타'];

export default function AdditionalInfoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: '', // 초기값
    birth: '',
    gender: '',
    job: '',
    hobby: '',
    otherJob: '',
    otherHobby: '',
  });

  // 쿼리 파라미터에서 이메일 가져오기
  useEffect(() => {
    const email = searchParams.get("email");
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [searchParams]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.look-back.site/api/update-user-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          birthdate: formData.birth,
          gender: formData.gender,
          job: formData.job === '기타' ? formData.otherJob : formData.job,
          hobby: formData.hobby === '기타' ? formData.otherHobby : formData.hobby,
        }),
      });
      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to save user info');
      }
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 이메일 필드 (비활성화) */}
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          disabled // 비활성화된 필드
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthdate">생년월일</Label>
        <Input
          type="date"
          id="birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={(e) => handleChange('birthdate', e.target.value)}
          placeholder="YYYY-MM-DD"
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
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
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
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
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
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
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

      <Button type="submit">확인</Button>
    </form>
  );
}
