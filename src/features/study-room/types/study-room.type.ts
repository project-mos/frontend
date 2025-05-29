import { SetStateAction } from "react";

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

export interface ContentInputBoxProps {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
  placeholder: string;
  type: "rule" | "benefit";
  studyId: string;
}

export interface InlineInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  placeholder: string;
}

export interface ManageOverviewCardProps {
  rules: string[];
  benefits: string[];
  studyId: string;
}

export interface PreviewBoxProps {
  data: string[];
  setState: React.Dispatch<SetStateAction<boolean>>;
}
