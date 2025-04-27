# FE

### StydyMOS FrontEnd Repo

Node.js v20.18.2
Pnpm 9.15.4

## 팀원

| 최진                                                                       | 김연정                                                                    | 강민재                                                                          |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/gogleset?v=4" width="100"> | <img src="https://avatars.githubusercontent.com/yeooonn?v=4" width="100"> | <img src="https://avatars.githubusercontent.com/minijae011030?v=4" width="100"> |
| [깃허브](https://github.com/gogleset)                                      | [깃허브](https://github.com/yeooonn)                                      | [깃허브](https://github.com/minijae011030)                                      |

## 프로젝트 기간

2025.02 ~

## 기술 스택

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Deployment**: aws
- **Etc**: ESLint, Prettier, Husky, Storybook

## 프로젝트 구조

Atomic Design + FSD 기반 폴더 구조 적용

```bash
src
├── app                         # Next.js App Router 라우팅 설정
│   ├── {page}
│   │   ├── components/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── layout.tsx              # 전체 앱 레이아웃
│   ├── page.tsx                # 루트 페이지
│   ├── error.tsx, loading.tsx, not-found.tsx # 에러 핸들링
│   └── queryClientProvider.tsx # React Query Provider
│
├── features                    # 기능(도메인) 기반 분리
│   ├── {domain}
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│
├── shared                      # 공통 코드
│   ├── components              # 재사용 UI 컴포넌트
│   │   ├── atoms
│   │   ├── molecules
│   │   └── organisms
│   ├── constants               # 상수
│   ├── hooks                   # 커스텀 훅
│   └── mock                    # 테스트용 데이터
│
└── public                      # 정적 파일
```

## 커밋 컨벤션

| 이모지 | 타입     | 설명                                           |
| ------ | -------- | ---------------------------------------------- |
| 🚀     | Feat     | 새로운 기능 추가                               |
| 🚑     | Fix      | 버그 수정                                      |
| ♻️     | Refactor | 코드 리팩토링                                  |
| 🎨     | Style    | 코드 포맷팅, 세미콜론 누락 등 (기능 변화 없음) |
| 📝     | Docs     | 문서 수정                                      |
| 💡     | Comment  | 주석 추가 및 변경                              |
| 💄     | Design   | CSS 등 UI 스타일링 변경                        |
| 🍻     | Beers    | 음주 코딩                                      |
| 🎉     | Init     | 프로젝트 초기 설정                             |
| 🚚     | File     | 파일/폴더 구조 변경                            |
| 🐛     | Bug      | 버그 리포트 또는 FIXME 주석 추가               |
| 🔨     | Chore    | 기타 수정사항 (빌드 설정, 패키지 등)           |
