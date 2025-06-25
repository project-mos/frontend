"use client";

import useStudyFilter from "@/features/study/study-filter/model/useStudyFilter";
import { meetTypes, recruitmentTypes } from "@/features/study/study-filter/lib";
import { StudyFilterDropdownProps } from "@/features/study/study-filter/ui/study-filter.ui.types";
import Select from "@/shared/components/atoms/Select";

const StudyFilterDropdown = ({ type }: StudyFilterDropdownProps) => {
  const { searchParams, onClickSelected } = useStudyFilter();

  return (
    <Select
      placeholder="진행 방식"
      defaultValue={searchParams.get("meetType") || ""}
      className="text-mos-gray-500"
      onChange={(event) => onClickSelected(type, event.currentTarget.value)}
    >
      {type === "meet" &&
        meetTypes.map(({ label, value }) => {
          return (
            <Select.Option key={value} value={value || ""}>
              {label}
            </Select.Option>
          );
        })}
      {type === "recruitment" &&
        recruitmentTypes.map(({ label, value }) => {
          return (
            <Select.Option key={value} value={value || ""}>
              {label}
            </Select.Option>
          );
        })}
    </Select>
  );
};

export default StudyFilterDropdown;
