'use client';

import * as React from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-2 p-4 rounded-md shadow-lg ${
        type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      <span>{message}</span> {/* `message`는 문자열이므로 안전하게 렌더링 가능 */}
      <button onClick={onClose} className="ml-auto text-xl">
        ×
      </button>
    </div>
  );
};

// useToast 훅 생성
const ToastContext = React.createContext<
  | {
      showToast: (message: string, type: "success" | "error") => void;
    }
  | undefined
>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = React.useCallback((message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // 3초 후 토스트 메시지 사라짐
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />} {/* 객체의 속성만 전달 */}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};