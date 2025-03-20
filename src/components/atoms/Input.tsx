import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name?: string;
  icon?: React.ReactNode;
}

const Input = ({ className, icon, ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        className={cn(
          "focus:ring-mos-main-300 min-w-[200px] rounded-md border border-gray-200 bg-white p-3 text-[14px] text-mos-gray-700 placeholder:text-black focus:border-mos-main-500 focus:outline-none",
          icon && "pl-10",
          className
        )}
        {...props}
      />
    </div>
  );
};

Input.displayName = "Input";
export default Input;
