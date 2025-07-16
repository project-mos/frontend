// 캘린더의 이전/다음 달 이동 로직.
export const useCalendarNavigation = (
  currentDate: Date,
  setCurrentDate: (date: Date) => void
) => {
  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return { handlePrevMonth, handleNextMonth };
};
