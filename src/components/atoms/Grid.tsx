import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: string;
  rows?: string;
  gap?: string;
  className?: string;
}

const Grid = ({
  children,
  cols = "12",
  rows,
  gap,
  className,
  ...props
}: GridProps) => {
  return (
    <div
      className={cn(
        "grid",
        "grid-cols-" + cols,
        rows && "grid-rows-" + rows,
        gap && "gap-" + gap,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;
