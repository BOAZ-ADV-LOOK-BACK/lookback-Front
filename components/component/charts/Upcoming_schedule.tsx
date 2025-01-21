import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

interface Event {
    Time: Date;
    name: string;
    category: string;
}

interface ApiEvent {
    Time: string;
    name: string;
    category: string;
}

const upcomingListFetch = async (): Promise<Event[]> => {
    const token = localStorage.getItem("access_token");
  
    if (!token) {
        window.location.href = "/login";
        throw new Error("AUTH_REQUIRED");
    }
  
    try {
        const response = await axios.post<{ upcommingList: ApiEvent[] }>(
            "https://api.look-back.site/api/v1/calendar/dashboard-upcomming-schedule",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
    
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`API_ERROR_${response.status}`);
        }
    
        return response.data.upcommingList.map(event => ({
            ...event,
            Time: new Date(event.Time)
        }));
    } catch (err) {
        console.error("API ȣ�� �� ����:", err);
        throw err;
    }
};

const formatDate = (date: Date): string => {
    try {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Date formatting error:', error);
        return '��¥ ���� ����';
    }
};

const UpcomingSchedule: React.FC = () => {
    const [nextEvents, setNextEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNextEvents = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await upcomingListFetch();
                setNextEvents(data);
            } catch (err) {
                if (err instanceof Error && err.message !== 'AUTH_REQUIRED') {
                    setError('������ �ҷ����� �� �����߽��ϴ�. ��� �� �ٽ� �õ����ּ���.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchNextEvents();
    }, []);

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center p-4">
                        Loading...
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                
                {!error && nextEvents.length === 0 ? (
                    <div className="flex justify-center items-center p-4">
                        ������ ������ �����ϴ�.
                    </div>
                ) : (
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
                                            {formatDate(event.Time)}
                                        </TableCell>
                                        <TableCell>{event.name}</TableCell>
                                        <TableCell>{event.category}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default UpcomingSchedule;