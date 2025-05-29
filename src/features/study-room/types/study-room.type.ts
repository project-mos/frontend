export interface StudyDetailPageProps {
  params: Promise<{ id: string }>;
}

export interface RuleInterface {
  ruleNum: number;
  content: string;
}

export interface BenefitInterface {
  benefitNum: number;
  content: string;
}
