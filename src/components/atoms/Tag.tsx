import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

const ButtonClass = {
  Default:
    "flex justify-center items-center bg-white text-black border-2 rounded-md px-4 py-2 text-xxs font-bold ",
  Green: "bg-mos-green-100 !text-mos-green-500 border-mos-green-300 ",
  Blue: "bg-mos-blue-100 !text-mos-blue-500 border-mos-blue-300 ",
  Pink: "bg-mos-pink-100 !text-mos-pink-500 border-mos-pink-300 ",
  Gray: "bg-mos-gray-100 !text-mos-gray-500 border-mos-gray-500 ",
};

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const TagComponent: React.FC<
  TagProps & { color: keyof typeof ButtonClass }
> = ({ className, children, size = "md", color, ...props }) => {
  return (
    <div
      className={cn(
        ButtonClass.Default,
        color !== "Default" && ButtonClass[color], // 동적 색상 적용
        size === "sm" && " text-xxs px-3 py-1 max-h-7 ",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// 태그 객체로 내보내기
const Tag = {
  Default: (props: TagProps) => <TagComponent {...props} color="Default" />,
  Green: (props: TagProps) => <TagComponent {...props} color="Green" />,
  Blue: (props: TagProps) => <TagComponent {...props} color="Blue" />,
  Pink: (props: TagProps) => <TagComponent {...props} color="Pink" />,
  Gray: (props: TagProps) => <TagComponent {...props} color="Gray" />,
};

export default Tag;
