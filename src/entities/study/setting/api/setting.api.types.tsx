export interface SettingsResponse {
  noticePined: boolean;
  notificationEnabled: boolean;
  studyId: number;
  studyMemberId: number;
  userId: number;
}

export interface NoticeSettingRequest {
  noticePined: boolean;
  notificationEnabled: boolean;
}

export interface UsePutUserNoticeSettingProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  studyId: number;
}

export interface UsePatchLateTimeSettingProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  studyId: number;
}

export interface LateTimeSettingRequest {
  lateThresholdMinutes: number;
  absenceThresholdMinutes: number;
}

export interface LateTimeSettingResponse {
  studySettingId: number;
  studyId: number;
  lateThresholdMinutes: number;
  absenceThresholdMinutes: number;
}
