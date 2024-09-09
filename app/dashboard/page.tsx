// app/dashboard/page.tsx
'use client';

import { lookbackDashboard } from "@/components/component/lookback-dashboard"; 

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {lookbackDashboard()}
      
    </main>
  );
}
