import Typography from "@/components/atoms/Typography";

interface LabelProps {
  label: string;
  required?: boolean;
  htmlFor?: string;
}

const Label = ({ label, required = false, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="flex items-center">
      <Typography.P1 className="text-[15px]">
        {label} {required ? "*" : ""}
      </Typography.P1>
    </label>
  );
};

export default Label;
