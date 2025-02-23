import { forwardRef } from "react";
import { cn } from "@/lib/utils"; // Tailwind 클래스 병합 유틸
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "px-5 py-2 min-w-[200px] border rounded-md border-gray-200 text-sm bg-white text-mos-gray-700 placeholder:text-black focus:outline-none focus:border-mos-main-500 focus:ring-mos-main-300",
            icon && "pl-10",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
