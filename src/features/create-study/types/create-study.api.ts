import { StudyFormInterface } from "./create-study.type";

export type CreateStudyRequest = {
  form: StudyFormInterface;
};

export type CreateStudyResponse = {
  studyId: number;
};
