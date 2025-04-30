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
// Study 다 건 조회
export interface Study {
  id: number;
  title: string;
  category: string;
  meetingType: string;
  progressStatus: string;
  recruitmentStatus: string;
  recruitmentEndDate: string;
  currentStudyMembers: number;
  maxStudyMembers: number;
  viewCount: number;
  tags: string[];
}
// 인기 study 조회
export type GetHotStudiesResult = HotStudy[];
// 인기 study 조회
export interface HotStudy {
  id: number;
  title: string;
  category: string;
  meetingType: string;
  progressStatus: string;
  recruitmentStatus: string;
  recruitmentEndDate: string;
  currentStudyMembers: number;
  maxStudyMembers: number;
  viewCount: number;
  tags: string[];
}
