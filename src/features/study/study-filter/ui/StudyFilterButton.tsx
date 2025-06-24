"use client";

import {
  StudyCategories,
  StudyFilterButtonProps,
} from "@/features/study/study-filter/ui/study-filter.ui.types";
import Button from "@/shared/components/atoms/Button";
import cn from "@/shared/utils/cn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const StudyFilterButton = ({
  categories,
  ...props
}: StudyFilterButtonProps) => {
  const currentSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { categories: categoriesData } = categories;

  // label, value 방식으로 변환(임시적용일 수 있음)
  const makeLabelCategoriesData: StudyCategories = categoriesData.map(
    (item) => {
      return { value: item, label: item };
    }
  );

  if (makeLabelCategoriesData) {
    makeLabelCategoriesData.unshift({ label: "전체", value: null });
  }

  const onClickCategory = (value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString());

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

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
          active={currentSearchParams.get("category") === value}
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
