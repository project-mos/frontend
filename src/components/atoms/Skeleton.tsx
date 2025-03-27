import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

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
      <svg
        className="size-10 animate-pulse text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
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
      <svg
        className="size-10 text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      >
        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
      </svg>
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
      <svg
        className="size-10 text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
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
