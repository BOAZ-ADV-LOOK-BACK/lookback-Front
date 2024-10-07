'use client';

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'

const ageOptions = ['10대', '20대', '30대', '40대', '50대 이상']
const genderOptions = ['남성', '여성', '기타']
const jobOptions = ['학생', '회사원', '자영업', '전문직', '기타']
const hobbyOptions = ['운동', '독서', '여행', '음악', '영화', '기타']

export default function AdditionalInfoForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    job: '',
    hobby: '',
    otherJob: '',
    otherHobby: '',
  })

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/save-user-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: formData.age,
          gender: formData.gender,
          job: formData.job === '기타' ? formData.otherJob : formData.job,
          hobby: formData.hobby === '기타' ? formData.otherHobby : formData.hobby,
        }),
      })
      if (response.ok) {
        router.push('/dashboard')
      } else {
        console.error('Failed to save user info')
      }
    } catch (error) {
      console.error('Error saving user info:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="age">나이</Label>
        <Select onValueChange={(value) => handleChange('age', value)}>
          <SelectTrigger>
            <SelectValue placeholder="선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {ageOptions.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">성별</Label>
        <Select onValueChange={(value) => handleChange('gender', value)}>
          <SelectTrigger>
            <SelectValue placeholder="선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {genderOptions.map(option => (
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
            {jobOptions.map(option => (
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
            {hobbyOptions.map(option => (
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

      <Button type="submit">확인</Button>
    </form>
  )
}