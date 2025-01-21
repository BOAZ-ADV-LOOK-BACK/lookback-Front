// src/components/UpcomingSchedule.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

import axios from "axios";


interface ActivityResponse {
    [key: string]: string;
  }
  
  // 차트 데이터 타입 정의
  interface ChartData {
    time: string,
    name: string,
    category: string
  }
  


// 백엔드 API 호출 함수 
const upcommingListFetch = async (): Promise<ActivityResponse[]> => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      window.location.href = "/login";
      throw new Error("로그인이 필요합니다.");
    }
  
    try {
      const response = await axios.post(
        "https://api.look-back.site/api/v1/calendar/dashboard-upcomming-schedule",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP 상태 코드 오류: ${response.status}`);
      }
  
      return response.data.upcommingList;
    } catch (err) {
      console.error("API 호출 중 오류:", err);
      throw new Error("API 호출 중 오류가 발생했습니다.");
    }
  };

const UpcomingSchedule: React.FC = () => {
    const [nextEvents, setNextEvents] = useState<ChartData[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [chartData, setChartData] = React.useState<ChartData[]>([]);

    useEffect(() => {
        // Fetch the next 5 events from your database
        // This is a placeholder. Replace with your actual API call
        const fetchNextEvents = async () => {

            try{
                setIsLoading(true);
            
                const data: ActivityResponse[] = await upcommingListFetch();
                const transformedData: ChartData[] = data.map((item) => ({
                    time: item["time"],
                    name: item["name"],
                    category: item["category"]
                }));

                setNextEvents(transformedData);
                setError(null);
            }

            catch (err){
                setError("데이터를 불러오는 데 실패했습니다.");
            }

            finally{
                setIsLoading(false);
            }
            // Placeholder data
            
        };

        fetchNextEvents();
    }, []);

    const getCategoryColor = (category) => {
        switch(category) {
            case 'Work': return 'bg-blue-200 text-blue-800';
            case 'Personal': return 'bg-green-200 text-green-800';
            case 'Health': return 'bg-red-200 text-red-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

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
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
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