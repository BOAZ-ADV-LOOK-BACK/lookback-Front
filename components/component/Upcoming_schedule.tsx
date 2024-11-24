// src/components/UpcomingSchedule.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

const UpcomingSchedule: React.FC = () => {
    const [nextEvents, setNextEvents] = useState([]);

    useEffect(() => {
        // Fetch the next 5 events from your database
        // This is a placeholder. Replace with your actual API call
        const fetchNextEvents = async () => {
            // Placeholder data
            setNextEvents([
                { time: '2024-11-04T10:00:00', name: 'Team Meeting', category: 'Work' },
                { time: '2024-11-04T14:30:00', name: 'Dentist Appointment', category: 'Personal' },
                { time: '2024-11-05T09:00:00', name: 'Project Deadline', category: 'Work' },
                { time: '2024-11-05T18:00:00', name: 'Gym Session', category: 'Health' },
                { time: '2024-11-06T12:00:00', name: 'Lunch with Client', category: 'Work' },
            ]);
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
