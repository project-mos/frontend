export interface PostFcmTokenResponse {
  fcmToken: string;
}

export interface INotification {
  notificationId: number;
  recipientId: number;
  type: string;
  title: string;
  content: string;
  read: boolean;
  createdAt: string;
  dataPayload: {
    type?: string;
    studyId?: number;
    studyJoinId?: number;
    status?: string;
  };
}
export interface GetUnreadNotificationsNumResponse {
  unreadCount: number;
}

export interface GetNotificationsResponse {
  totalNotifications: number;
  currentPage: number;
  totalPages: number;
  notifications: INotification[];
}
