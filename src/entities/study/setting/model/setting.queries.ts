import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStudyLateTimeSettings,
  userStudyLateTimeSettings,
  userStudyNoticeSettings,
  userStudySettings,
} from "@/entities/study/setting/api/setting.api";
import {
  LateTimeSettingRequest,
  NoticeSettingRequest,
  UsePatchLateTimeSettingProps,
  UsePutUserNoticeSettingProps,
} from "../api/setting.api.types";
import { useToast } from "@/shared/hooks/useToast";

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

// 스터디의 지각 기준, 결석 기준 시간 조회
export const useGetStudyLateTimeSettings = (studyId: number) =>
  useQuery({
    queryKey: ['lateTime', studyId],
    queryFn: () => getStudyLateTimeSettings(studyId),
    enabled: !!studyId,
    retry: false,
  });

// 스터디의 지각 기준, 결석 기준 시간 변경
export const useUpdateLateTimeSetting = ({
  onSuccess,
  onError,
  studyId,
}: UsePatchLateTimeSettingProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LateTimeSettingRequest) =>
      userStudyLateTimeSettings(studyId, data),
    onSuccess: () => {
      toast.success("변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: ['lateTime', studyId] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};