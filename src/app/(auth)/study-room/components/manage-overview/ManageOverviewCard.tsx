"use client";
import cn from "@/shared/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import ContentInputBox from "./ContentInputBox";
import PreviewBox from "./PreviewBox";

const TABS = [
  { id: 1, label: "규칙" },
  { id: 2, label: "혜택" },
] as const;

export interface RuleInterface {
  id: number;
  ruleNum: number;
  content: string;
}

export interface BenefitInterface {
  id: number;
  benefitNum: number;
  content: string;
}

interface ManageOverviewCardProps {
  rules: RuleInterface[];
  benefits: BenefitInterface[];
}

const ManageOverviewCard = ({ rules, benefits }: ManageOverviewCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = Number(searchParams.get("tap") ?? "1");

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [ruleData, setRuleData] = useState<RuleInterface[]>(rules);
  const [benefitData, setBenefitData] = useState<BenefitInterface[]>(benefits);

  useEffect(() => {
    setRuleData(rules);
    setBenefitData(benefits);
  }, [rules, benefits]);

  const handleTabClick = (id: number) => {
    const newSearchParam = new URLSearchParams(searchParams);
    newSearchParam.set("tap", id.toString());
    router.push(`?${newSearchParam.toString()}`);
  };

  const label = tab === 1 ? "규칙" : "혜택";
  const placeholder = `스터디 ${label}을 입력하세요`;

  const contentProps =
    tab === 1
      ? {
          value: ruleData,
          setValue: setRuleData,
          buttonText: "규칙 추가",
        }
      : {
          value: benefitData,
          setValue: setBenefitData,
          buttonText: "혜택 추가",
        };

  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
      <Card.Header className="mb-[10px] justify-between">
        <Typography.SubTitle1>스터디 규칙/혜택</Typography.SubTitle1>
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
          tab === 1 ? (
            <ContentInputBox<RuleInterface>
              value={ruleData}
              setValue={setRuleData}
              setState={setIsEditMode}
              buttonText={contentProps.buttonText}
              placeholder={placeholder}
            />
          ) : (
            <ContentInputBox<BenefitInterface>
              value={benefitData}
              setValue={setBenefitData}
              setState={setIsEditMode}
              buttonText={contentProps.buttonText}
              placeholder={placeholder}
            />
          )
        ) : tab === 1 ? (
          <PreviewBox<RuleInterface> data={ruleData} setState={setIsEditMode} />
        ) : (
          <PreviewBox<BenefitInterface>
            data={benefitData}
            setState={setIsEditMode}
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default ManageOverviewCard;
