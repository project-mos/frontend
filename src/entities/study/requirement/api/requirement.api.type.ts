// study 참여 요건 조회
export interface GetStudyRequirementResponse {
  id: number;
  requirementNum: number;
  content: string;
}
export type GetStudyRequirementsResponse = GetStudyRequirementResponse[];
