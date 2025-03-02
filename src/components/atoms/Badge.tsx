import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

const BadgeColors = {
  Blue: "bg-mos-blue-500 text-white ",
  Green: "bg-mos-green-500 text-white ",
  Gray: "bg-mos-gray-500 text-white ",
  Pink: "bg-mos-pink-500 text-white ",
};

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  color?: keyof typeof BadgeColors;
}

const Badge = ({
  children,
  color = "Blue",
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={cn(
        "box-border flex h-[20px] items-center rounded-full px-2.5 text-[.75rem] font-semibold",
        BadgeColors[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
