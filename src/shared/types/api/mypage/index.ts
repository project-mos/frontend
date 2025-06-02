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
