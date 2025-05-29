import {
  BenefitInterface,
  RuleInterface,
} from "@/app/(auth)/study-room/components/manage-overview/ManageOverviewCard";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";

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
