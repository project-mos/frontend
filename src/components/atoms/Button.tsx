import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  active?: boolean;
  icon?: {
    svg?: React.ReactNode; // SVG 요소 직접 전달 가능
    src?: string; // 아이콘 파일 경로 (PNG, JPG, SVG 파일 가능)
    alt?: string; // 아이콘 대체 텍스트
  };
}

const DefaultButtonClass =
  "px-5 py-2 border rounded-md border-gray-200 transition-all duration-200 text-sm bg-white text-mos-gray-700 flex items-center gap-2 h-[62px]";
const SvgIconClass =
  "w-6.5 h-6.5 fill-current text-current group-hover:text-current ";

const DefaultButton: React.FC<ButtonProps> = ({
  className,
  children,
  active = false,
  icon,
  ...props
}) => {
  return (
    <button
      className={cn(DefaultButtonClass, className)}
      data-active={active}
      {...props}
    >
      {/* SVG 직접 전달하는 경우 */}
      {icon?.svg && <span className={cn(SvgIconClass)}>{icon.svg}</span>}

      {/* 이미지 파일 경로로 전달하는 경우 Next.js 이미지 최적화 */}
      {icon?.src && (
        <Image width={26} height={26} src={icon.src} alt={icon.alt || "icon"} />
      )}
      {children && icon ? (
        <div className={cn("ml-2")}>{children}</div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

const MainButtonClass =
  "hover:text-mos-main-500 hover:mos-gray-500 hover:border-mos-main-500  data-[active=true]:bg-mos-main-500 data-[active=true]:text-white data-[active=true]:border-mos-main-500";

const MainButton: React.FC<ButtonProps> = ({
  className,
  children,
  active = false,
  icon,
  ...props
}) => {
  return (
    <DefaultButton
      className={cn(MainButtonClass, className)}
      active={active}
      icon={icon}
      {...props}
    >
      {children}
    </DefaultButton>
  );
};

const GrayButtonClass =
  "px-5 py-2 border rounded-md border-gray-200 transition-all duration-200 text-sm bg-mos-white-gray-100 text-black";

const GrayButton: React.FC<ButtonProps> = ({
  className,
  children,
  active = false,
  icon,

  ...props
}) => {
  return (
    <DefaultButton
      className={cn(GrayButtonClass, className)}
      active={active}
      icon={icon}
      {...props}
    >
      {children}
    </DefaultButton>
  );
};

const Button = {
  Default: DefaultButton,
  Main: MainButton,
  Gray: GrayButton,
};

export default Button;
