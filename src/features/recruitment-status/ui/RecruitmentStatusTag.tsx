import { RecruitmentStatusTagProps } from "@/features/recruitment-status/ui/recruitment-status.ui.types";
import Tag from "@/shared/components/atoms/Tag";
import React from "react";

const RecruitmentStatusTag = ({
  recruitmentStatus,
}: RecruitmentStatusTagProps) => {
  return (
    <div>
      {recruitmentStatus === "모집 중" ? (
        <Tag.Green bold border={false}>
          모집중
        </Tag.Green>
      ) : recruitmentStatus === "모집 완료" ? (
        <Tag.Gray bold border={false}>
          모집 완료
        </Tag.Gray>
      ) : (
        <Tag.Pink bold border={false}>
          모집 예정
        </Tag.Pink>
      )}
    </div>
  );
};

export default RecruitmentStatusTag;
