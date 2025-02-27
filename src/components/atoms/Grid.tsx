import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: keyof typeof gridCols;
  rows?: keyof typeof gridRows;
  gap?: number;
  className?: string;
}

const Grid = ({
  children,
  cols = 12,
  rows,
  gap,
  className,
  ...props
}: GridProps) => {
  return (
    <div
      className={cn(
        "grid",
        gridCols[cols],
        rows ? gridRows[rows] : "",
        gap ? `gap-${gap}` : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;

// tailwind 동적 할당 X
const gridCols = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

const gridRows = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
  7: "grid-rows-7",
  8: "grid-rows-8",
  9: "grid-rows-9",
  10: "grid-rows-10",
  11: "grid-rows-11",
  12: "grid-rows-12",
};
