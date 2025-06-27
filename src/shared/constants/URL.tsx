const URL = {
  HOME: "/",
  LOGIN: {
    KAKAO: "https://kauth.kakao.com/oauth/authorize",
    GOOGLE: "https://accounts.google.com/o/oauth2/v2/auth",
    NAVER: "https://nid.naver.com/oauth2.0/authorize",
  },
  STUDY: {
    CREATE: "/create-study",
    DETAIL: (id: number) => `/studies/${id}`,
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
    DETAIL_MANAGE_OVERVIEW(id: string) {
      return `/study-room/${id}/overview`;
    },
    DETAIL_SETTING(id: string) {
      return `/study-room/${id}/setting`;
    },
  },
  MYPAGE: "/mypage",
};

export default URL;
