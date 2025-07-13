// Study 질문 조회
export type Question = {
  id?: number;
  questionNum: number;
  question: string;
  type: "객관식" | "주관식";
  options: string[];
  required: boolean;
};

export type GetQuestionsResponse = Question[];
