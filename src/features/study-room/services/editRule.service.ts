import { RuleInterface } from "@/app/(auth)/study-room/components/manage-overview/ManageOverviewCard";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";

interface EditBenefitProps {
  token: string;
  studyId: string;
  rules: RuleInterface[];
}
export default async function editRule({
  token,
  studyId,
  rules,
}: EditBenefitProps) {
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
