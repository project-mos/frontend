import React from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/atoms/Input";
import Typography from "@/components/atoms/Typography";

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
}

const LabelInput = ({
  label,
  id,
  className,
  required,
  ...props
}: LabelInputProps) => {
  const inputId = id ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)}>
      <label htmlFor={inputId}>
        <Typography.P1>
          {label} {required ? "*" : ""}
        </Typography.P1>
      </label>

      <Input
        id={inputId}
        className="w-full placeholder:text-mos-gray-500"
        required={required}
        {...props}
      />
    </div>
  );
};

export default LabelInput;
