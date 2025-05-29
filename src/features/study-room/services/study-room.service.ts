import {
  BenefitInterface,
  RuleInterface,
} from "@/app/(auth)/study-room/components/manage-overview/ManageOverviewCard";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";

/* study room overview */
export async function editBenefit(
  token: string,
  studyId: string,
  benefits: BenefitInterface[]
) {
  const { url, method } = API_ENDPOINT.benefits.editStudyBenefits(studyId);

  return await fetchAPI<BenefitInterface[]>(url, {
    credentials: "include",
    body: JSON.stringify(benefits),
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
}

export async function editRule(
  token: string,
  studyId: string,
  rules: RuleInterface[]
) {
  const { url, method } = API_ENDPOINT.rules.editStudyRules(studyId);

  return await fetchAPI<RuleInterface[]>(url, {
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
export async function getAttendances(token: string, studyId: string) {
  const { url, method } = API_ENDPOINT.attendance.getAttendances(studyId);

  return await fetchAPI<Response>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
}

export async function editAttendance(
  token: string,
  studyId: string,
  studyScheduleId: string
) {
  const { url, method } = API_ENDPOINT.attendance.editAttendance(
    studyId,
    studyScheduleId
  );

  return await fetchAPI<Response>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
}

export async function attendance(
  token: string,
  studyId: string,
  studyScheduleId: string
) {
  const { url, method } = API_ENDPOINT.attendance.attendance(
    studyId,
    studyScheduleId
  );

  return await fetchAPI<Response>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
}

export async function earlyLeave(
  token: string,
  studyId: string,
  studyScheduleId: string
) {
  const { url, method } = API_ENDPOINT.attendance.earlyLeave(
    studyId,
    studyScheduleId
  );

  return await fetchAPI<Response>(url, {
    credentials: "include",
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
  });
}
