// Study 다 건 조회 result
export type GetStudiesResponse = {
  totalStudies: number;
  currentPage: number;
  totalPages: number;
  studies: Study[];
};
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

// 인기 Study 다 건 조회
export type GetHotStudiesResponse = Study[];
