import SvgIcons from "@/asset/icon/SvgIcons";
import cn from "@/shared/utils/cn";
import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export type SkeletonLinearSize = "sm" | "md" | "lg";
export type SkeletonLinearWeight = "light" | "regular" | "bold";

interface SkeletonLinearProps extends SkeletonProps {
  size?: SkeletonLinearSize;
  weight?: SkeletonLinearWeight;
}

const LinearStyle: {
  size: {
    [K in SkeletonLinearSize]: string;
  };
  weight: {
    [K in SkeletonLinearWeight]: string;
  };
} = {
  size: {
    sm: " h-2",
    md: " h-2.5",
    lg: " h-3",
  },
  weight: {
    light: "bg-gray-200 dark:bg-gray-700",
    regular: "bg-gray-300 dark:bg-gray-700",
    bold: "bg-gray-400 dark:bg-gray-700",
  },
};

const Linear = ({
  className,
  size = "md",
  weight = "light",
  children,
}: SkeletonLinearProps) => {
  return (
    <div
      className={cn(
        LinearStyle.size[size],
        LinearStyle.weight[weight],
        "animate-pulse rounded-full ",
        className
      )}
    >
      {children}
    </div>
  );
};

const Wrapper = ({ className, children }: SkeletonProps) => {
  return (
    <div
      role="status"
      className={cn(
        "flex size-full min-h-20 min-w-20 flex-col gap-2.5",
        className
      )}
    >
      {children}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const Profile = ({ className, ...props }: SkeletonProps) => {
  return (
    <div role="status" className={cn(className)} {...props}>
      <SvgIcons.Profile />
    </div>
  );
};

const Video = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      role="status"
      className={cn(
        "flex h-56 w-full animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700",
        className
      )}
      {...props}
    >
      <SvgIcons.Video />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const Picture = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "flex h-48 w-full animate-pulse items-center justify-center rounded-md bg-gray-300 dark:bg-gray-700",
        className
      )}
      {...props}
    >
      <SvgIcons.Picture />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <Wrapper className={cn(className)}>
      <Linear size="sm" />
      <Linear size="md" />
      <Linear size="lg" />
      <Linear size="lg" />
      <Linear size="lg" />
      <Linear size="lg" />
    </Wrapper>
  );
};

Skeleton.Linear = Linear;
Skeleton.Wrapper = Wrapper;
Skeleton.Picture = Picture;
Skeleton.Video = Video;
Skeleton.Profile = Profile;

export default Skeleton;
