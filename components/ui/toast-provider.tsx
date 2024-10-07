// components/ui/toast-provider.tsx
'use client';

import * as React from "react";

// Toast 컴포넌트 타입 정의
interface ToastProps {
  title: string;
  description: string;
  type: "success" | "error";
  onClose: () => void;
}

// Toast 컴포넌트
const Toast = ({ title, description, type, onClose }: ToastProps) => {
  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-2 p-4 rounded-md shadow-lg ${
        type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <button onClick={onClose} className="ml-auto text-xl">
        ×
      </button>
    </div>
  );
};

// Toast 컨텍스트 생성
const ToastContext = React.createContext<
  | {
      showToast: (title: string, description: string, type: "success" | "error") => void;
    }
  | undefined
>(undefined);

// ToastProvider 컴포넌트
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = React.useState<{ title: string; description: string; type: "success" | "error" } | null>(
    null
  );

  const showToast = React.useCallback((title: string, description: string, type: "success" | "error") => {
    setToast({ title, description, type });
    setTimeout(() => setToast(null), 3000); // 3초 후 토스트 사라짐
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          title={toast.title}
          description={toast.description}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
};

// useToast 훅
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};