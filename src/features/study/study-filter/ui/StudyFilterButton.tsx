"use client";

import useStudyFilter from "@/features/study/study-filter/model/useStudyFilter";
import {
  StudyCategories,
  StudyFilterButtonProps,
} from "@/features/study/study-filter/ui/study-filter.ui.types";
import Button from "@/shared/components/atoms/Button";
import cn from "@/shared/utils/cn";

import React from "react";

const StudyFilterButton = ({
  categories,
  ...props
}: StudyFilterButtonProps) => {
  const { categories: categoriesData } = categories;
  const { onClickCategory, searchParams } = useStudyFilter();

  // label, value 방식으로 변환(임시적용일 수 있음)
  const makeLabelCategoriesData: StudyCategories = categoriesData.map(
    (item) => {
      return { value: item, label: item };
    }
  );

  if (makeLabelCategoriesData) {
    makeLabelCategoriesData.unshift({ label: "전체", value: null });
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2 ">
      {makeLabelCategoriesData.map(({ label, value }) => (
        <Button.Ghost
          className={cn(
            "hover:border-mos-main-500 hover:text-mos-main-500",
            props.className
          )}
          {...props}
          key={value || "all"}
          active={searchParams.get("category") === value}
          disabled={false}
          onClick={() => onClickCategory(value || "")}
          color="Main"
        >
          {label}
        </Button.Ghost>
      ))}
    </div>
  );
};

export default StudyFilterButton;
