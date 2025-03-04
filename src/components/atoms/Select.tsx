import { cn } from '@/lib/utils';
import React, {
  DetailedHTMLProps,
  HtmlHTMLAttributes,
  OptionHTMLAttributes,
} from 'react';

interface SelectProps extends HtmlHTMLAttributes<HTMLSelectElement> {
  className?: string;
  placeholder?: string;
}
const Select = ({
  className,
  children,
  placeholder,
  ...props
}: SelectProps) => {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          'appearance-none w-full box-border h-[40px] rounded-md border pl-5 pr-10 text-sm'
        )}
        {...props}
      >
        {placeholder && (
          <option disabled hidden value="">
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
        <i className="bi bi-chevron-down text-gray-500"></i>
      </div>
    </div>
  );
};

const Option = ({
  children,
  ...props
}: DetailedHTMLProps<
  OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>) => {
  return <option {...props}>{children}</option>;
};

Select.Option = Option;

export default Select;
