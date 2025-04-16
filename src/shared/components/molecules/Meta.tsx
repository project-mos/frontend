import cn from "@/shared/utils/cn";
import { HTMLAttributes, ReactNode } from "react";

import Typography from "@/shared/components/atoms/Typography";

interface MetaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  icon: string;
}

const Meta = ({ children, className, icon, ...props }: MetaProps) => {
  return (
    <div
      className={cn("flex items-center gap-1 text-mos-gray-500", className)}
      {...props}
    >
      <i className={`bi bi-${icon}`} />
      <Typography.P1 className={className}>{children}</Typography.P1>
    </div>
  );
};

export default Meta;
