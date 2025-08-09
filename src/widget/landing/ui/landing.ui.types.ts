import { GetStudyCategoriesResponse } from "@/entities/study/category/api/category.api.type";
import {
  GetHotStudiesResponse,
  GetStudiesRequest,
  GetStudiesResponse,
} from "@/entities/study/studies/api/studies.api.type";

export interface LandingContentHeaderProps {
  categories: GetStudyCategoriesResponse;
}

export interface LandingContentCardsProps {
  studiesData: GetStudiesResponse;
  hotStudiesData: GetHotStudiesResponse;
  studiesRequest: GetStudiesRequest
}

export interface LandingEmptyContentsProps {
  content: string;
}

export interface LandingGridProps {
  children: React.ReactNode;
}
