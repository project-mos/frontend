import { GetStudiesRequest } from "@/features/landing/types/landing.api";
import { GetStudyJoinsRequest } from "@/features/studies/types/studies.api";
import { Method } from "../utils/fetcher";

export const API_ENDPOINT = {
  auth: {
    // 로그인
    signIn: () => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/login`, // 임시 URL
        method: Method.POST,
      };
    },
    // 토큰 재발급
    getRefreshAuth: () => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/tokens`,
        method: Method.GET,
      };
    },
    // 액세스 토큰 확인
    getAccessToken: () => {
      return {
        url: `/api/cookie`,
        method: Method.GET,
      };
    },
  },
  mypage: {
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
    // 유저 프로필 이미지 수정
    updateProfileImg: () => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/images`,
        method: Method.PATCH,
      };
    },
    // 캘린더 일정 조회
    getMySchedules: () => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/study-schedules`,
        method: Method.GET,
      };
    },
    // 잠여중인 스터디 조회
    getMyJoinedStudies: (userId: number) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}/studies`, // 임시 URL 백엔드 코드 수정되면 파라미터 제거해야함
        method: Method.GET,
      };
    },
    // 나의 지원 현황 조회
    getMyApplyStatus: () => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/study-joins`,
        method: Method.GET,
      };
    },
    // 스터디 일정 생성
    createStudySchedule: (studyId: number) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules`,
        method: Method.POST,
      };
    },
    // 스터디 일정 수정
    updateStudySchedule: (studyId: number, studyScheduleId: number) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-schedules/${studyScheduleId}`,
        method: Method.PATCH,
      };
    },
    // 스터디 일정 삭제
    deleteStudySchedule: (studyId: number, studyScheduleId: number) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-schedules/${studyScheduleId}`,
        method: Method.DELETE,
      };
    },
  },
  study: {
    // 스터디 생성
    createStudy: () => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies`,
        method: Method.POST,
      };
    },
    uploadImage: () => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/recruitment-images`,
        method: Method.POST,
      };
    },
    getStudy: (id: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${id}`,
        method: Method.GET,
      };
    },
    // 스터디 일정 목록 조회
    getStudySchedule: (studyId: number) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules`,
        method: Method.GET,
      };
    },
    // 스터디 일정 목록 생성
    postStudySchedule: (studyId: number) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/schedules`,
        method: Method.POST,
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
  // 스터디룸 - 커리큘럼 조회
  curriculums: {
    getCurriculums: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/curriculums`,
        method: Method.GET,
      };
    },
    // 스터디룸 - 커리큘럼 수정 | 삭제 | 생성
    postCurriculums: (studyId: number) => {
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
    leaveStudy: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/members`,
        method: Method.DELETE,
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
    getJoins: (studyJoinStatus?: GetStudyJoinsRequest) => {
      const status = studyJoinStatus || "";
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/study-joins?studyJoinStatus=${status}`,
        method: Method.POST,
      };
    },
    postJoin: (studyId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-joins`,
        method: Method.POST,
      };
    },
    patchJoin: (studyId: string, studyJoinId: string) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/study-joins/${studyJoinId}`,
        method: Method.PATCH,
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
  materials: {
    upload: (studyId: string) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/materials`;
      return {
        url,
        method: Method.POST,
      };
    },
    getMaterials: (studyId: string) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/materials`;
      return {
        url,
        method: Method.GET,
      };
    },
    getMaterial: (studyId: string, materialId: string) => {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/materials/${materialId}`;
      return {
        url,
        method: Method.GET,
      };
    },
  },
};
