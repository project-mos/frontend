export interface Benefit {
  benefitNum: number;
  content: string;
}

export type GetStudyBenefitResponse = {
  id: number;
} & Benefit;

export type GetStudyBenefitsResponse = GetStudyBenefitResponse[];

export type PostBenefitRequest = {
  studyId: string;
  benefits: Benefit[];
};

export type PostBenefitResponse = Benefit;
