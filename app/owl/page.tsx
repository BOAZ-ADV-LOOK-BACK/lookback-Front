// app/dashboard/tmp-GodLifeIndex/page.tsx
'use client';

import { CalendarEventVisualization } from "@/components/component/owl";

export default function OwlPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {CalendarEventVisualization()}
      
    </main>
  );
}