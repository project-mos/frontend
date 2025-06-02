export interface activeStudiesProps {
  tag: string[];
  title: string;
  date: string;
  meta: {
    members: string;
    nextMeeting: string;
  };
}

export interface ApplyStatusProps {
  tag: string[];
  title: string;
  date: string;
}

export interface GetUserInfoResult {
  nickname: string,
  introduction: string,
  categories: string[]
  profileImage: string,
  joinDate: string,
}

export interface UpdateUserInfoResult  {
  nickname: string;
  introduction: string;
  categories: string[];
}

export interface GetMyApplyStatusResult { 
  studyId: number,
  title: string,
  category: string,
  studyJoinId: number,
  studyJoinStatus: string
  createdAt: string,
}

export interface GetMyJoinedStudiesResult { 
  id: number,
  title: string,
  category: string,
  meetingType: string,
  progressStatus: string,
  participationStatus: string,
  currentStudyMembers: number,
  maxStudyMembers: number,
  schedule: string,
  studyMemberRole: string,
  tags: string[]
}

export interface GetMySchedulesResult {
  studyScheduleId: 12,
  title: string,
  description: string,
  startDateTime: string,
  endDateTime: string,
  studyId: number,
  studyCurriculumResList: string[]
}