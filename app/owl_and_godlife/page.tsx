// app/dashboard/tmp-GodLifeIndex/page.tsx
'use client';

import { CalendarEventVisualization } from "@/components/component/Owl-or-Sparrow";
import { GodLifeIndex } from "@/components/component/GodLifeIndex";
export default function OwlPage() {
  return (
    <main className="flex min-h-screen flex-col items-upper justify-center space-y-8">
      {/* space-y-8 클래스를 사용하여 컴포넌트 간의 수직 간격 조정 */}
      <div className="w-full max-w-xl h-64"> {/* 폭을 조정할 수 있는 div 래퍼 추가 */}
        {CalendarEventVisualization()}
      </div>
      <div className="w-full max-w-xl h-64"> {/* 폭을 조정할 수 있는 div 래퍼 추가 */}
        {GodLifeIndex()}
      </div>
    </main>
  );
}