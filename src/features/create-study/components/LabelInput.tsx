import React from "react";
import { cn } from "@/lib/utils";
import Input from "@/components/atoms/Input";
import Typography from "@/components/atoms/Typography";
import { useFormContext } from "react-hook-form";

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
  const methods = useFormContext();
  if (!methods) {
    console.error("LabelInput must be used within a FormProvider!");
    return null;
  }

  const { register } = methods;
  const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;

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
        {...register(name)}
        {...props}
      />
    </div>
  );
};

export default LabelInput;
