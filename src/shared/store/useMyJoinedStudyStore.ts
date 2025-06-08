import { create } from "zustand";
import { GetMyJoinedStudiesResult } from "../types/api/mypage";

interface ScheduleStore {
  myJoinedStudiesData: GetMyJoinedStudiesResult[] | null;
  setMyJoinedStudiesData: (data: GetMyJoinedStudiesResult[]) => void;
}

// 내가 참여한 스터디 데이터를 관리하는 스토어
export const useMyJoinedStudyStore = create<ScheduleStore>((set) => ({
  myJoinedStudiesData: null,
  setMyJoinedStudiesData: (data) => set({ myJoinedStudiesData: data }),
}));