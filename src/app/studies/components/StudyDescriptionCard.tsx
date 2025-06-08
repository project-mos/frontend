import React from "react";

import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import Meta from "@/shared/components/molecules/Meta";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import ShareButton from "@/app/studies/components/applyStudy/ShareButton";
import profileImg from "@/asset/images/profile_example.jpeg";
import Profile from "@/shared/components/atoms/Profile";
import {
  GetStudyBenefitsResponse,
  GetStudyDetailResponse,
  GetStudyMembersResponse,
  GetStudyRequirementsResponse,
  GetStudyRulesResponse,
} from "@/features/studies/types/studies.api";

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
            모집일자: {studyDetailData.recruitmentStartDate} ~{" "}
            {studyDetailData.recruitmentEndDate}
          </Meta>
          <Meta icon="clock">활동시간: {studyDetailData.schedule}</Meta>
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
        <ContentWrapper>
          <Typography.SubTitle1>스터디 소개</Typography.SubTitle1>
          {hasItem(studyDetailData.content) && (
            <MDXRemote
              source={escapeCurlyBracesOutsideCodeBlocksAndInlineCode(
                studyDetailData.content
              )}
              components={{
                p: (props) => <span {...props} />,
              }}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    [
                      rehypeHighlight,
                      rehypeRaw,
                      {
                        passThrough: ["mdxJsxFlowElement", "mdxJsxTextElement"],
                      },
                      rehypeSanitize,
                    ],
                  ],
                },
              }}
            />
          )}
        </ContentWrapper>

        <ContentWrapper>
          <Typography.SubTitle1>참여 요건</Typography.SubTitle1>
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

function escapeCurlyBracesOutsideCodeBlocksAndInlineCode(input: string) {
  const codeBlockRegex = /```[\s\S]*?```/g; // 코드블럭 잡기
  const inlineCodeRegex = /`[^`]*`/g; // 인라인 백틱 코드 잡기
  const pTagRegex = /(<p>)([\s\S]*?)(<\/p>)/g; // <p> 태그 잡기

  // 1. 코드블럭 먼저 임시 토큰으로 치환
  const codeBlocks: unknown[] = [];
  const codeBlockPlaceholder = "___CODE_BLOCK_PLACEHOLDER___";
  let temp = input.replace(codeBlockRegex, (m) => {
    codeBlocks.push(m);
    return codeBlockPlaceholder;
  });

  // 2. 인라인 백틱 코드 임시 토큰으로 치환
  const inlineCodes: string[] = [];
  const inlineCodePlaceholder = "___INLINE_CODE_PLACEHOLDER___";
  temp = temp.replace(inlineCodeRegex, (m) => {
    inlineCodes.push(m);
    return inlineCodePlaceholder;
  });

  // 3. <p> 태그 내 중괄호만 변환
  const escaped = temp.replace(pTagRegex, (full, open, content, close) => {
    // content 내 중괄호만 변환
    const escapedContent = content
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;");
    return open + escapedContent + close;
  });

  // 4. 인라인 코드 원복
  let output = escaped;
  for (const inlineCode of inlineCodes) {
    output = output.replace(inlineCodePlaceholder, inlineCode);
  }

  // 5. 코드블럭 원복
  for (const codeBlock of codeBlocks) {
    output = output.replace(codeBlockPlaceholder, codeBlock as string);
  }

  return output;
}

export default StudyDescriptionCard;
