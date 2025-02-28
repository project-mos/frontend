import React, { HTMLAttributes, ReactNode } from "react";
import Typography from "@/components/atoms/Typography";

interface StudyMetaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const StudyMeta = {
  Person: ({ children, className, ...props }: StudyMetaProps) => (
    <div
      className={`flex items-center gap-1 text-mos-gray-500 ${className ?? ""}`}
      {...props}
    >
      <i className="bi bi-people" />
      <Typography.P1 className={className}>{children}</Typography.P1>
    </div>
  ),
  Time: ({ children, className, ...props }: StudyMetaProps) => (
    <div
      className={`flex items-center gap-1 text-mos-gray-500 ${className ?? ""}`}
      {...props}
    >
      <i className="bi bi-clock" />
      <Typography.P1 className={className}>{children}</Typography.P1>
    </div>
  ),
  Date: ({ children, className, ...props }: StudyMetaProps) => (
    <div
      className={`flex items-center gap-1 text-mos-gray-500 ${className ?? ""}`}
      {...props}
    >
      <i className="bi bi-calendar" />
      <Typography.P1 className={className}>{children}</Typography.P1>
    </div>
  ),
  View: ({ children, className, ...props }: StudyMetaProps) => (
    <div
      className={`flex items-center gap-1 text-mos-gray-500 ${className ?? ""}`}
      {...props}
    >
      <i className="bi bi-eye" />
      <Typography.P1 className={className}>{children}</Typography.P1>
    </div>
  ),
};

export default StudyMeta;
