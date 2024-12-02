'use client';

import { UserProfile } from "@/components/component/userprofile";
import { ToastProvider } from "@/components/ui/toast-provider";

export default function UserProfilePage() {
  return (
    <ToastProvider>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <UserProfile />
      </main>
    </ToastProvider>
  );
}