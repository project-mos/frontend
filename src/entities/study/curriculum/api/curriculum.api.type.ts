export interface Curriculum {
  sectionId: number;
  title: string;
  content: string;
}
export interface GetCurriculumResponse extends Curriculum {
  id?: number; // 백엔드에서 id가 없을 수도 있으므로 optional 유지
}

export interface StudyCurriculumResList extends Curriculum {
  studyCurriculumId: number;
}
