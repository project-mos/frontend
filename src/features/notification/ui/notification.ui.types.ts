import { INotification } from "@/entities/notification/api/notification.api.type";

export interface NotificationListProps {
  notifications: INotification[];
  onItemClick?: (notification: INotification) => void;
  onDelete?: (notificationId: string) => void;
}
