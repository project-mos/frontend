import React from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const Icon: React.FC<IconProps> = ({ src, alt, className, onClick }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("size-6 object-contain", className)}
      onClick={onClick}
    />
  );
};

export default Icon;
