import { Study } from "@/entities/study/studies/api/studies.api.type";
import { HTMLAttributes } from "react";

export interface StudyLandingCardProps extends HTMLAttributes<HTMLDivElement> {
  data: Study;
}
