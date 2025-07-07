"use client";
import cn from "@/shared/utils/cn";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import useModal from "@/shared/hooks/useModal";
import { formatDate } from "@/shared/utils/date";
import { getStudyApplicant } from "../api/join.api";
import {
  GetStudyApplicantResponse,
  StudyManageCardInterface,
} from "../api/join.api.type";
import InfoModal from "./InfoModal";

const TABS = [
  { id: 1, label: "대기", value: "대기" },
  { id: 2, label: "승인", value: "승낙" },
  { id: 3, label: "거절", value: "탈락" },
  { id: 4, label: "취소", value: "취소" },
];

const List = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = Number(searchParams.get("tap") ?? "1");

  const { isModalOpenState, openModal, closeModal } = useModal();
  const [applicants, setApplicants] = useState<GetStudyApplicantResponse[]>([]);

  async function getApplicants() {
    const result = await getStudyApplicant(id, TABS[tab - 1].value);
    setApplicants(result);
  }

  // 선택된 사용자 정보를 상태로 관리
  const [selectedUserState, setSelectedUserState] =
    useState<StudyManageCardInterface>({
      nickname: "",
      createdAt: "",
      userId: 0,
      studyJoinId: 0,
      questionAnswerResList: [
        {
          studyQuestionId: 0,
          question: "",
          questionNum: 0,
          questionType: "주관식",
          questionAnswerId: 0,
          answer: "",
        },
      ],
    });

  const handleClick = (user: StudyManageCardInterface) => {
    setSelectedUserState(user);
    openModal();
  };

  const handleTabClick = (id: number) => {
    const newSearchParam = new URLSearchParams(searchParams);
    newSearchParam.set("tap", id.toString());
    router.push(`?${newSearchParam.toString()}`);
  };

  useEffect(() => {
    getApplicants();
  }, [tab]);

  return (
    <>
      {/* 지원자 상세 정보 모달 */}
      <InfoModal
        isOpen={isModalOpenState}
        onClose={closeModal}
        data={selectedUserState}
        studyId={id}
        status={TABS[tab - 1].label}
      />

      {/* 지원자 리스트 */}
      <div className="flex flex-col gap-3">
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
        {applicants.map((list) => (
          <div
            key={list.studyJoinId}
            className="cursor-pointer rounded-md border border-mos-gray-100 px-[20px] py-[15] transition-all duration-200 hover:border-mos-main"
            onClick={() => handleClick(list)}
          >
            <div className="flex w-full items-center justify-between py-5">
              <div className="flex flex-col gap-1">
                <Typography.P3 className="text-[18px] font-semibold">
                  {list.nickname}
                </Typography.P3>
                <Typography.P3 className="text-[14px] text-mos-gray-700">
                  지원 일시:{" "}
                  {formatDate("YYYY-MM-DDTHH:mm", list.createdAt).split("T")[0]}
                </Typography.P3>
              </div>
              <Button.Ghost disabled={false} color="Main" size="sm">
                더보기
              </Button.Ghost>
            </div>
          </div>
        ))}
        {applicants.length === 0 && (
          <div className="flex h-[100px] items-center justify-center">
            <Typography.P1 className="text-mos-gray-300">
              현재 {TABS[tab - 1].label}상태인 지원자가 없습니다.
            </Typography.P1>
          </div>
        )}
      </div>
    </>
  );
};

const ManageCard = () => {
  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
      <Card.Header className="mb-[10px] justify-between">
        <Typography.SubTitle1>지원자 목록</Typography.SubTitle1>
      </Card.Header>
      <Card.Content>
        <List />
      </Card.Content>
    </Card>
  );
};

export default ManageCard;
