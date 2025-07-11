import { API_ENDPOINT, fetchAPI } from "@/shared/api/lib";

import {
  CreateStudyScheduleResult,
  GetMyApplyStatusResult,
  GetMyJoinedStudiesResult,
  GetMySchedulesResult,
} from "@/shared/types/api/mypage";

import {
  useMutation,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

// 캘린더 일정 조회 //
export async function getMySchedules(): Promise<GetMySchedulesResult[]> {
  const { url, method } = API_ENDPOINT.schedule.getSchedules();

  return await fetchAPI<GetMySchedulesResult[]>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function mySchedulesQueryOption(
  options?: UseQueryOptions<GetMySchedulesResult[], Error>
) {
  return {
    queryKey: ["mySchedules"],
    queryFn: () => getMySchedules(),
    ...options,
  };
}

// 스터디 일정 생성 //
export async function createStudySchedule(
  studyId: number,
  data: CreateStudyScheduleResult
) {
  const { url, method } = API_ENDPOINT.schedule.postStudySchedule(studyId);

  return await fetchAPI<CreateStudyScheduleResult>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function usePostCreateStudySchedule(
  studyId: number,
  options?: UseMutationOptions<CreateStudyScheduleResult, Error, unknown>
) {
  return useMutation({
    ...options,
    mutationFn: (data: CreateStudyScheduleResult) =>
      createStudySchedule(studyId, data),
  });
}

// 스터디 일정 수정 //
export async function updateStudySchedule(
  studyId: number,
  studyScheduleId: number,
  data: CreateStudyScheduleResult
) {
  const { url, method } = API_ENDPOINT.schedule.putStudySchedule(
    studyId,
    studyScheduleId
  );

  return await fetchAPI<CreateStudyScheduleResult>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function useUpdateStudySchedule(
  studyId: number,
  studyScheduleId: number,
  options?: UseMutationOptions<CreateStudyScheduleResult, Error, unknown>
) {
  return useMutation({
    ...options,
    mutationFn: (data: CreateStudyScheduleResult) =>
      updateStudySchedule(studyId, studyScheduleId, data),
  });
}

// 스터디 일정 삭제 //
export async function deleteStudySchedule(
  studyId: number,
  studyScheduleId: number
) {
  const { url, method } = API_ENDPOINT.schedule.deleteStudySchedule(
    studyId,
    studyScheduleId
  );

  return await fetchAPI<CreateStudyScheduleResult>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function useDeleteStudySchedule(
  studyId: number,
  studyScheduleId: number,
  options?: UseMutationOptions<CreateStudyScheduleResult, Error, unknown>
) {
  return useMutation({
    ...options,
    mutationFn: () => deleteStudySchedule(studyId, studyScheduleId),
  });
}

// 참여 중인 스터디 //
export async function getMyJoinedStudies(
  userId: number
): Promise<GetMyJoinedStudiesResult[]> {
  const { url, method } = API_ENDPOINT.join.getMyJoinedStudies(userId);

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function myJoinedStudiesQueryOption(
  userId: number,
  options?: UseQueryOptions<GetMyJoinedStudiesResult[], Error>
) {
  return {
    queryKey: ["myJoinedStudies"],
    queryFn: () => getMyJoinedStudies(userId),
    enabled: !!userId,
    ...options,
  };
}

// 나의 지원 현황 //
export async function getMyApplyStatus(): Promise<GetMyApplyStatusResult[]> {
  const { url, method } = API_ENDPOINT.join.getMyApplyStatus();

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function myApplyStatusQueryOption(
  options?: UseQueryOptions<GetMyApplyStatusResult[], Error>
) {
  return {
    queryKey: ["myApplyStatus"],
    queryFn: () => getMyApplyStatus(),
    ...options,
  };
}
