import React, { ReactNode } from "react";

import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";

import "highlight.js/styles/github-dark.css";

import profileImg from "@/asset/images/defaultProfile.png";
import {
  GetStudyBenefitsResponse,
  GetStudyDetailResponse,
  GetStudyMembersResponse,
  GetStudyRequirementsResponse,
  GetStudyRulesResponse,
} from "@/features/studies/types/studies.api";
import Profile from "@/shared/components/atoms/Profile";
import CustomMdxRemote from "@/shared/components/system/CustomMdxRemote";
import ShareButton from "./applyStudy/ShareButton";

interface StudyDescriptionCardProps {
  studyDetailData: GetStudyDetailResponse;
  requirementsData: GetStudyRequirementsResponse;
  rulesData: GetStudyRulesResponse;
  benefitsData: GetStudyBenefitsResponse;
  membersData: GetStudyMembersResponse;
}

const StudyDescriptionCard = ({
  studyDetailData,
  requirementsData,
  rulesData,
  benefitsData,
  membersData,
}: StudyDescriptionCardProps) => {
  const findLeader = membersData.find(
    (item) => item.studyMemberRoleType === "스터디장"
  );

  return (
    <Card className="flex w-[85%] flex-col gap-5 border-none pb-10 shadow-none outline-none sm-mobile:w-full">
      <Card.Header className="flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Tag.Green bold>{studyDetailData.category}</Tag.Green>
            <Tag.Blue bold>{studyDetailData.meetingType}</Tag.Blue>
            {studyDetailData.recruitmentStatus === "모집 중" ? (
              <Tag.Pink bold>{studyDetailData.recruitmentStatus}</Tag.Pink>
            ) : (
              <Tag.Gray bold>{studyDetailData.recruitmentStatus}</Tag.Gray>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ShareButton />
          </div>
        </div>
        <div className="flex justify-between">
          <Typography.Head2>{studyDetailData.title}</Typography.Head2>
        </div>
        <div className="flex items-center justify-between gap-2 border-b py-3">
          <div className="flex items-center gap-2">
            <Profile width={35} height={35} src={profileImg} />
            <Typography.P1>{findLeader?.nickname}</Typography.P1>
          </div>
          <Typography.P1 className="text-mos-gray-700">
            조회수 {studyDetailData.viewCount}회
          </Typography.P1>
        </div>

        <MetaList title="모집일자">
          <Typography.P1 className="text-black">
            {studyDetailData.recruitmentStartDate} -{" "}
            {studyDetailData.recruitmentEndDate}
          </Typography.P1>
        </MetaList>

        <MetaList title="활동시간">
          <Typography.P1 className="text-black">
            {studyDetailData.schedule}
          </Typography.P1>
        </MetaList>

        <MetaList title="모집인원">
          <Typography.P1 className="text-black">
            {studyDetailData.currentStudyMemberCount} /{" "}
            {studyDetailData.maxStudyMemberCount} 명
          </Typography.P1>
        </MetaList>

        <MetaList title="태그">
          <div className="flex gap-2">
            {studyDetailData.tags.map((item, index) => {
              return (
                <Tag.Detail key={`${item}_${index}`} bold>
                  {item}
                </Tag.Detail>
              );
            })}
          </div>
        </MetaList>
      </Card.Header>
      <Card.Content className="gap-5 border-y py-5">
        <ContentWrapper>
          <Typography.SubTitle1 className="pb-4 font-bold">
            스터디 소개
          </Typography.SubTitle1>
          {hasItem(studyDetailData.content) && (
            <CustomMdxRemote content={studyDetailData.content} />
          )}
        </ContentWrapper>
      </Card.Content>
      <Card.Footer className="flex-col gap-5">
        <ContentWrapper>
          <Typography.SubTitle1 className="font-bold">
            참여 요건
          </Typography.SubTitle1>
          {hasItem(requirementsData) ? (
            <div>
              {requirementsData.map((item, index) => {
                return (
                  <Typography.P1
                    key={`${item.id}_${index}`}
                    className="text-[14px] text-mos-gray-700"
                  >
                    {item.content}
                  </Typography.P1>
                );
              })}
            </div>
          ) : (
            <span>참여 요건이 없습니다.</span>
          )}
        </ContentWrapper>
        {ListContent("스터디 규칙", rulesData)}
        {ListContent("스터디 혜택", benefitsData)}
      </Card.Footer>
    </Card>
  );
};

const MetaList = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex gap-5 text-mos-gray-500">
      <Typography.P1 className="w-[80px]">{title}</Typography.P1>{" "}
      <div className="text-black">{children}</div>
    </div>
  );
};

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="prose prose-sm flex max-w-full flex-col gap-0">
      {children}
    </div>
  );
};

const ListContent = (
  title: string,
  items: GetStudyRulesResponse | GetStudyBenefitsResponse
) => {
  return (
    <>
      <ContentWrapper>
        <Typography.SubTitle1 className="m-0 font-bold">
          {title}
        </Typography.SubTitle1>
        {hasItem<GetStudyRulesResponse | GetStudyBenefitsResponse>(items) ? (
          <ul className="study-detail m-0 text-mos-gray-700">
            {items.map((item, index) => {
              return <li key={`${item.id}_${index}`}> {item.content}</li>;
            })}
          </ul>
        ) : (
          <span>{title}이 없습니다.</span>
        )}
      </ContentWrapper>
    </>
  );
};

// 아이템이 있는지 여부를 리턴하는 함수
function hasItem<T>(item: T[] | T) {
  if (Array.isArray(item)) return item.length > 0;
  else return Boolean(item);
}

export default StudyDescriptionCard;
