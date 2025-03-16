const URL = {
  HOME: "/",
  STUDY: {
    CREATE: "/create-study?step=1",
    DETAIL: "/studies",
  },
  STUDYROOM: {
    DETAIL_DASHBOARD(id: string) {
      return `/study-room/${id}/dashboard`;
    },
    DETAIL_CURRICULUM(id: string) {
      return `/study-room/${id}/curriculum`;
    },
    DETAIL_NOTICE(id: string) {
      return `/study-room/${id}/notice`;
    },
  },
  MYPAGE: "/mypage",
} as const;

export default URL;
