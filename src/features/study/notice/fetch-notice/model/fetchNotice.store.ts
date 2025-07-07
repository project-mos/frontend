// noticeStore.ts
import { create } from "zustand";

interface NoticeStore {
  noticeId?: number;
  setNoticeId: (id: number) => void;
  importantNotice: string | null; // 중요한 공지 사항을 저장할 상태
  setImportantNotice: (content: string | null) => void; // 상태 업데이트 함수
}

export const useNoticeStore = create<NoticeStore>((set) => ({
  noticeId: undefined,
  setNoticeId: (id) => set({ noticeId: id }),
  importantNotice: null, // 초기값을 null로 설정
  setImportantNotice: (content) => set({ importantNotice: content }), // 중요한 공지 사항을 설정하는 함수
}));
