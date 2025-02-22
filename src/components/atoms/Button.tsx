import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  active?: boolean;
}

const DefaultButtonClass =
  "px-5 py-2 border rounded-md text-btn-text-color border-gray-200 transition-all duration-200 text-sm bg-white";

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
  "hover:bg-white hover:text-main-color hover:border-main-color  data-[active=true]:bg-main-color data-[active=true]:text-white data-[active=true]:border-main-color";

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
