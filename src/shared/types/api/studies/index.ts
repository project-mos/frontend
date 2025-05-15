// Study 다 건 조회 request
export type GetStudiesRequest = {
  page?: string;
  size?: string;
  sort?: string;
  category?: string;
  meetType?: string;
  recruitmentStatus?: string;
  progressStatus?: string;
  liked?: boolean;
};
// Study 다 건 조회 result
export type GetStudiesResult = {
  totalStudies: number;
  currentPage: number;
  totalPages: number;
  studies: Study[];
};

export type GetHotStudiesResult = Study[];
// Study 다 건 조회
export interface Study {
  id: number;
  title: string;
  category: string;
  meetingType: string;
  progressStatus: string;
  recruitmentStatus: "모집 중" | "모집 완료";
  recruitmentEndDate: string;
  currentStudyMembers: number;
  maxStudyMembers: number;
  viewCount: number;
  tags: string[];
}
// 인기 study 조회
