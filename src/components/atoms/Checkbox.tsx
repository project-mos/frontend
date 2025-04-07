import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name?: string;
}

const Checkbox = ({ className, ...props }: InputProps) => {
  return (
    <input
      type="checkbox"
      className={cn(className, "cursor-pointer")}
      {...props}
    />
  );
};

Checkbox.displayName = "Input";
export default Checkbox;
