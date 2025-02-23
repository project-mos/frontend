import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  active?: boolean;
}

const DefaultButtonClass =
  "px-5 py-2 border rounded-md border-gray-200 transition-all duration-200 text-sm bg-white text-mos-gray-700";

const DefaultButton: React.FC<ButtonProps> = ({
  className,
  children,
  active = false,
  ...props
}) => {
  return (
    <button
      className={cn(DefaultButtonClass, className)}
      data-active={active}
      {...props}
    >
      {children}
    </button>
  );
};

const CategoryButtonClass =
  "hover:text-mos-main-500 hover:mos-gray-500 hover:border-mos-main-500  data-[active=true]:bg-mos-main-500 data-[active=true]:text-white data-[active=true]:border-mos-main-500";

const CategoryButton: React.FC<ButtonProps> = ({
  className,
  children,
  active = false,
  ...props
}) => {
  return (
    <DefaultButton
      className={cn(CategoryButtonClass, className)}
      active={active}
      {...props}
    >
      {children}
    </DefaultButton>
  );
};

const Button = {
  Default: DefaultButton,
  Category: CategoryButton,
};

export default Button;
