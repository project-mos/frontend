import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";
import {
  AttendanceRequest,
  EditBenefitRequest,
  EditBenefitResponse,
  EditRuleRequest,
  EditRuleResponse,
  GetAttendancesRequest,
  GetAttendancesResponse,
} from "../types/study-room.api";

/* study room overview */
export async function editBenefit({
  token,
  studyId,
  benefits,
}: EditBenefitRequest) {
  const { url, method } = API_ENDPOINT.benefits.editStudyBenefits(studyId);

  return await fetchAPI<EditBenefitResponse[]>(url, {
    credentials: "include",
    body: JSON.stringify(benefits),
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
}

export async function editRule({ token, studyId, rules }: EditRuleRequest) {
  const { url, method } = API_ENDPOINT.rules.editStudyRules(studyId);

  return await fetchAPI<EditRuleResponse[]>(url, {
    credentials: "include",
    body: JSON.stringify(rules),
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
}

/* study room attendance */
export async function getAttendances({
  token,
  studyId,
}: GetAttendancesRequest) {
  const { url, method } = API_ENDPOINT.attendance.getAttendances(studyId);

  return await fetchAPI<GetAttendancesResponse[]>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
}

export async function attendance({
  token,
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
      Authorization: `Bearer ${token || ""}`,
    },
  });
}

export async function editAttendance({
  token,
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
      Authorization: `Bearer ${token || ""}`,
    },
  });
}

export async function earlyLeave({
  token,
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
      Authorization: `Bearer ${token || ""}`,
    },
  });
}
