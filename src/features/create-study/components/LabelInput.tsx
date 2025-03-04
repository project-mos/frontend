import React from 'react';
import { cn } from '@/lib/utils';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';

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
  const inputId = id ?? `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={cn('flex flex-col gap-[5px] w-full', className)}>
      <label htmlFor={inputId}>
        <Typography.P1>
          {label} {required ? '*' : ''}
        </Typography.P1>
      </label>

      <Input id={inputId} className="w-full" required={required} {...props} />
    </div>
  );
};

export default LabelInput;
