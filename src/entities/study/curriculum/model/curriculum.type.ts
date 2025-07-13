/* study curriculum */
export interface StudyCurriculumCardInterface {
  id?: number;
  sectionId: number;
  title: string;
  content: string;
}

export type FormValues = {
  curriculumList: StudyCurriculumCardInterface[];
};
