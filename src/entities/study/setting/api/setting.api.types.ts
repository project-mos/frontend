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
