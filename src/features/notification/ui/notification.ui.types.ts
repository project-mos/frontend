import { Notification } from "@/entities/notification/lib/mock/notification.mock";

export interface NotificationListProps {
  notifications: Notification[];
  onItemClick?: (notification: Notification) => void;
  onDelete?: (notificationId: string) => void;
}
