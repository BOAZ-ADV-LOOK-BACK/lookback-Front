// components/ui/Textarea.tsx
import * as React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        <textarea
          ref={ref}
          className={`border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
