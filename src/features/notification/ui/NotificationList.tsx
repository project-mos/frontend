import React from "react";
import { Notification } from "@/entities/notification/lib/mock/notification.mock";
import Typography from "@/shared/components/atoms/Typography";
import Card from "@/shared/components/atoms/Card";
import { formatRelativeTime } from "@/shared/utils/date";
import cn from "@/shared/utils/cn";
import { NotificationListProps } from "./notification.ui.types";

// 읽지 않은 알림 표시 컴포넌트 (타이틀 우측 상단)
const UnreadIndicator = () => (
  <div className="absolute -right-2.5 top-1">
    {/* 고정된 파란 점 */}
    <div className="size-1.5 rounded-full bg-mos-blue-500" />
    {/* ping 애니메이션 효과 */}
    <div className="absolute left-0 top-0 size-1.5 animate-ping rounded-full bg-mos-blue-500" />
  </div>
);

const NotificationList = ({
  notifications,
  onItemClick,
  onDelete,
}: NotificationListProps) => {
  // 알림 아이콘 설정
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "study":
        return "bi-book";
      case "chat":
        return "bi-chat-dots";
      case "system":
        return "bi-gear";
      default:
        return "bi-bell";
    }
  };

  // 알림 타입별 색상 설정 (mos 색상 사용)
  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "study":
        return "bg-mos-green-100 text-mos-green-500";
      case "chat":
        return "bg-mos-blue-100 text-mos-blue-500";
      case "system":
        return "bg-mos-gray-100 text-mos-gray-500";
      default:
        return "bg-mos-gray-100 text-mos-gray-500";
    }
  };

  // 알림 클릭 핸들러
  const handleNotificationClick = (notification: Notification) => {
    if (onItemClick) {
      onItemClick(notification);
    }
  };

  // 알림 삭제 핸들러
  const handleDeleteClick = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    if (onDelete) {
      onDelete(notificationId);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-2">
      {notifications.map((notification, index) => (
        <Card
          key={`${notification.id}_${index}`}
          className={cn(
            "relative cursor-pointer shadow-[0px_0px_4px_rgba(222,226,230,0.6)] transition-all duration-200 hover:shadow-md",
            !notification.isRead && "border-blue-200 bg-blue-50/30"
          )}
          onClick={() => handleNotificationClick(notification)}
        >
          {/* 삭제 버튼 */}
          {onDelete && (
            <button
              onClick={(e) => handleDeleteClick(e, notification.id)}
              className="absolute right-0 top-0 flex size-6 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="알림 삭제"
            >
              <i className="bi-x text-[20px]" />
            </button>
          )}

          {/* 헤더: 아이콘 + 제목 + 읽지 않음 표시 + 시간 */}
          <Card.Header className="mb-2 items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex size-5 items-center justify-center rounded-full",
                  getNotificationColor(notification.type)
                )}
              >
                <i
                  className={cn(
                    "text-[10px]",
                    getNotificationIcon(notification.type)
                  )}
                />
              </div>
              <div className="relative">
                <Typography.P3 className="font-medium text-gray-900">
                  {notification.title}
                </Typography.P3>
                {!notification.isRead && <UnreadIndicator />}
              </div>
            </div>
            <Typography.P3 className="text-[11px] text-gray-500">
              {formatRelativeTime(notification.timestamp)}
            </Typography.P3>
          </Card.Header>

          {/* 내용 */}
          <Card.Content>
            <Typography.P3 className="text-[12px] leading-relaxed text-gray-600">
              {notification.content}
            </Typography.P3>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

export default NotificationList;
