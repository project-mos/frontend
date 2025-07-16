// 캘린더 관련 유틸리티 함수

// 날짜를 'YYYY-MM-DD' 형식으로 포맷
export const formatDate = (year: number, month: number, day: number) => {
  const m = (month + 1).toString().padStart(2, "0");
  const d = day.toString().padStart(2, "0");
  return `${year}-${m}-${d}`;
};

// 해당 월의 마지막 날 구하기
export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// 해당 월의 1일이 시작하는 요일 구하기
export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};
