// 날짜를 서울(Asia/Seoul) 기준으로 변환해주는 함수
export function formatSeoulDate(date?: Date | string) {
  // 전달받은 date가 있으면 그것을 사용하고, 없으면 현재 시간으로 설정
  const baseDate = date ? new Date(date) : new Date();

  // 해당 날짜를 'Asia/Seoul' 타임존 기준의 문자열로 변환 후 다시 Date 객체로 생성
  // 이렇게 하면 시스템 타임존에 관계없이 항상 서울 기준 시간이 반환됨
  const seoulTime = new Date(
    baseDate.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  // 변환된 서울 시간 반환
  return seoulTime;
}

// 현재 시간을 서울 기준으로 반환하는 함수
export function nowDate() {
  // 현재 시간 (로컬 타임존 기준)
  const now = new Date();

  // formatSeoulDate를 이용해 서울 기준 시간으로 변환
  return formatSeoulDate(now);
}

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
  // 서울 시간으로 변환된 Date 객체 생성
  const seoulTime = formatSeoulDate(date);

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
  const seoulTime = formatSeoulDate(now);
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

/**
 * 주어진 시간과 현재 시간의 차이를 상대적으로 표시합니다.
 * @param timestamp ISO 문자열 또는 Date 객체
 * @returns 상대적 시간 표시 (예: "5분 전", "2시간 전", "3일 전")
 */
export function formatRelativeTime(timestamp: string | Date): string {
  const date = new Date(timestamp);
  const now = nowDate();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  // 일주일 이상 지난 경우 날짜 표시
  return formatDate("MM-DD", date);
}

/**
 * 주어진 날짜/시간을 시간만 표시합니다 (HH:MM 형식)
 * @param timestamp ISO 문자열 또는 Date 객체
 * @returns 시간 문자열 (예: "15:30", "09:45")
 */
export function formatTime(timestamp?: string | Date): string {
  if (!timestamp) return "";
  return formatDate("HH:mm", timestamp);
}
