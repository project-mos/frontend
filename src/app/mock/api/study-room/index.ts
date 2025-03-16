import { StudyCurriculumCardInterface, StudyNoticeCardInterface } from "@/types/api/study-room"

// <CurriculumCard/> 에 쓰일 mock data
export const MockCurriculumCardApiResult: StudyCurriculumCardInterface[] = [ 
  {
    step: '알고리즘 기초',
    title: '알고리즘 기초와 복잡도',
    content: '시간 복잡도, 공간 복잡도, 빅오 표기법에 대해 학습합니다.',
  },
  {
    step: '자료구조',
    title: '배열과 연결 리스트',
    content: '기본 자료구조인 배열과 연결 리스트의 특징과 활용법을 학습합니다.',
  },
  {
    step: '자료구조',
    title: '스택과 큐',
    content: '스택과 큐의 개념, 구현 방법, 실전 문제 풀이를 진행합니다.',
  }
]

// <NoticeCard/> 에 쓰일 mock data
export const MockNoticeCardApiResult: StudyNoticeCardInterface[] = [ 
  {
    title: '스터디 진행 방식 안내',
    content: '매주 화요일 오후 8시에 진행되며, 스터디 전 자료를 미리 읽어와 주시기 바랍니다!',
    writer:'작성자: 홍길동 • 2024-02-20'
  },
  {
    title: '스터디 진행 방식 안내2',
    content: '매주 화요일 오후 8시에 진행되며, 스터디 전 자료를 미리 읽어와 주시기 바랍니다.',
    writer:'작성자: 홍길동 • 2024-02-25'
  },
]