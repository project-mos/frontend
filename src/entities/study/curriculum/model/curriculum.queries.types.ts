/* study curriculum */
export interface StudyCurriculumCardInterface {
  id?: number;
  sectionId: number;
  title: string;
  content: string;
}

export interface UsePostCurriculumProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export type FormValues = {
  curriculumList: StudyCurriculumCardInterface[];
};