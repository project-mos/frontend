import { activeStudiesProps, applyStatusProps } from "@/types/api/mypage";


// <ActiveStudies/> 에 쓰일 mock data - 참여 중인 스터디
export const MockActiveStudiesApiResult: activeStudiesProps[] = [{
  tag: ['프로그래밍', '스터디장'],
  title: "알고리즘 스터디",
  meta: {
    members: "4/6명",
    nextMeeting: "2024-02-25 20:00",
  },
},{
  tag: ['어학', '스터디원'],
  title: "TOEIC 900+ 스터디",
  meta: {
    members: "3/4명",
    nextMeeting: "024-02-26 19:00",
  },
}];

// <ActiveStudies/> 에 쓰일 mock data - 지원 현황
export const MockApplyStatusApiResult: applyStatusProps[] = [{
  tag: ['취업', '검토중'],
  title: "면접 대비 스터디",
  date: '2024-02-20'
}];
