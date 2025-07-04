export interface Benefit {
  benefitNum: number;
  content: string;
}

export type GetStudyBenefitResponse = {
  id: number;
} & Benefit;

export type GetStudyBenefitsResponse = GetStudyBenefitResponse[];

export type EditBenefitRequest = {
  studyId: string;
  benefits: Benefit[];
};

export type EditBenefitResponse = Benefit[];
