import React from "react";
import Typography from "./Typography";
import { cn } from "@/lib/utils";

export interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const RadioButton = ({ label, className, ...props }: RadioButtonProps) => {
  return (
    <label className={cn("flex cursor-pointer gap-3", className)}>
      <input
        type="radio"
        className="cursor-pointer accent-blue-500"
        {...props}
      />
      <Typography.P1 className="text-[14px] text-mos-gray-700">
        {label}
      </Typography.P1>
    </label>
  );
};

export default RadioButton;
