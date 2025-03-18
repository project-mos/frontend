import { StudyCurriculumCardInterface, StudyManageCardInterface, StudyNoticeCardInterface } from "@/types/api/study-room"

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

// <ManageCard/> 에 쓰일 mock data
export const MockManageCardApiResult: StudyManageCardInterface[] = [ 
  {
    name: '홍길동',
    date: '지원일시: 2024-03-20 14:30',
    questionList:[
      {question: '스터디를 지원하게 된 동기는 무엇인가요?', answer: '알고리즘 실력 향상을 위해 함께 공부하고 싶습니다.'},
      {question: '일주일에 몇 시간 정도 스터디에 투자할 수 있나요?', answer: '10시간 이상'}
    ]
  },
  {
    name: '김연정',
    date: '지원일시: 2024-03-3 14:33',
    questionList:[
      {question: '스터디를 지원하게 된 동기는 무엇인가요?', answer: '알고리즘 실력 향상을 위해 함께 공부하고 싶습니다!'},
      {question: '일주일에 몇 시간 정도 스터디에 투자할 수 있나요?', answer: '8시간 이상'}
    ]
  },
]