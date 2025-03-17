import { useFormContext } from "react-hook-form";
import RadioButton from "../atoms/RadioButton";

interface RadioGroupProps {
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioGroup = ({
  name,
  options,
  selectedValue,
  onChange,
}: RadioGroupProps) => {
  const { clearErrors } = useFormContext();

  return (
    <div className="flex items-center gap-4">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={(e) => {
            console.log(e.target.value);
            onChange(e.target.value);
            clearErrors(name);
          }}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
