import React from "react";
import Typography from "@/components/atoms/Typography";
import RadioGroup from "@/components/molecules/RadioGroup";
import { useFormContext } from "react-hook-form";

interface LabelRadioInputProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  required?: boolean;
}

const LabelRadioInput = ({
  name,
  label,
  options,
  required,
}: LabelRadioInputProps) => {
  const { register, watch, setValue } = useFormContext();

  const selectedValue = watch(name) || "";

  return (
    <div className="flex w-full flex-col gap-[5px]">
      <Typography.P1 className="text-[15px]">
        {label} {required ? "*" : ""}
      </Typography.P1>
      <RadioGroup
        {...register(name)}
        name={name}
        options={options}
        selectedValue={selectedValue}
        onChange={(value) => setValue(name, value)}
      />
    </div>
  );
};

export default LabelRadioInput;
