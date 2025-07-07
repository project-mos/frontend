// 스터디 멤버 조회
export type GetStudyMembersResponse = {
  userId: number;
  nickname: string;
  studyMemberRoleType: "스터디장" | "스터디원";
  lastAttendanceDate: string;
  participationRate: number;
}[];
