import React from "react";

import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import Meta from "@/shared/components/molecules/Meta";
import { MDXRemote } from "next-mdx-remote-client/rsc";
// import "github-markdown-css/github-markdown.css";

import {
  GetStudyBenefitsResponse,
  GetStudyDetailResponse,
  GetStudyMembersResponse,
  GetStudyRequirementsResponse,
  GetStudyRulesResponse,
} from "@/shared/types/api/studies";

import ShareButton from "@/app/studies/components/applyStudy/ShareButton";
import profileImg from "@/asset/images/profile_example.jpeg";
import Profile from "@/shared/components/atoms/Profile";

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
    <Card className="flex w-[85%] flex-col gap-5 pb-10 sm-mobile:w-full">
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
        <div className="flex items-center gap-2 border-b pb-3">
          <Profile width={30} height={30} src={profileImg} />
          <Typography.P3>{findLeader?.nickname}</Typography.P3>
        </div>

        <div className="flex flex-col gap-1">
          <Meta icon="calendar">
            {studyDetailData.recruitmentStartDate} ~{" "}
            {studyDetailData.recruitmentEndDate}
          </Meta>
          <Meta icon="clock">{studyDetailData.schedule}</Meta>
          <div className="flex gap-2">
            <Meta icon="person">
              {studyDetailData.currentStudyMemberCount}/
              {studyDetailData.maxStudyMemberCount}
            </Meta>
            <Meta icon="eye">{studyDetailData.viewCount}</Meta>
          </div>
        </div>

        <div className="flex gap-2 border-b pb-4">
          {studyDetailData.tags.map((item, index) => {
            return (
              <Tag.Card key={`${item}_${index}`} bold>
                #{item}
              </Tag.Card>
            );
          })}
        </div>
      </Card.Header>
      <Card.Content className="gap-5">
        {hasItem(studyDetailData.content) && (
          <ContentWrapper>
            <Typography.SubTitle1>스터디 소개</Typography.SubTitle1>
            <MDXRemote source={studyDetailData.content} />
          </ContentWrapper>
        )}

        {hasItem(requirementsData) && (
          <ContentWrapper>
            <Typography.SubTitle1>참여 요건</Typography.SubTitle1>
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
          </ContentWrapper>
        )}

        {ListContent("스터디 규칙", rulesData)}
        {ListContent("스터디 혜택", benefitsData)}
      </Card.Content>
    </Card>
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
        <Typography.SubTitle1 className="m-0">{title}</Typography.SubTitle1>
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
