import URL from "./URL";

export type MenuItems = {
  name: string;
  icon: string;
  path: string;
}[];

export const MENU_ITEMS: MenuItems = [
  {
    name: "일정",
    icon: "bi-calendar",
    path: URL.STUDY_ROOM.DETAIL_SCHEDULE("1"),
  },
  {
    name: "멤버",
    icon: "bi-people",
    path: URL.STUDY_ROOM.DETAIL_MEMBER("1"),
  },
  {
    name: "자료실",
    icon: "bi-folder",
    path: URL.STUDY_ROOM.DETAIL_ARCHIVE("1"),
  },
  {
    name: "커리큘럼",
    icon: "bi-book",
    path: URL.STUDY_ROOM.DETAIL_CURRICULUM("1"),
  },
  {
    name: "채팅",
    icon: "bi-chat",
    path: URL.STUDY_ROOM.DETAIL_CHAT("1"),
  },
  {
    name: "공지사항",
    icon: "bi-megaphone",
    path: URL.STUDY_ROOM.DETAIL_NOTICE("1"),
  },
];

export const ADMIN_MENU_ITEMS: MenuItems = [
  {
    name: "지원자 관리",
    icon: "bi-person-plus",
    path: URL.STUDY_ROOM.DETAIL_MANAGE_APPLICANTS("1"),
  },
];
