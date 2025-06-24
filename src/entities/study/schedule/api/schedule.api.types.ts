import { Curriculum } from "@/entities/study/curriculum/api/curriculum.api.types";

export interface GetSchedulesResponse {
  studyScheduleId: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  studyId: number;
  studyCurriculumResList: studyCurriculumResponse[];
}

export interface PostStudyScheduleResponse {
  description: string;
  endDateTime: string;
  startDateTime: string;
  title: string;
}

export interface GetStudyScheduleResponse {
  studyScheduleId: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  studyId: number;
  studyCurriculumResList: studyCurriculumResponse[];
}

interface studyCurriculumResponse extends Curriculum {
  studyCurriculumId: number;
}
