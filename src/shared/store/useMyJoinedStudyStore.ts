import { create } from "zustand";
import { GetMyJoinedResponse } from "@/entities/study/join/api/join.api.type";

interface ScheduleStore {
  myJoinedStudiesData: GetMyJoinedResponse[] | null;
  setMyJoinedStudiesData: (data: GetMyJoinedResponse[]) => void;
}

// 내가 참여한 스터디 데이터를 관리하는 스토어
export const useMyJoinedStudyStore = create<ScheduleStore>((set) => ({
  myJoinedStudiesData: null,
  setMyJoinedStudiesData: (data) => set({ myJoinedStudiesData: data }),
}));