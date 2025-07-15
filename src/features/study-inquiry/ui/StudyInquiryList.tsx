import React from "react";
import { StudyInquiryUser } from "@/features/chat-navigation/lib/navigation.types";
import Typography from "@/shared/components/atoms/Typography";
import Profile from "@/shared/components/atoms/Profile";
import { formatDate } from "@/shared/utils/date";

interface StudyInquiryListProps {
  inquiries: StudyInquiryUser[];
  onInquiryClick: (roomId: string) => void;
}

const StudyInquiryList = ({
  inquiries,
  onInquiryClick,
}: StudyInquiryListProps) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {/* 문의 목록 */}
      <div className="flex flex-col gap-2">
        {inquiries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Typography.P2>아직 문의가 없습니다.</Typography.P2>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div
              key={inquiry.userId}
              className="flex cursor-pointer items-center justify-between gap-3 rounded-md p-3 text-black transition hover:bg-gray-100 active:bg-gray-200"
              onClick={() => onInquiryClick(inquiry.roomId)}
            >
              <div className="flex items-center gap-3">
                {/* 프로필 이미지 */}
                <Profile
                  src={inquiry.userAvatar}
                  width={40}
                  height={40}
                  className="flex-shrink-0"
                />

                <div className="flex flex-col">
                  {/* 사용자 이름 + 날짜 */}
                  <div className="flex items-center gap-2">
                    <Typography.P2 className="font-semibold max-w-[120px] truncate">
                      {inquiry.userName}
                    </Typography.P2>
                    <Typography.P3 className="text-[10px] text-gray-400">
                      {formatDate("MM-DD", inquiry.lastMessage.timestamp)}
                    </Typography.P3>
                  </div>

                  {/* 최근 메시지 */}
                  <Typography.P3 className="text-gray-600 max-w-[180px] truncate text-[12px]">
                    {inquiry.lastMessage.content}
                  </Typography.P3>
                </div>
              </div>

              {/* 미읽은 메시지 개수 */}
              <div className="flex items-center gap-2">
                {inquiry.unreadCount > 0 && (
                  <div className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5">
                    <Typography.P3 className="text-[10px] font-bold text-white leading-none">
                      {inquiry.unreadCount > 99 ? "99+" : inquiry.unreadCount}
                    </Typography.P3>
                  </div>
                )}

                {/* 화살표 아이콘 */}
                <i className="bi bi-chevron-right text-gray-400 text-sm" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudyInquiryList;
