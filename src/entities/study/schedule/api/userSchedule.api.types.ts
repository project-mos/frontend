import { Curriculum } from "@/entities/study/curriculum/api/curriculum.api.type";

export interface GetSchedulesResponse extends PostUserScheduleResponse {
  studyScheduleId: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  studyId: number;
  studyCurriculumResList: studyCurriculumResponse[];
}

export interface PostUserScheduleResponse {
  id: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
}

export interface PostUserScheduleRequest {
  id?: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
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
