import Input from '@/components/atoms/Input';
import React from 'react';

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
}

const LabelInput = ({
  label,
  id,
  className,
  required,
  ...props
}: LabelInputProps) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="flex flex-col gap-[5px] w-full">
      <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
        {label} {required && <span>*</span>}
      </label>

      <Input id={inputId} className={`w-full ${className ?? ''}`} {...props} />
    </div>
  );
};

export default LabelInput;
