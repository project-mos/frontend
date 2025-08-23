import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  userStudyNoticeSettings,
  userStudySettings,
} from "@/entities/study/setting/api/setting.api";
import {
  NoticeSettingRequest,
  UsePutUserNoticeSettingProps,
} from "../api/setting.api.types";

// queryKey
export const settingsKey = (studyId: number) =>
  ["study", studyId, "settings"] as const;

// 유저 설정 조회
export const useGetStudySettings = (studyId: number) =>
  useQuery({
    queryKey: settingsKey(studyId),
    queryFn: () => userStudySettings(studyId),
    enabled: !!studyId,
  });

// 유저별 중요 공지 노출 여부 수정
export const usePutUserNoticeSetting = ({
  onSuccess,
  onError,
  studyId,
}: UsePutUserNoticeSettingProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NoticeSettingRequest) =>
      userStudyNoticeSettings(studyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKey(studyId) });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
