// app/dashboard-afterlogin/page.tsx
'use client';

import { lookbackDashboardAfterlogin } from "@/components/component/lookback-dashboard-afterlogin"; 

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {lookbackDashboardAfterlogin()}
    </main>
  );
}