'use client';

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateUser } from '@/actions/update-user'
import { useToast } from "@/components/ui/toast-provider"


export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast()
  const [userInfo, setUserInfo] = useState({
    name: '홍길동',
    email: 'hong@example.com',
    birthDate: '1990-01-01',
    gender: '남성',
    occupation: '',
    interest: '',
    hobby: ''
  })

  const handleInputChange = (name: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await updateUser({
        occupation: userInfo.occupation,
        interest: userInfo.interest,
        hobby: userInfo.hobby,
      });

      if (result.success) {
        showToast('성공', result.message, 'success'); // 수정된 부분: showToast 호출 시 개별 인수 전달
        setIsEditing(false);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      showToast('오류', error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.', 'error'); // 수정된 부분
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link href="/dashboard">
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="occupation">직업</Label>
                <Select
                  disabled={!isEditing}
                  value={userInfo.occupation}
                  onValueChange={(value) => handleInputChange('occupation', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="직업을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">학생</SelectItem>
                    <SelectItem value="housewife">가정주부</SelectItem>
                    <SelectItem value="employee">회사원</SelectItem>
                    <SelectItem value="freelancer">프리랜서</SelectItem>
                    <SelectItem value="professional">전문직</SelectItem>
                    <SelectItem value="self-employed">자영업</SelectItem>
                    <SelectItem value="etc.">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="interest">종사 분야</Label>
                <Select
                  disabled={!isEditing}
                  value={userInfo.interest}
                  onValueChange={(value) => handleInputChange('interest', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="종사 분야를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">사무</SelectItem>
                    <SelectItem value="it">IT개발/데이터</SelectItem>
                    <SelectItem value="design">디자인</SelectItem>
                    <SelectItem value="sales">영업</SelectItem>
                    <SelectItem value="research">연구/R&D</SelectItem>
                    <SelectItem value="medical">의료</SelectItem>
                    <SelectItem value="construction">건설/건축</SelectItem>
                    <SelectItem value="education">교육</SelectItem>
                    <SelectItem value="finance">금융/보험</SelectItem>
                    <SelectItem value="sports">스포츠</SelectItem>
                    <SelectItem value="production">생산</SelectItem>
                    <SelectItem value="accounting">회계/세무</SelectItem>
                    <SelectItem value="law">법률</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="interest">취미</Label>
                <Select
                  disabled={!isEditing}
                  value={userInfo.hobby}
                  onValueChange={(value) => handleInputChange('hobby', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="취미를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exercise">운동</SelectItem>
                    <SelectItem value="reading">독서</SelectItem>
                    <SelectItem value="travel">여행</SelectItem>
                    <SelectItem value="music">음악</SelectItem>
                    <SelectItem value="movie">영화</SelectItem>
                    <SelectItem value="etc.">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>취소</Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "저장 중..." : "저장"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>수정</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}