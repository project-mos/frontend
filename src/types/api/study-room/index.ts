export interface StudyCurriculumCardInterface {
  step: string;
  title: string;
  content: string;
}

export interface StudyNoticeCardInterface {
  title: string;
  content: string;
  writer: string;
}

export interface StudyManageCardInterface {
  name: string;
  date: string;
  email: string;
  experience: string;
  questionList: { question: string; answer: string }[];
}

export interface StudyMemberCardInterface {
  role: "스터디장" | "스터디원";
  name: string;
  date: string;
  progress: number;
}
