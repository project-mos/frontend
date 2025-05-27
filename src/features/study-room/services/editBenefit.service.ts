import { BenefitInterface } from "@/app/(auth)/study-room/components/manage-overview/ManageOverviewCard";

interface EditBenefitProps {
  token: string;
  studyId: number;
  benefits: BenefitInterface[];
}
export default async function editBenefit({
  token,
  studyId,
  benefits,
}: EditBenefitProps) {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/benefits`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(benefits),
    }
  );

  return result;
}
