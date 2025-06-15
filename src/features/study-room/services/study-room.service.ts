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
  GetStudySchedule,
  PostStudySchedule,
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

export async function postStudySchedule(
  studyId: string,
  data: PostStudySchedule
) {
  const { url, method } = API_ENDPOINT.study.postStudySchedule(studyId);
  return await fetchAPI<GetStudySchedule[]>(url, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
