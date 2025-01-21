// src/components/UpcomingSchedule.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

interface Event {
    time: string; // ISO 날짜 형식의 문자열
    name: string;
    category: string;
}

const UpcomingSchedule: React.FC = () => {
    const [nextEvents, setNextEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchNextEvents = async () => {
            try {
                // 실제 API 호출로 데이터를 가져옵니다.
                const response = await fetch('http://your-backend-api-endpoint.com/events');
                const data = await response.json();

                // 백엔드 데이터 키를 프론트엔드에서 사용하는 키로 변환
                const formattedEvents = data.map((event: any) => ({
                    time: event.Time, // 백엔드의 "Time"을 프론트엔드의 "time"으로 매핑
                    name: event.name,
                    category: event.category,
                }));

                setNextEvents(formattedEvents);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        };

        fetchNextEvents();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Time</TableHead>
                                <TableHead>Event Name</TableHead>
                                <TableHead>Category</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {nextEvents.map((event, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {new Date(event.time).toLocaleString()}
                                    </TableCell>
                                    <TableCell>{event.name}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.category}`}>
                                            {event.category}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default UpcomingSchedule;
