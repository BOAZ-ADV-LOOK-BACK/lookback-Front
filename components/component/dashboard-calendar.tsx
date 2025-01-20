"use client"

import React, {useEffect, useState} from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addDays, eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, isSameDay } from "date-fns"
import axios from "axios"


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

  // 상태 정의
  const [events, setEvents] = useState<Event[]>([]); // 이벤트 데이터를 상태로 관리
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  // API에서 일정 데이터를 가져오는 함수
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "https://api.look-back.site/api/v1/calendar/dashboard-calendar-schedule", // API 엔드포인트
        {}, // 요청 바디
        { headers: { Authorization: `Bearer ${token}` } } // 헤더에 토큰 추가
      );
      
      // 응답 데이터 처리
      const events = response.data.events;
      setEvents(events.map((event: any) => ({
        title: event.summary,
        date: new Date(event.start.dateTime), // 여기에 date 필드를 추가
        startDate: new Date(event.start.dateTime),
        endDate: new Date(event.end.dateTime),
      })));
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };
  

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchEvents();
  }, []);

  const hasEvent = (date: Date): boolean => 
    events.some(event => isSameDay(event.date, date))
  
  const getEventsForDate = (date: Date): Event[] =>
    events.filter(event => isSameDay(event.date, date))

  return (
    <Card className="w-full h-[600px]">
      <CardHeader className="p-4">
        <CardDescription>월간 일정</CardDescription>
        <CardTitle>{format(today, "yyyy년 MM월")}</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-5rem)] p-4">
        <div className="h-full flex flex-col">
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <div key={day} className="font-semibold text-sm text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 flex-1">
            {Array.from({ length: startingDayIndex }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {daysInMonth.map((day: any, index: number) => (
              <div
                key={day.toISOString()}
                className="aspect-square flex items-center justify-center relative"
                onMouseEnter={() => setHoveredDate(day)}
                onMouseLeave={() => setHoveredDate(null)}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center text-sm rounded-full ${
                    isToday(day) ? "bg-primary text-primary-foreground" :
                    hasEvent(day) ? "bg-secondary text-secondary-foreground" : ""
                  }`}
                >
                  {format(day, "d")}
                </div>
                {hoveredDate && isSameDay(hoveredDate, day) && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border rounded shadow-lg p-2 z-50 min-w-[150px] max-w-[200px]">
                    <h3 className="text-sm font-bold mb-1">{format(day, "yyyy년 MM월 dd일")}</h3>
                    <ul className="w-full">
                      {getEventsForDate(day).map((event, index: number) => (
                        <li key={index} className="text-xs truncate">
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
        </div>
      </CardContent>
    </Card>
  )
}