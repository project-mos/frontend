import { create } from "zustand";
import { GetMyApplyStatusResult } from "@/shared/types/api/mypage";

interface ApplyStatusStore {
  selectedApplyStatus: GetMyApplyStatusResult; 
  setSelectedApplyStatus: (data: GetMyApplyStatusResult) => void; 
  allApplyStatus?: GetMyApplyStatusResult[];
  setAllApplyStatus?: (data: GetMyApplyStatusResult[]) => void;
}

export const useApplyStatusStore = create<ApplyStatusStore>((set) => ({
  // 초기값 설정
  selectedApplyStatus: {
    studyId: 0,
    title: "",
    category: "",
    studyJoinId: 0,
    studyJoinStatus: "",
    createdAt: "",
  },
  allApplyStatus: [],

  // 선택된 지원 상태 업데이트 함수
  setSelectedApplyStatus: (data: GetMyApplyStatusResult) =>
    set({ selectedApplyStatus: data }),

  // 모든 지원 상태 업데이트 함수
  setAllApplyStatus: (data: GetMyApplyStatusResult[]) =>
    set({ allApplyStatus: data }),
}));