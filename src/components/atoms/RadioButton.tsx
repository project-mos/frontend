import React from "react";
import Typography from "./Typography";
import { cn } from "@/lib/utils";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RadioButton = ({ label, className, ...props }: RadioButtonProps) => {
  return (
    <label className={cn("flex cursor-pointer gap-3", className)}>
      <input type="radio" className="cursor-pointer" {...props} />
      <Typography.P1>{label}</Typography.P1>
    </label>
  );
};

export default RadioButton;
