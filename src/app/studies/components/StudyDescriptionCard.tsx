import React from "react";

import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import Meta from "@/shared/components/molecules/Meta";
import { MDXRemote } from "next-mdx-remote-client/rsc";

import {
  GetStudyBenefitsResponse,
  GetStudyDetailResponse,
  GetStudyRequirementsResponse,
  GetStudyRulesResponse,
} from "@/shared/types/api/studies";

interface StudyDescriptionCardProps {
  studyDetailData: GetStudyDetailResponse;
  requirementsData: GetStudyRequirementsResponse;
  rulesData: GetStudyRulesResponse;
  benefitsData: GetStudyBenefitsResponse;
}

const StudyDescriptionCard = ({
  studyDetailData,
  requirementsData,
  rulesData,
  benefitsData,
}: StudyDescriptionCardProps) => {
  return (
    <Card className="col-span-12 flex flex-col gap-5 pb-10 tablet:col-span-8">
      <Card.Header className="flex-col gap-3">
        <div className="flex justify-between">
          <Tag.Green bold>{studyDetailData.category}</Tag.Green>
          <div className="flex gap-2">
            <Tag.Blue bold>{studyDetailData.meetingType}</Tag.Blue>
            <Tag.Green bold border={false}>
              {studyDetailData.recruitmentStatus}
            </Tag.Green>
          </div>
        </div>
        <div className="flex justify-between">
          <Typography.Head3>{studyDetailData.title}</Typography.Head3>
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

        <div className="flex gap-2">
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
  return <div className="flex flex-col gap-3">{children}</div>;
};

const ListContent = (
  title: string,
  items: GetStudyRulesResponse | GetStudyBenefitsResponse
) => {
  return (
    <>
      {hasItem<GetStudyRulesResponse | GetStudyBenefitsResponse>(items) && (
        <ContentWrapper>
          <Typography.SubTitle1>{title}</Typography.SubTitle1>
          <ul className="study-detail text-mos-gray-700">
            {items.map((item, index) => {
              return <li key={`${item.id}_${index}`}> {item.content}</li>;
            })}
          </ul>
        </ContentWrapper>
      )}
    </>
  );
};
// 아이템이 있는지 여부를 리턴하는 함수
function hasItem<T>(item: T[] | T) {
  if (Array.isArray(item)) return item.length > 0;
  else return Boolean(item);
}

export default StudyDescriptionCard;
