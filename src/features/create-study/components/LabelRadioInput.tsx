import Label from "@/components/molecules/Label";
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
      <Label htmlFor={name} required={required} label={label} />
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
