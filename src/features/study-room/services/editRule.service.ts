import { RuleInterface } from "@/app/(auth)/study-room/components/manage-overview/ManageOverviewCard";

interface EditBenefitProps {
  token: string;
  studyId: number;
  rules: RuleInterface[];
}
export default async function editRule({
  token,
  studyId,
  rules,
}: EditBenefitProps) {
  console.log(JSON.stringify(rules));
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/studies/${studyId}/rules`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rules),
    }
  );

  return result;
}
