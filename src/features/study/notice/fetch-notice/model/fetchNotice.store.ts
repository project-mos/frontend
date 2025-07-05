// noticeStore.ts
import { create } from "zustand";

interface NoticeStore {
  noticeId?: number;
  setNoticeId: (id: number) => void;
}

export const useNoticeStore = create<NoticeStore>((set) => ({
  noticeId: undefined,
  setNoticeId: (id) => set({ noticeId: id }),
}));
