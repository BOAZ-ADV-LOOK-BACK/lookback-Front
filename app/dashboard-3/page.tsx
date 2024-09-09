// app/dashboard-3/page.tsx
'use client';

import { lookbackDashboard_3 } from "@/components/component/lookback-dashboard-3"; 

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {lookbackDashboard_3()}
      
    </main>
  );
}
