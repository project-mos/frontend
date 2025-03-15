const URL = {
  HOME: "/",
  STUDY: {
    CREATE: "/create-study?step=1",
    DETAIL: "/studies",
    DETAIL_DASHBOARD(id: string) {
      return `${this.DETAIL}/${id}/dashboard`;
    },
    DETAIL_CURRICULUM(id: string) {
      return `${this.DETAIL}/${id}/curriculum`;
    },
  },
  MYPAGE: "/mypage",
} as const;

export default URL;
