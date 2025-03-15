const URL = {
  HOME: "/",
  STUDY: {
    CREATE: "/create-study",
    DETAIL: "/studies",
    DETAIL_DASHBOARD(id: string) {
      return `${this.DETAIL}/${id}/dashboard`;
    },
  },
  MYPAGE: "/mypage",
} as const;

export default URL;
