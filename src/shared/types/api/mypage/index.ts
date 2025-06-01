export interface activeStudiesProps {
  tag: string[];
  title: string;
  meta: {
    members: string;
    nextMeeting: string;
  };
}

export interface applyStatusProps {
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

export interface updateUserInfoResult  {
  nickname: string;
  introduction: string;
  categories: string[];
}


export interface GetSchedulesResult {
  studyScheduleId: number,
  title: string,
  description: string,
  startDateTime: string,
  endDateTime: string,
  studyId: number,
  studyCurriculumResList: [
    {
      studyCurriculumId: number,
      sectionId: number,
      title: string,
      content: string
    }
  ]
}