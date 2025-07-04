import { RuleInterface } from "@/features/study-room/types/study-room.type";

// Study 규칙
export interface Rule {
  id: number;
  ruleNum: number;
  content: string;
}

export type GetStudyRulesResponse = Rule[];

export type EditRuleRequest = {
  studyId: string;
  rules: RuleInterface[];
};

export type EditRulesResponse = Rule[];
