import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface IconProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const Icon: React.FC<IconProps> = ({ src, alt, className, onClick }) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={cn("size-6 object-contain", className)}
      onClick={onClick}
    />
  );
};

export default Icon;
