import React, { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  priority?: boolean;
  unoptimized?: boolean;
}

const CustomImage = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      className,
      width = 300,
      height = 200,
      onClick,
      priority = false,
      unoptimized = false,
      ...props
    },
    ref
  ) => {
    return (
      <Image
        ref={ref as any}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        className={cn("w-full h-auto object-cover", className)}
        onClick={onClick}
        priority={priority}
        unoptimized={unoptimized}
        {...props}
      />
    );
  }
);

CustomImage.displayName = "CustomImage";
export default CustomImage;
