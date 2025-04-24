"use client";
import cn from "@/shared/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import { MockManageOverviewCardData } from "@/shared/mock/api/study-room";
import ContentInputBox from "./ContentInputBox";
import PreviewBox from "./PeviewBox";

const ManageOverviewCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = Number(searchParams.get("tap") ?? "1");
  const data = MockManageOverviewCardData;

  const [benefits, setBenefits] =
    useState<{ id: number; text: string }[]>(data);
  const [rules, setRules] = useState<{ id: number; text: string }[]>(data);

  const [benefitsEdit, setBenefitsEdit] = useState<boolean>(false);
  const [rulesEdit, setRulesEdit] = useState<boolean>(false);

  const tabs = [
    { id: 1, label: "규칙" },
    { id: 2, label: "혜택" },
  ];

  const onClickTab = (id: number) => {
    const newSearchParam = new URLSearchParams(searchParams);
    newSearchParam.set("tap", id.toString());
    router.push(`?${newSearchParam.toString()}`);
  };

  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
      <Card.Header className="mb-[10px] justify-between">
        <Typography.SubTitle1>스터디 규칙/혜택 관리</Typography.SubTitle1>
      </Card.Header>
      <Card.Content>
        <div className="flex w-full border-b">
          {tabs.map((t) => (
            <div
              key={t.id}
              onClick={() => onClickTab(t.id)}
              className={cn(
                "w-[90px] cursor-pointer pb-3 text-center transition-all",
                tab === t.id ? "border-b-2 border-mos-main font-semibold" : ""
              )}
            >
              <Typography.P1>{t.label}</Typography.P1>
            </div>
          ))}
        </div>

        {tab == 1 ? (
          rulesEdit == true ? (
            <ContentInputBox
              value={rules}
              setValue={setRules}
              setState={setRulesEdit}
              buttonText="규칙 추가"
              placeholder="스터디 규칙을 입력하세요"
            />
          ) : (
            <PreviewBox data={rules} setState={setRulesEdit} />
          )
        ) : benefitsEdit == true ? (
          <ContentInputBox
            value={benefits}
            setValue={setBenefits}
            setState={setBenefitsEdit}
            buttonText="혜택 추가"
            placeholder="스터디 혜택을 입력하세요"
          />
        ) : (
          <PreviewBox data={benefits} setState={setBenefitsEdit} />
        )}
      </Card.Content>
    </Card>
  );
};

export default ManageOverviewCard;
