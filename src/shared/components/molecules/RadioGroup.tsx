import RadioButton, { RadioButtonProps } from "../atoms/RadioButton";

interface RadioGroupProps
  extends Omit<RadioButtonProps, "label" | "value" | "checked"> {
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
}

const RadioGroup = ({
  name,
  options,
  selectedValue,
  ...props
}: RadioGroupProps) => {
  return (
    <div className="flex items-center gap-4">
      {options.map(({ label, value }) => (
        <RadioButton
          key={value}
          name={name}
          label={label}
          value={value}
          checked={selectedValue === value}
          {...props}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
