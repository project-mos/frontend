import cn from "@/shared/utils/cn";
import Image from "next/image";
import React, { forwardRef } from "react";

interface ImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  className?: string;
}

const CustomImage = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt = "", ...props }, ref) => {
    return (
      <div className="relative h-64 w-full">
        <Image
          ref={ref}
          className={cn("object-cover", className)}
          fill
          alt={alt}
          {...props}
        />
      </div>
    );
  }
);

CustomImage.displayName = "CustomImage";
export default CustomImage;
