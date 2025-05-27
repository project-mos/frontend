"use client";
import cn from "@/shared/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import ContentInputBox from "./ContentInputBox";
import PreviewBox from "./PreviewBox";

const TABS = [
  { id: 1, label: "규칙" },
  { id: 2, label: "혜택" },
];

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
  rules: string[];
  benefits: string[];
}

const ManageOverviewCard = ({ rules, benefits }: ManageOverviewCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = Number(searchParams.get("tap") ?? "1");

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [pendingTabId, setPendingTabId] = useState<number | null>(null);

  const [ruleData, setRuleData] = useState<string[]>(rules);
  const [benefitData, setBenefitData] = useState<string[]>(benefits);

  const { modal, openModal, closeModal } = useMultiModal();

  useEffect(() => {
    setRuleData(rules);
    setBenefitData(benefits);
  }, [rules, benefits]);

  const moveToTab = (id: number) => {
    const newSearchParam = new URLSearchParams(searchParams);
    newSearchParam.set("tap", id.toString());
    router.push(`?${newSearchParam.toString()}`);
  };

  // 다른 탭을 눌렀을 때
  const handleTabClick = (id: number) => {
    if (isEditMode) {
      setPendingTabId(id);
      openModal("move");
      return;
    }
    moveToTab(id);
  };

  // 저장하지 않고 이동 버튼 눌렀을 때
  const handleMoveButton = () => {
    closeModal("move");
    if (pendingTabId !== null) {
      moveToTab(pendingTabId);
      setPendingTabId(null);
    }
    setIsEditMode(false);
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
    <>
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
              <ContentInputBox
                value={ruleData}
                setValue={setRuleData}
                setState={setIsEditMode}
                buttonText={contentProps.buttonText}
                placeholder={placeholder}
                type="rule"
              />
            ) : (
              <ContentInputBox
                value={benefitData}
                setValue={setBenefitData}
                setState={setIsEditMode}
                buttonText={contentProps.buttonText}
                placeholder={placeholder}
                type="benefit"
              />
            )
          ) : tab === 1 ? (
            <PreviewBox data={ruleData} setState={setIsEditMode} />
          ) : (
            <PreviewBox data={benefitData} setState={setIsEditMode} />
          )}
        </Card.Content>
      </Card>
      <ActionConfirmModal
        isOpen={modal.get("move")!}
        onClose={() => closeModal("move")}
        onSuccess={handleMoveButton}
        type="action"
        content="저장되지 않았습니다. 이동 하시겠습니까?"
        title="이동하기"
        buttonLabel="확인"
      />
    </>
  );
};

export default ManageOverviewCard;
