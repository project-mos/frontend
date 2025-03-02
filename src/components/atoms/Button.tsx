import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes } from "react";

const DefaultButtonClass =
  "box-border px-4 py-2 border rounded-md border-gray-200 transition-all duration-200 text-sm bg-white text-black flex items-center gap-2 h-[40px] w-fit min-w-fit justify-center";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  active?: boolean;
}

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

const SolidButtonClass = {
  Main: "hover:text-mos-main-500 hover:mos-gray-500 hover:border-mos-main-500  data-[active=true]:bg-mos-main-500 data-[active=true]:text-white data-[active=true]:border-mos-main-500",
  // 미완. 작업하면서 필요하면 추가할 예정
  Gray: "text-mos-gray-700 bg-mos-white-gray-100 text-black",
  Green: "bg-mos-green-500 text-white border-mos-green-500",
  Blue: "text-mos-blue-700 border-mos-blue-500",
  Red: "text-red-700 border-red-500",
};

interface SolidButtonProps extends ButtonProps {
  className?: string;
  active?: boolean;
  color: keyof typeof SolidButtonClass;
}

const SolidButton: React.FC<SolidButtonProps> = ({
  className,
  children,
  active = false,
  color,
  ...props
}) => {
  return (
    <DefaultButton
      className={cn(SolidButtonClass[color], className)}
      active={active}
      {...props}
    >
      {children}
    </DefaultButton>
  );
};

const IconButtonClass = {
  // active 시 추가 효과 기입 가능
  Gray: "text-mos-gray-700 text-mos-gray-700",
  Blue: "text-mos-blue-700 border-mos-blue-500",
  Green: "bg-mos-green-500 text-white border-mos-green-500",
  Red: "text-red-700 border-red-500",
};

interface IconButtonProps extends Omit<SolidButtonProps, "color"> {
  color?: keyof typeof IconButtonClass;
}

const IconButton: React.FC<IconButtonProps> = ({
  className,
  children,
  active = false,
  color = "Gray",
  ...props
}) => {
  return (
    <DefaultButton
      className={cn("size-10 p-3", IconButtonClass[color], className)}
      active={active}
      {...props}
    >
      {children}
    </DefaultButton>
  );
};
const Button = {
  Default: DefaultButton,
  Solid: SolidButton,
  Icon: IconButton,
};

export default Button;
