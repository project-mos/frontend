import {
  StudyCurriculumCardInterface,
  StudyManageCardInterface,
  StudyMemberAttendanceInterface,
  StudyMemberInterface,
  StudyNoticeCardInterface,
} from "@/shared/types/api/study-room";
import { generateUUID } from "@/shared/utils/generateUUID";

// <CurriculumCard/> 에 쓰일 mock data
export const MockCurriculumCardApiResult: StudyCurriculumCardInterface[] = [
  {
    id: generateUUID(),
    step: "알고리즘 기초",
    title: "알고리즘 기초와 복잡도",
    content: "시간 복잡도, 공간 복잡도, 빅오 표기법에 대해 학습합니다.",
  },
  {
    id: generateUUID(),
    step: "자료구조",
    title: "배열과 연결 리스트",
    content: "기본 자료구조인 배열과 연결 리스트의 특징과 활용법을 학습합니다.",
  },
  {
    id: generateUUID(),
    step: "자료구조",
    title: "스택과 큐",
    content: "스택과 큐의 개념, 구현 방법, 실전 문제 풀이를 진행합니다.",
  },
];

// <NoticeCard/> 에 쓰일 mock data
export const MockNoticeCardApiResult: StudyNoticeCardInterface[] = [
  {
    id: 1,
    title: "스터디 진행 방식 안내",
    content:
      "매주 화요일 오후 8시에 진행되며, 스터디 전 자료를 미리 읽어와 주시기 바랍니다!",
    writer: "작성자: 홍길동 • 2024-02-20",
  },
  {
    id: 2,
    title: "스터디 진행 방식 안내2",
    content:
      "매주 화요일 오후 8시에 진행되며, 스터디 전 자료를 미리 읽어와 주시기 바랍니다.",
    writer: "작성자: 홍길동 • 2024-02-25",
  },
];

// <ManageCard/> 에 쓰일 mock data
export const MockManageCardApiResult: StudyManageCardInterface[] = [
  {
    name: "홍길동",
    date: "지원일시: 2024-03-20 14:30",
    email: "test@example.com",
    experience: "소프트웨어 개발 경력 2년",
    questionList: [
      {
        question: "지원동기",
        answer: "알고리즘 실력 향상을 위해 함께 공부하고 싶습니다.",
      },
      { question: "스터디 투자 시간", answer: "10시간 이상" },
    ],
  },
  {
    name: "김연정",
    date: "지원일시: 2024-03-03 14:33",
    email: "test@example.com",
    experience: "프론트엔드 개발 경력 2년",
    questionList: [
      {
        question: "지원동기",
        answer: "알고리즘 실력 향상을 위해 함께 공부하고 싶습니다!",
      },
      { question: "스터디 투자 시간", answer: "8시간 이상" },
    ],
  },
];
/**
 * <MemberCard/> 에 쓰일 mock data 'role' Enum이나 다른 값 필요함.
 * /studies/{studyId}/members
 * 스터디원 조회하기
 */
export const MockStudyMembers: StudyMemberInterface[] = [
  {
    userId: 100,
    nickname: "홍길동",
    studyMemberRoleType: "스터디장",
    lastAttendanceDate: "2025-03-28",
    participationRate: 87.5,
  },
  {
    userId: 101,
    nickname: "도라에몽",
    studyMemberRoleType: "스터디원",
    lastAttendanceDate: "2025-03-27",
    participationRate: 65.0,
  },
  {
    userId: 3,
    nickname: "박민수",
    studyMemberRoleType: "스터디원",
    lastAttendanceDate: "2025-03-26",
    participationRate: 72.3,
  },
  {
    userId: 4,
    nickname: "최유리",
    studyMemberRoleType: "스터디장",
    lastAttendanceDate: "2025-03-28",
    participationRate: 91.2,
  },
  {
    userId: 5,
    nickname: "정하늘",
    studyMemberRoleType: "스터디원",
    lastAttendanceDate: "2025-03-25",
    participationRate: 55.4,
  },
  {
    userId: 6,
    nickname: "오세진",
    studyMemberRoleType: "스터디원",
    lastAttendanceDate: "2025-03-24",
    participationRate: 78.9,
  },
  {
    userId: 7,
    nickname: "한지훈",
    studyMemberRoleType: "스터디원",
    lastAttendanceDate: "2025-03-28",
    participationRate: 82.1,
  },
  {
    userId: 8,
    nickname: "유나경",
    studyMemberRoleType: "스터디장",
    lastAttendanceDate: "2025-03-27",
    participationRate: 95.0,
  },
];
/**
 * <MemberModal/> 에 쓰일 mock data
 * /studies/{studyId}/members/attendances
 * 스터디원의 출석률 조회
 */
export const MockStudyMemberAttendance: StudyMemberAttendanceInterface[] = [
  {
    studyMemberId: 1,
    userId: 100,
    nickname: "홍길동",
    attendanceRes: [
      {
        attendanceId: 200,
        isAttended: true,
        studyScheduleId: 300,
        StudyScheduleStartDateTime: "2024-03-25T09:00:00",
      },
      {
        attendanceId: 201,
        isAttended: false,
        studyScheduleId: 301,
        StudyScheduleStartDateTime: "2024-03-26T10:00:00",
      },
      {
        attendanceId: 200,
        isAttended: true,
        studyScheduleId: 300,
        StudyScheduleStartDateTime: "2024-03-25T09:00:00",
      },
      {
        attendanceId: 200,
        isAttended: true,
        studyScheduleId: 300,
        StudyScheduleStartDateTime: "2024-03-25T09:00:00",
      },
      {
        attendanceId: 201,
        isAttended: false,
        studyScheduleId: 301,
        StudyScheduleStartDateTime: "2024-03-26T10:00:00",
      },
      {
        attendanceId: 200,
        isAttended: true,
        studyScheduleId: 300,
        StudyScheduleStartDateTime: "2024-03-25T09:00:00",
      },
      {
        attendanceId: 201,
        isAttended: false,
        studyScheduleId: 301,
        StudyScheduleStartDateTime: "2024-03-26T10:00:00",
      },
    ],
    attendanceRate: 50.0,
  },
  {
    studyMemberId: 2,
    userId: 101,
    nickname: "도라에몽",
    attendanceRes: [
      {
        attendanceId: 202,
        isAttended: true,
        studyScheduleId: 300,
        StudyScheduleStartDateTime: "2024-03-27T14:00:00",
      },
      {
        attendanceId: 203,
        isAttended: true,
        studyScheduleId: 301,
        StudyScheduleStartDateTime: "2024-03-28T16:00:00",
      },
    ],
    attendanceRate: 100.0,
  },
];

/**
 * <ManageOverviewCard />에 쓰일 mock data
 * /study-room/components/ManageOverviewCard.tsx
 */

export const MockManageOverviewCardData = [
  { id: 1, text: "example text" },
  { id: 2, text: "example text" },
  { id: 3, text: "example text" },
  { id: 4, text: "example text" },
  { id: 5, text: "example text" },
  { id: 6, text: "example text" },
];
