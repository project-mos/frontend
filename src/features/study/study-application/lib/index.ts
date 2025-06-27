export const isTodayInRange = (start: string, end: string): boolean => {
  const today = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  // 날짜 비교를 위해 시간 제거
  const normalize = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const normalizedToday = normalize(today);
  const normalizedStart = normalize(startDate);
  const normalizedEnd = normalize(endDate);

  return normalizedToday >= normalizedStart && normalizedToday <= normalizedEnd;
};
