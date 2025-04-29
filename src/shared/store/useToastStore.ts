// stores/useToastStore.ts
import { generateUUID } from "@/shared/utils/generateUUID";
import { create } from "zustand";

// Toast 타입 정의 (성공, 에러, 경고, 정보)
type ToastType = "success" | "error" | "warning" | "info";

// Toast 객체 형태 정의
interface Toast {
  id: string; // 고유 ID (자동 생성)
  content: string; // 토스트에 표시할 내용
  type: ToastType; // 토스트 타입 (색상, 스타일 구분용)
  duration: number; // 토스트가 화면에 표시될 시간(ms 단위)
}

// zustand로 관리할 상태 구조 정의
interface ToastState {
  toasts: Toast[]; // 현재 표시 중인 토스트 목록
  addToast: (toast: Omit<Toast, "id" | "duration">) => void; // 토스트 추가하는 함수
  removeToast: (id: string) => void; // 특정 토스트 제거하는 함수
}

// Toast ID를 고유하게 만들어줄 변수
export const TOAST_DURATION_TIME = 3000;

// zustand 스토어 생성
export const useToastStore = create<ToastState>((set) => ({
  // 초기 상태: 빈 토스트 배열
  toasts: [],

  // 새로운 토스트 추가하는 함수
  addToast: (toast) => {
    const id = generateUUID(); // 고유 ID 생성

    // 새로운 토스트를 추가해서 상태 업데이트
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id, duration: TOAST_DURATION_TIME, ...toast },
      ],
    }));

    // 지정한 duration 후에 자동으로 토스트 제거
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, TOAST_DURATION_TIME + 500); // 애니메이션 타임 고려
  },

  // 특정 ID의 토스트를 수동으로 제거하는 함수
  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
