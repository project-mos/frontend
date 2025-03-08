import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  icon?: React.ReactNode;
}

const Input = ({ className, name, icon, ...props }: InputProps) => {
  const { register } = useFormContext();

  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        {...register(name)}
        className={cn(
          "focus:ring-mos-main-300 min-w-[200px] rounded-md border border-gray-200 bg-white px-5 py-2 text-sm text-mos-gray-700 placeholder:text-black focus:border-mos-main-500 focus:outline-none",
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
