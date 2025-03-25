import ErrorMessage from "@/components/atoms/ErrorMessage";
import Label from "@/components/molecules/Label";
import RadioGroup from "@/components/molecules/RadioGroup";
import { HTMLAttributes } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface LabelRadioInputProps<T extends FieldValues>
  extends HTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  id?: string;
  required?: boolean;
  options: { label: string; value: string }[];
  registerOptions?: RegisterOptions<T, Path<T>>;
}
const LabelRadioInput = <T extends FieldValues>({
  name,
  label,
  options,
  required,
  registerOptions,
  ...props
}: LabelRadioInputProps<T>) => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<T>();

  // const inputId = id ?? `input-${name.replace(/\s+/g, "-").toLowerCase()}`;
  const selectedValue = watch(name) || "";

  return (
    <div className="flex w-full flex-col gap-[5px]">
      <Label htmlFor={name} required={required} label={label} />
      <RadioGroup
        {...register(name, registerOptions)}
        name={name}
        options={options}
        selectedValue={selectedValue}
        {...props}
      />
      {errors[name]?.message && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
};

export default LabelRadioInput;
