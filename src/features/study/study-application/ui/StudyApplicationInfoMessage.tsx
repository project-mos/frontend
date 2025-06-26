import { StudyApplicationInfoMessageProps } from "@/features/study/study-application/ui/study-application.ui.types";
import Typography from "@/shared/components/atoms/Typography";
import React from "react";

const StudyApplicationInfoMessage = ({
  children,
}: StudyApplicationInfoMessageProps) => {
  return (
    <div className="flex justify-center p-10">
      <Typography.SubTitle1 className="text-center text-mos-gray-500">
        {children}
      </Typography.SubTitle1>
    </div>
  );
};

export default StudyApplicationInfoMessage;
