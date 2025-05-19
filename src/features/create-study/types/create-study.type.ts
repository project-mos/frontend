export interface StudyFormInterface {
  title: string;
  category: string;
  maxStudyMemberCount: number;
  recruitmentStartDate: string;
  recruitmentEndDate: string;
  tags: string[];
  meetingType: string;
  schedule: string;
  content: string;
  requirements: string;
  rules: { ruleNum: number; content: string }[];
  benefits: { benefitNum: number; content: string }[];
  applicationQuestions: {
    questionNum: number;
    question: string;
    required: boolean;
    type: string;
    options: string[];
  }[];
}

export interface AccessTokenProps {
  accessToken?: string;
}
