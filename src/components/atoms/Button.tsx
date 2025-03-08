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
  // 미완. 작업하면서 필요하면 추가할 예정
  Main: "text-mos-gray-500 data-[active=true]:bg-mos-main-500 data-[active=true]:text-white data-[active=true]:border-mos-main-500",
  Gray: "text-mos-gray-500 data-[active=true]:bg-mos-gray-500 data-[active=true]:text-white data-[active=true]:border-mos-gray-500",
  Green:
    "text-mos-gray-500 data-[active=true]:bg-mos-green-500 data-[active=true]:text-white data-[active=true]:border-mos-green-500",
  Blue: "text-mos-gray-500 data-[active=true]:bg-mos-blue-500 data-[active=true]:text-white data-[active=true]:border-mos-blue-500",
  Red: "text-mos-gray-500 data-[active=true]:bg-red-500 data-[active=true]:text-white data-[active=true]:border-red-500",
};

export interface SolidButtonProps extends ButtonProps {
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

const GhostButtonClass = {
  Main: "border border-mos-gray-100 text-mos-gray-500 data-[active=true]:text-mos-main-500 data-[active=true]:border-mos-main-500 data-[active=true]:hover:bg-white hover:text-mos-main-500 hover:border-mos-main-500 hover:hover:bg-white",
  Gray: "border border-mos-gray-100 text-mos-gray-500 data-[active=true]:text-black data-[active=true]:border-mos-gray-500 data-[active=true]:hover:bg-white hover:text-black hover:border-mos-gray-500 hover:hover:bg-white",
  Green:
    "border border-mos-gray-100 text-mos-gray-500 data-[active=true]:text-mos-green-500 data-[active=true]:border-mos-green-500 data-[active=true]:hover:bg-white hover:text-mos-green-500 hover:border-mos-green-500 hover:bg-white",
  Blue: "border border-mos-gray-100 text-mos-gray-500 data-[active=true]:text-mos-blue-500 data-[active=true]:border-mos-blue-500 data-[active=true]:hover:bg-white hover:text-mos-blue-500 hover:border-mos-blue-500 hover:bg-white",
  Red: "border border-mos-gray-100 text-mos-gray-500 data-[active=true]:text-red-500 data-[active=true]:border-red-500 data-[active=true]:hover:bg-white hover:text-red-500 hover:border-red-500 hover:bg-white",
};

interface GhostButtonProps extends ButtonProps {
  className?: string;
  active?: boolean;
  color: keyof typeof GhostButtonClass;
}

const GhostButton: React.FC<GhostButtonProps> = ({
  className,
  children,
  active = false,
  color,
  ...props
}) => {
  return (
    <DefaultButton
      className={cn(GhostButtonClass[color], className)}
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
  Ghost: GhostButton,
  Icon: IconButton,
};

export default Button;
