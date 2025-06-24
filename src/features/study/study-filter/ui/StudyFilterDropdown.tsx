"use client";

import { meetTypes, recruitmentTypes } from "@/features/study/study-filter/lib";
import { StudyFilterDropdownProps } from "@/features/study/study-filter/ui/study-filter.ui.types";
import Select from "@/shared/components/atoms/Select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const StudyFilterDropdown = ({ type }: StudyFilterDropdownProps) => {
  const currentSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSelected = (
    type: StudyFilterDropdownProps["type"],
    value: string
  ) => {
    const params = new URLSearchParams(currentSearchParams.toString());

    if (type === "meet") {
      if (value) {
        params.set("meetType", value);
      } else {
        params.delete("meetType");
      }
    } else {
      if (value) {
        params.set("recruitmentStatus", value);
      } else {
        params.delete("recruitmentStatus");
      }
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      placeholder="진행 방식"
      defaultValue={currentSearchParams.get("meetType") || ""}
      className="text-mos-gray-500"
      onChange={(event) => onSelected(type, event.currentTarget.value)}
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
