import cn from "@/shared/utils/cn";
import { HTMLAttributes } from "react";

import Card from "../atoms/Card";
import Skeleton from "../atoms/Skeleton";

interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SkeletonCard = ({ className, ...props }: SkeletonCardProps) => {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <Skeleton />
    </Card>
  );
};

export default SkeletonCard;
