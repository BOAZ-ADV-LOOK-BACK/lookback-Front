'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/toast-provider';

interface UserProfile {
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  occupation: string;
  interest: string;
  hobby: string;
  otherOccupation?: string; 
  otherHobby?: string;      
  otherInterest?: string; 
}

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const [userInfo, setUserInfo] = useState<UserProfile>({
    name: '',
    email: '',
    birthDate: '',
    gender: '',
    occupation: '',
    interest: '',
    hobby: ''
  });

  useEffect(() => {
    const email = searchParams.get('email');
    if (email) {
      fetchUserProfile(email);
    }
  }, [searchParams]);

  const fetchUserProfile = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.look-back.site/api/v1/get-user-info?email=${email}`);
      if (!response.ok) throw new Error('프로필을 불러오는데 실패했습니다.');

      const data = await response.json();
      console.log('Response data:', data); // 전체 응답 데이터 확인

      const { full_name, email: userEmail, birth, gender, job, interest, hobby } = data;
      console.log({
        full_name,
        email: userEmail,
        birth,
        gender,
        job,
        interest,
        hobby
      }); // 각 필드별 값 확인

      setUserInfo({
        name: full_name || '',
        email: userEmail || '',
        birthDate: birth || '',
        gender: gender || '',
        occupation: job || '',
        interest: interest || '',
        hobby: hobby || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      showToast('오류', '프로필을 불러오는데 실패했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    console.log(`Updating ${name} to ${value}`); // 디버깅용 로그
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('https://api.look-back.site/api/v1/update-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo.email,
          birth: userInfo.birthDate,
          gender: userInfo.gender,
          job: userInfo.occupation === '기타' ? userInfo.otherOccupation : userInfo.occupation, // 기타 처리
          hobby: userInfo.hobby === '기타' ? userInfo.otherHobby : userInfo.hobby, // 기타 처리
          interest: userInfo.interest === '기타' ? userInfo.otherInterest : userInfo.interest, // 기타 처리
        }),
      });
  
      if (!response.ok) throw new Error('프로필 업데이트에 실패했습니다.');
  
      const result = await response.json();
      if (result.success) {
        showToast('성공', '프로필이 성공적으로 업데이트되었습니다.', 'success');
        setIsEditing(false);
      } else {
        throw new Error(result.message || '프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('오류', error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };  

  return (
    <div className="container mx-auto p-4">
      <Link href="/dashboard-afterlogin">
        <Button className="mb-4">메인 페이지로 돌아가기</Button>
      </Link>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>사용자 프로필</CardTitle>
          <CardDescription>귀하의 정보를 확인하고 일부 정보를 수정할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">이름</Label>
                <Input id="name" value={userInfo.name} disabled />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">이메일</Label>
                <Input id="email" value={userInfo.email} disabled />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="birthDate">생년월일</Label>
                <Input id="birthDate" value={userInfo.birthDate} disabled />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gender">성별</Label>
                <Input id="gender" value={userInfo.gender} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">직업</Label>
                <Select onValueChange={(value) => handleInputChange('occupation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="직업을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {['학생', '회사원', '자영업', '전문직', '기타'].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {userInfo.occupation === '기타' && (
                  <Input
                    name="otherOccupation"
                    value={userInfo.otherOccupation || ''}
                    onChange={(e) => handleInputChange('otherOccupation', e.target.value)}
                    placeholder="직접 입력"
                    className="mt-2"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">종사 분야</Label>
                <Select onValueChange={(value) => handleInputChange('interest', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="종사 분야를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {['office', 'it', 'design', 'sales', '기타'].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {userInfo.interest === '기타' && (
                  <Input
                    name="otherInterest"
                    value={userInfo.otherInterest || ''}
                    onChange={(e) => handleInputChange('otherInterest', e.target.value)}
                    placeholder="직접 입력"
                    className="mt-2"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hobby">취미</Label>
                <Select onValueChange={(value) => handleInputChange('hobby', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="취미를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {['운동', '독서', '여행', '음악', '기타'].map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {userInfo.hobby === '기타' && (
                  <Input
                    name="otherHobby"
                    value={userInfo.otherHobby || ''}
                    onChange={(e) => handleInputChange('otherHobby', e.target.value)}
                    placeholder="직접 입력"
                    className="mt-2"
                  />
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
                취소
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? '저장 중...' : '저장'}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>수정</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
