import { GetStudyCategoriesResponse } from "@/entities/study/category/api/category.api.types";
import { SolidButtonProps } from "@/shared/components/atoms/Button";

export type Categories =
  | GetStudyCategoriesResponse["categories"][number]
  | "전체";

export type StudyCategories = Record<"label" | "value", Categories | null>[];

export interface StudyFilterButtonProps
  extends Omit<
    SolidButtonProps,
    "key" | "active" | "disabled" | "onClick" | "color"
  > {
  categories: GetStudyCategoriesResponse;
}

export interface StudyFilterDropdownProps {
  type: "meet" | "recruitment";
}
