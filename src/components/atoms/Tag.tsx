import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

const TagClass = {
  Default:
    "box-border flex justify-center items-center bg-white text-black border-2 rounded-md px-3 py-2 text-[14px] font-bold h-[30px]",
  Green: "bg-mos-green-100 !text-mos-green-500 border-mos-green-300 ",
  Blue: "bg-mos-blue-100 !text-mos-blue-500 border-mos-blue-300 ",
  Pink: "bg-mos-pink-100 !text-mos-pink-500 border-mos-pink-300 ",
  Gray: "bg-mos-gray-100 !text-mos-gray-500 border-mos-gray-500 ",
};

const ButtonTypeClass = {
  Detail: "bg-mos-white-gray-100 rounded-[20px] text-mos-gray-300",
  Card: "bg-mos-white-gray-100",
};

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  type?: keyof typeof ButtonTypeClass;
  border?: boolean;
}

const TagComponent: React.FC<TagProps & { color: keyof typeof TagClass }> = ({
  className,
  border = true,
  children,
  color,
  type,
  ...props
}) => {
  return (
    <div
      className={cn(
        TagClass.Default,
        type && ButtonTypeClass[type],
        color !== "Default" && TagClass[color], // 동적 색상 적용
        !border && "border-none",
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
  Detail: (props: TagProps) => (
    <TagComponent {...props} type="Detail" color="Default" />
  ),
  Card: (props: TagProps) => (
    <TagComponent {...props} type="Card" color="Default" />
  ),
};

export default Tag;
