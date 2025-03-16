export interface StudyCurriculumCardInterface {
  step: string,
  title: string,
  content: string,
}

export interface StudyNoticeCardInterface {
  title: string,
  content: string,
  writer: string
}

export interface StudyManageCardInterface {
  name: string,
  date: string,
  questionList: {question:string, answer:string}[]
}
