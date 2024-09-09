// app/dashboard-2/page.tsx
'use client';

import { lookbackDashboard_2 } from "@/components/component/lookback-dashboard-2"; 

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {lookbackDashboard_2()}
      
    </main>
  );
}
