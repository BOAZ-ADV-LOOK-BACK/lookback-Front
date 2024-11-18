"use client"

import React, {useState} from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addDays, eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, isSameDay } from "date-fns"

// // 가상의 이벤트 데이터
// const events = [
//   { date: new Date(2024, 11, 5), title: "회의" },
//   { date: new Date(2024, 11, 10), title: "프로젝트 마감" },
//   { date: new Date(2024, 11, 15), title: "팀 빌딩" },
//   { date: new Date(2024, 11, 20), title: "고객 미팅" },
//   { date: new Date(2024, 11, 25), title: "분기 보고" },
// ]
interface Event {
  date: Date;
  title: string;
}

export default function DashboardCalendar() {
  
  const today = new Date()
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const firstDayOfMonth = startOfMonth(today)
  const lastDayOfMonth = endOfMonth(today)
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })
  const startingDayIndex = getDay(firstDayOfMonth)
  // 가상의 이벤트 데이터
  const events: Event[] = [
    { date: new Date(currentYear, currentMonth, 5), title: "회의" },
    { date: new Date(currentYear, currentMonth, 10), title: "프로젝트 마감" },
    { date: new Date(currentYear, currentMonth, 15), title: "팀 빌딩" },
    { date: new Date(currentYear, currentMonth, 20), title: "고객 미팅" },
    { date: new Date(currentYear, currentMonth, 25), title: "분기 보고" },
  ];
  // 현재 마우스 오버된 날짜의 이벤트를 저장하는 상태
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  // 특정 날짜에 이벤트가 있는지 확인
  const hasEvent = (date: Date): boolean => 
    events.some(event => isSameDay(event.date, date))
  
  // 특정 날짜의 이벤트 가져오기
  const getEventsForDate = (date: Date): Event[] =>
    events.filter(event => isSameDay(event.date, date))


  return (
    <Card className="h-[600px] overflow-visible">
      <CardHeader>
        <CardDescription>월간 일정</CardDescription>
        <CardTitle>{format(today, "yyyy년 MM월")}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-7 gap-2 text-center mb-2">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="font-semibold text-sm text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {daysInMonth.map((day, index: number) => (
            <div
              key={day.toISOString()}
              className="aspect-square flex items-center justify-center relative"
              onMouseEnter={() => {
                setHoveredDate(day);
              }}
              onMouseLeave={() => {
                setHoveredDate(null);
              }}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center text-sm rounded-full relative ${
                  isToday(day) ? "bg-primary text-primary-foreground" :
                  hasEvent(day) ? "bg-secondary text-secondary-foreground" : ""
                }`}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full">
                  {format(day, "d")}
                </span>
              </div>
              {/* 팝업: 날짜 위에 일정 표시 */}
              {hoveredDate && isSameDay(hoveredDate, day) && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border rounded shadow-lg p-2 z-50 min-w-[150px]"
                style={{ visibility: 'visible', opacity: 1 }}>
                  <h3 className="text-sm font-bold mb-1">{format(day, "yyyy년 MM월 dd일")}</h3>
                  <ul>
                    {getEventsForDate(day).map((event, index: number) => (
                      <li key={index} className="text-xs">
                        {event.title}
                      </li>
                    ))}
                    {getEventsForDate(day).length === 0 && (
                      <li className="text-xs text-muted-foreground">일정이 없습니다.</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}