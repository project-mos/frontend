const URL = {
  HOME: "/",
  STUDY: {
    CREATE: "/create-study",
    DETAIL: "/studies",
  },
  STUDY_ROOM: {
    DETAIL_SCHEDULE(id: string) {
      return `/study-room/${id}/schedule`;
    },
    DETAIL_MEMBER(id: string) {
      return `/study-room/${id}/member`;
    },
    DETAIL_CURRICULUM(id: string) {
      return `/study-room/${id}/curriculum`;
    },
    DETAIL_CHAT(id: string) {
      return `/study-room/${id}/chat`;
    },
    DETAIL_ARCHIVE(id: string) {
      return `/study-room/${id}/archive`;
    },
    DETAIL_NOTICE(id: string) {
      return `/study-room/${id}/notice`;
    },
    DETAIL_MANAGE_APPLICANTS(id: string) {
      return `/study-room/${id}/manage-applicants`;
    },
  },
  MYPAGE: "/mypage",
} as const;

export default URL;
