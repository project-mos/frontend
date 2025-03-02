import React, { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  className?: string;
}

const CustomImage = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full h-64">
        <Image
          ref={ref}
          className={cn("object-cover", className)}
          fill
          {...props}
        />
      </div>
    );
  }
);

CustomImage.displayName = "CustomImage";
export default CustomImage;
