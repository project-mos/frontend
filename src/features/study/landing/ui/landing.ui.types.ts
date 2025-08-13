import {
  Study,
} from "@/entities/study/studies/api/studies.api.type";
import { HTMLAttributes } from "react";

export interface StudyLandingCardProps extends HTMLAttributes<HTMLDivElement> {
  data: Study;
  studyIds: number[];
}

export interface GetLikeStudyResponse {
  studyId: number;
  likedCount: number;
  isLiked: boolean;
}

export interface MetaLikeProps {
  studyId: number;
  studyIds: number[];
  disabled?:boolean
}