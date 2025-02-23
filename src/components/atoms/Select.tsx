import { cn } from "@/lib/utils";
import React, {
  DetailedHTMLProps,
  HtmlHTMLAttributes,
  OptionHTMLAttributes,
} from "react";

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
    <select
      className={cn(
        "select select_renewal border rounded-md px-7 py-3 text-sm pr-[80px]",
        className
      )}
      {...props}
    >
      {placeholder && (
        <Option disabled hidden value="">
          {placeholder}
        </Option>
      )}
      {children}
    </select>
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
