export interface StudyCurriculumCardInterface {
  id: string,
  step: string,
  title: string,
  content: string,
}

export interface StudyNoticeCardInterface {
  id: number,
  title: string,
  content: string,
  writer: string
}

export interface StudyManageCardInterface {
  name: string,
  date: string,
  email: string,
  experience: string,
  questionList: {question:string, answer:string}[]
}
