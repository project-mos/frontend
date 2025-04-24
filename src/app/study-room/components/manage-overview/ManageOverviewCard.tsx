"use client";
import cn from "@/shared/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import ContentInputBox from "./ContentInputBox";
import PreviewBox from "./PreviewBox";

import { MockManageOverviewCardData } from "@/shared/mock/api/study-room";

const TABS = [
  { id: 1, label: "규칙" },
  { id: 2, label: "혜택" },
] as const;

const ManageOverviewCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = Number(searchParams.get("tap") ?? "1");

  const [benefits, setBenefits] = useState<{ id: number; text: string }[]>(
    MockManageOverviewCardData
  );
  const [rules, setRules] = useState<{ id: number; text: string }[]>(
    MockManageOverviewCardData
  );

  const [benefitsEdit, setBenefitsEdit] = useState<boolean>(false);
  const [rulesEdit, setRulesEdit] = useState<boolean>(false);

  const handleTabClick = (id: number) => {
    const newSearchParam = new URLSearchParams(searchParams);
    newSearchParam.set("tap", id.toString());
    router.push(`?${newSearchParam.toString()}`);
  };

  const { isEditMode, data, setData, setEdit, label, placeholder } =
    useMemo(() => {
      const isRuleTab = tab === 1;
      return {
        isEditMode: isRuleTab ? rulesEdit : benefitsEdit,
        data: isRuleTab ? rules : benefits,
        setData: isRuleTab ? setRules : setBenefits,
        setEdit: isRuleTab ? setRulesEdit : setBenefitsEdit,
        label: isRuleTab ? "규칙" : "혜택",
        placeholder: `스터디 ${isRuleTab ? "규칙" : "혜택"}을 입력하세요`,
      };
    }, [tab, rulesEdit, benefitsEdit, rules, benefits]);

  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
      <Card.Header className="mb-[10px] justify-between">
        <Typography.SubTitle1>스터디 규칙/혜택 관리</Typography.SubTitle1>
      </Card.Header>

      <Card.Content>
        <div className="flex w-full border-b">
          {TABS.map(({ id, label }) => (
            <div
              key={id}
              onClick={() => handleTabClick(id)}
              className={cn(
                "w-[90px] cursor-pointer pb-3 text-center transition-all",
                tab === id && "border-b-2 border-mos-main font-semibold"
              )}
            >
              <Typography.P1>{label}</Typography.P1>
            </div>
          ))}
        </div>

        {isEditMode ? (
          <ContentInputBox
            value={data}
            setValue={setData}
            setState={setEdit}
            buttonText={`${label} 추가`}
            placeholder={placeholder}
          />
        ) : (
          <PreviewBox data={data} setState={setEdit} />
        )}
      </Card.Content>
    </Card>
  );
};

export default ManageOverviewCard;
