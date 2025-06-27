// Study 규칙
export interface StudyRule {
  id: number;
  ruleNum: number;
  content: string;
}

export type GetStudyRulesResponse = StudyRule[];

export type EditStudyRule = Omit<StudyRule, "id">;

export type EditRuleRequest = {
  studyId: string; // id로 바꾸면 되긴함
  rules: EditStudyRule;
};

export type EditRuleResponse = EditStudyRule[];
