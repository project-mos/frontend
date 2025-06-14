import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";
import { useQuery } from "@tanstack/react-query";
import {
  AttendanceRequest,
  EditBenefitRequest,
  EditBenefitResponse,
  EditRuleRequest,
  EditRuleResponse,
  GetAttendancesRequest,
  GetAttendancesResponse,
  GetStudySchedule,
  UploadMaterialsRequest,
} from "../types/study-room.api";

/* study room overview */
export async function editBenefit({ studyId, benefits }: EditBenefitRequest) {
  const { url, method } = API_ENDPOINT.benefits.editStudyBenefits(studyId);

  return await fetchAPI<EditBenefitResponse[]>(url, {
    credentials: "include",
    body: JSON.stringify(benefits),
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function editRule({ studyId, rules }: EditRuleRequest) {
  const { url, method } = API_ENDPOINT.rules.editStudyRules(studyId);

  return await fetchAPI<EditRuleResponse[]>(url, {
    credentials: "include",
    body: JSON.stringify(rules),
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/* study room attendance */
export async function getAttendances({ studyId }: GetAttendancesRequest) {
  const { url, method } = API_ENDPOINT.attendance.getAttendances(studyId);

  return await fetchAPI<GetAttendancesResponse[]>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function attendance({
  studyId,
  studyScheduleId,
}: AttendanceRequest) {
  const { url, method } = API_ENDPOINT.attendance.attendance(
    studyId,
    studyScheduleId
  );

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function editAttendance({
  studyId,
  studyScheduleId,
}: AttendanceRequest) {
  const { url, method } = API_ENDPOINT.attendance.editAttendance(
    studyId,
    studyScheduleId
  );

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function earlyLeave({
  studyId,
  studyScheduleId,
}: AttendanceRequest) {
  const { url, method } = API_ENDPOINT.attendance.earlyLeave(
    studyId,
    studyScheduleId
  );

  return await fetchAPI(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getStudySchedule(studyId: string) {
  const { url, method } = API_ENDPOINT.study.getStudySchedule(studyId);

  return await fetchAPI<GetStudySchedule[]>(url, {
    method: method,
    credentials: "include",
  });
}

export function useGetStudySchedule(studyId: string) {
  return useQuery({
    queryKey: ["studySchedule", studyId],
    queryFn: () => getStudySchedule(studyId),
    staleTime: 3600,
    enabled: !!studyId,
  });
}

export async function uploadMaterials({
  file,
  studyId,
}: UploadMaterialsRequest) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "STUDY");

  const { url, method } = API_ENDPOINT.materials.upload(studyId);

  const res = await fetchAPI(url, {
    credentials: "include",
    body: formData,
    method: method,
  });

  if (!res) {
    throw new Error("파일 업로드 실패");
  }

  return res;
}
