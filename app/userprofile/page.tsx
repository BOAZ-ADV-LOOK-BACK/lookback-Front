// app/userprofile/page.tsx
'use client';

import { UserProfile } from "@/components/component/userprofile";
import { ToastProvider } from "@/components/ui/toast-provider"; // 적절한 경로로 변경

export default function UserProfilePage() {
  return (
    <ToastProvider> {/* ToastProvider로 감싸기 */}
      <main className="flex min-h-screen flex-col items-center justify-center">
        <UserProfile />
      </main>
    </ToastProvider>
  );
}