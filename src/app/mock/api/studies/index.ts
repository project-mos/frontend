import { StudiesDescription } from "@/types/api/studies/detail";

// <StudyDescriptionCard/> 에 쓰일 mock data
export const MockStudiesApiResult: StudiesDescription = {
  id: 1,
  category: "프로그래밍",
  status: "모집중",
  mode: "비대면",
  title: "알고리즘 마스터 스터디",
  views: 244,
  participants: {
    current: 4,
    max: 6,
  },
  schedule: {
    startDate: "2024-03-01",
    endDate: "2024-03-04",
    weeklyMeeting: "매주 화요일 저녁 8시",
  },
  tags: ["Python", "Java", "코딩테스트", "알고리즘", "PS"],
  description: {
    intro:
      "코딩 테스트 대비를 위한 알고리즘 스터디입니다. 매주 백준 골드 레벨 문제를 풀고 토론하며, 실전 대비 모의고사도 진행합니다.",
    requirements: ["알고리즘 기초 지식 보유자", "백준 실버 이상 해결 가능자"],
    rules: [
      "매주 과제 문제 필수 풀이",
      "스터디 불참 시 24시간 전 통보",
      "월 1회 이상 발표",
      "진행 코드 리뷰 적극 참여",
    ],
    benefits: [
      "매주 과제 문제 필수 풀이",
      "스터디 불참 시 24시간 전 통보",
      "월 1회 이상 발표",
      "진행 코드 리뷰 적극 참여",
    ],
  },
};
