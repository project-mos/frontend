/**
 * 서울 시간 기준으로 날짜를 포맷합니다.
 * @param format 출력 포맷 (기본값: "YYYY-MM-DDTHH:mm")
 * @param date 포맷할 날짜 (Date 객체 또는 ISO 문자열), 없으면 현재 시간 사용
 * @returns 포맷된 날짜 문자열
 */
export function formatDate(
  format: string = "YYYY-MM-DDTHH:mm",
  date?: Date | string
): string {
  const baseDate = date ? new Date(date) : new Date();

  // 서울 시간으로 변환된 Date 객체 생성
  const seoulTime = new Date(
    baseDate.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const map: Record<string, string> = {
    YYYY: String(seoulTime.getFullYear()),
    MM: String(seoulTime.getMonth() + 1).padStart(2, "0"),
    DD: String(seoulTime.getDate()).padStart(2, "0"),
    HH: String(seoulTime.getHours()).padStart(2, "0"),
    mm: String(seoulTime.getMinutes()).padStart(2, "0"),
    ss: String(seoulTime.getSeconds()).padStart(2, "0"),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (token) => map[token]);
}

/**
 * 주어진 포맷 문자열에 따라 서울(Asia/Seoul) 시간 기준으로 현재 날짜를 반환합니다.
 *
 * 사용 가능한 포맷 키:
 * - YYYY: 연도 (예: 2025)
 * - MM: 월 (01~12)
 * - DD: 일 (01~31)
 * - HH: 시 (00~23)
 * - mm: 분 (00~59)
 * - ss: 초 (00~59)
 *
 * @param format 포맷 문자열 (기본값: "YYYY-MM-DDTHH:mm")
 * @returns 포맷된 날짜 문자열
 */
/**
 *
 * console.log(formatDate("YYYY-MM-DD"));          // "2025-04-18"
 * console.log(formatDate("YYYY/MM/DD HH:mm"));    // "2025/04/18 15:00"
 * console.log(formatDate("MM-DD-YYYY HH:mm:ss")); // "04-18-2025 15:00:01"
 * console.log(formatDate("YYYY-MM-DDTHH:mm"));    // "2025-04-18T15:00"
 */
export function formatNowDate(format: string = "YYYY-MM-DDTHH:mm"): string {
  const now = new Date();

  // 서울 시간 기준으로 Date 객체 생성
  const seoulTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  // 포맷 키워드와 실제 값 매핑
  const map: Record<string, string | number> = {
    YYYY: seoulTime.getFullYear(),
    MM: String(seoulTime.getMonth() + 1).padStart(2, "0"),
    DD: String(seoulTime.getDate()).padStart(2, "0"),
    HH: String(seoulTime.getHours()).padStart(2, "0"),
    mm: String(seoulTime.getMinutes()).padStart(2, "0"),
    ss: String(seoulTime.getSeconds()).padStart(2, "0"),
  };

  // 포맷 문자열 내 키워드 치환
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => String(map[match]));
}
