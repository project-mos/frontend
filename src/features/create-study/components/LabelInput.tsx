import React from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/atoms/Input";
import Label from "./Label";

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id?: string;
}

const LabelInput = ({
  label,
  name,
  id,
  className,
  required,
  ...props
}: LabelInputProps) => {
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={cn("flex w-full flex-col gap-[5px]", className)}>
      <Label label={label} required htmlFor={inputId} />
      <Input
        name={name}
        id={inputId}
        className="w-full placeholder:text-mos-gray-500"
        required={required}
        {...props}
      />
    </div>
  );
};

export default LabelInput;
