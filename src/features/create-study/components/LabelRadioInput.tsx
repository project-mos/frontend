import React from "react";
import Typography from "@/components/atoms/Typography";
import RadioGroup from "@/components/molecules/RadioGroup";

interface LabelRadioInputProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const LabelRadioInput = ({
  name,
  label,
  options,
  selectedValue,
  onChange,
  required,
}: LabelRadioInputProps) => {
  return (
    <div className="flex w-full flex-col gap-[5px]">
      <Typography.P1 className="text-[15px]">
        {label} {required ? "*" : ""}
      </Typography.P1>
      <RadioGroup
        name={name}
        options={options}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    </div>
  );
};

export default LabelRadioInput;
