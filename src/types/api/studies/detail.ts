// 나중에 api result 확정되면 정리할 예정
export interface StudiesDescriptionApiResult {
  // status 및 api result 추가
  data: StudiesDescription;
}

export interface StudiesDescription {
  id: number;
  category: string;
  status: string;
  mode: string;
  title: string;
  views: number;
  participants: Participants;
  schedule: Schedule;
  tags: string[];
  description: Description;
}

export interface Participants {
  current: number;
  max: number;
}

export interface Schedule {
  startDate: string;
  endDate: string;
  weeklyMeeting: string;
}

export interface Description {
  intro: string;
  requirements: string[];
  rules: string[];
  benefits: string[];
}

export interface StudyCardInterface {
  study: {
    title: string;
    contents: string;
    deadline: string;
    category: string;
    type: string;
    recruit: boolean;
    tags: string[];
    members: { current: number; max: number };
    views: number;
  };
}

export interface StudyCurriculumInterface {
  step: string,
  title: string,
  content: string,
  task: string[],
}