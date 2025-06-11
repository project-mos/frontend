import URL from "./URL";

export type MenuItem = {
  name: string;
  icon: string;
  path: string;
};

export const MENU_ITEMS = (id: string): MenuItem[] => [
  {
    name: "소개",
    icon: "bi-blockquote-left",
    path: URL.STUDY_ROOM.DETAIL_MANAGE_OVERVIEW(id),
  },
  {
    name: "일정",
    icon: "bi-calendar",
    path: URL.STUDY_ROOM.DETAIL_SCHEDULE(id),
  },
  {
    name: "멤버",
    icon: "bi-people",
    path: URL.STUDY_ROOM.DETAIL_MEMBER(id),
  },
  {
    name: "자료실",
    icon: "bi-folder",
    path: URL.STUDY_ROOM.DETAIL_ARCHIVE(id),
  },
  {
    name: "커리큘럼",
    icon: "bi-book",
    path: URL.STUDY_ROOM.DETAIL_CURRICULUM(id),
  },
  {
    name: "채팅",
    icon: "bi-chat",
    path: URL.STUDY_ROOM.DETAIL_CHAT(id),
  },
  {
    name: "공지사항",
    icon: "bi-megaphone",
    path: URL.STUDY_ROOM.DETAIL_NOTICE(id),
  },
];

export const ADMIN_MENU_ITEMS = (id: string): MenuItem[] => [
  {
    name: "지원자 관리",
    icon: "bi-person-plus",
    path: URL.STUDY_ROOM.DETAIL_MANAGE_APPLICANTS(id),
  },
];
