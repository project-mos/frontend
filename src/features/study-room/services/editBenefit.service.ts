import { BenefitInterface } from "@/app/(auth)/study-room/components/manage-overview/ManageOverviewCard";
import { API_ENDPOINT } from "@/shared/constants/api-end-point";
import { fetchAPI } from "@/shared/utils/fetch";

interface EditBenefitProps {
  token: string;
  studyId: string;
  benefits: BenefitInterface[];
}
export default async function editBenefit({
  token,
  studyId,
  benefits,
}: EditBenefitProps) {
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
