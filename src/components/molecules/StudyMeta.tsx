import React, { ReactNode } from "react";
import Typography from "@/components/atoms/Typography";

interface StudyMetaProps {
  children: ReactNode;
}

const StudyMeta = {
  Person: ({ children }: StudyMetaProps) => (
    <div className="flex items-center gap-1 text-mos-gray-500">
      <i className="bi bi-people" />
      <Typography.P1>{children}</Typography.P1>
    </div>
  ),
  Time: ({ children }: StudyMetaProps) => (
    <div className="flex items-center gap-1 text-mos-gray-500">
      <i className="bi bi-clock" />
      <Typography.P1>{children}</Typography.P1>
    </div>
  ),
  Date: ({ children }: StudyMetaProps) => (
    <div className="flex items-center gap-1 text-mos-gray-500">
      <i className="bi bi-calendar" />
      <Typography.P1>{children}</Typography.P1>
    </div>
  ),
  View: ({ children }: StudyMetaProps) => (
    <div className="flex items-center gap-1 text-mos-gray-500">
      <i className="bi bi-eye" />
      <Typography.P1>{children}</Typography.P1>
    </div>
  ),
};

export default StudyMeta;
