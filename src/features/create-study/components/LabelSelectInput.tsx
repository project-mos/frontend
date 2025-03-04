import Select from '@/components/atoms/Select';
import Typography from '@/components/atoms/Typography';
import { HTMLAttributes } from 'react';

interface LabelSelectInputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  required?: boolean;
  selectList: string[];
}

const LabelSelectInput = ({
  label,
  id,
  className,
  required,
  selectList,
  ...props
}: LabelSelectInputProps) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="flex flex-col gap-[5px] w-full" {...props}>
      <label htmlFor={inputId}>
        <Typography.P1>
          {label} {required && <span>*</span>}
        </Typography.P1>
      </label>

      <Select className="w-full focus:border-mos-main-500 focus:outline-none">
        {selectList.map((option, index) => (
          <Select.Option key={index} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default LabelSelectInput;
