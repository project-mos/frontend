import { GetStudiesRequest } from "@/shared/types/api/studies";
import { Method } from "../utils/fetcher";

export const API_ENDPOINT = {
  auth: {
    // 로그인
    signIn: () => {
      return {
        url: `${process.env.MOS_API_BASE_URL}/oauth2/login`, // 임시 URL
        method: Method.POST,
      };
    },
    // 토큰 재발급
    refreshAuth: () => {
      return {
        url: `${process.env.MOS_API_BASE_URL}/auth/token-refresh`, // 임시 URL
        method: Method.POST,
      };
    },
  },
  user: {
    // 유저 정보 조회
    getUser: () => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
        method: Method.GET,
      };
    },
    // 유저 정보 수정
    updateUser: () => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/users`, 
        method: Method.PATCH,
      };
    },
    getMyApplyStatus: () => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/study-joins?studyJoinStatus=대기`, // 임시 URL 백엔드 코드 수정되면 파라미터 제거해야함
        method: Method.GET,
      };
    }
  },
  study: {
    // 스터디 생성
    createStudy: () => {
      return {
        url: `${process.env.MOS_API_BASE_URL}/studies`,
        method: Method.POST,
      };
    },
    getStudy: (id: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${id}`,
        method: Method.GET,
      };
    },
  },
  requirement: {
    getRequirement: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/requirements`,
        method: Method.GET,
      };
    },
    getRequirements: (studyId: string, requirementId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/requirements/${requirementId}`,
        method: Method.GET,
      };
    },
  },
  rules: {
    getStudyRules: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/rules`,
        method: Method.GET,
      };
    },
    editStudyRules: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/rules`,
        method: Method.POST,
      };
    },
  },
  benefits: {
    getStudyBenefits: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/benefits`,
        method: Method.GET,
      };
    },
    editStudyBenefits: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/benefits`,
        method: Method.POST,
      };
    },
  },
  curriculums: {
    getCurriculums: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/curriculums`,
        method: Method.GET,
      };
    },
    postCurriculums: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/curriculums`,
        method: Method.POST,
      };
    },
  },
  members: {
    getMembers: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/members`,
        method: Method.GET,
      };
    },
  },
  questions: {
    getQuestions: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/questions`,
        method: Method.GET,
      };
    },
  },
  join: {
    postJoin: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-joins`,
        method: Method.POST,
      };
    },
  },
  studies: {
    getStudies: ({
      page = "1",
      size = "12",
      sort = "createdAt,desc",
      category,
      meetType,
      recruitmentStatus,
      progressStatus,
      liked,
    }: GetStudiesRequest) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        sort: sort.toString(),
      });

      if (category) params.append("category", category);
      if (meetType) params.append("meetingType", meetType);
      if (recruitmentStatus)
        params.append("recruitmentStatus", recruitmentStatus);
      if (progressStatus) params.append("progressStatus", progressStatus);
      if (liked !== undefined) params.append("liked", liked.toString());

      const url = `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/studies?${params.toString()}`;

      return {
        url,
        method: Method.GET,
      };
    },
    getHotStudies: () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/studies/hots`;
      return {
        url,
        method: Method.GET,
      };
    },
    getCategories: () => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/studies/categories`;
      return {
        url,
        method: Method.GET,
      };
    },
  },
  attendance: {
    attendance: (studyId: string, studyScheduleId: string) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules/${studyScheduleId}/attendances`;
      return {
        url,
        method: Method.POST,
      };
    },
    editAttendance: (studyId: string, studyScheduleId: string) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules/${studyScheduleId}/attendances`;
      return {
        url,
        method: Method.PUT,
      };
    },
    getAttendances: (studyId: string) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/members/attendances`;
      return {
        url,
        method: Method.GET,
      };
    },
    earlyLeave: (studyId: string, studyScheduleId: string) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules/${studyScheduleId}/attendances/early-leave`;
      return {
        url,
        method: Method.PATCH,
      };
    },
  },
};
