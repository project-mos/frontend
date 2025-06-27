import { GetQuestionsResponse } from "@/entities/study/question/api/question.api.types";
import { GetStudyResponse } from "@/entities/study/studies/api/studies.api.type";
import { Dispatch, SetStateAction } from "react";

export interface StudyApplicationSectionProps {
  data: GetStudyResponse;
}

export interface StudyApplicationInfoMessageProps {
  children: React.ReactNode;
}

export interface StudyApplicationFormFieldsProps {
  questions: GetQuestionsResponse;
}

export interface StudyApplyFormCardInterface {
  studyId: string;
  data: GetQuestionsResponse;
  setIsApplyVisible: Dispatch<SetStateAction<boolean>>;
}
