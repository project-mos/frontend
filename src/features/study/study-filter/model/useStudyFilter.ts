import { StudyFilterDropdownProps } from "@/features/study/study-filter/ui/study-filter.ui.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * @function useStudyFilter
 * @description 스터디 필터링 기능을 위한 커스텀 훅입니다.
 * URL 쿼리 파라미터를 조작하여 스터디 목록을 필터링하고, Next.js 라우터를 통해 페이지를 업데이트합니다.
 * '좋아요', '진행 방식', '모집 방식', '카테고리' 필터링 로직을 포함합니다.
 *
 * @returns {object} 필터링 관련 핸들러 함수 및 Next.js 라우터 객체와 검색 파라미터를 반환합니다.
 * - onClickLiked: 좋아요 필터 토글 함수
 * - onClickSelected: 진행 방식 또는 모집 방식 필터 선택 함수
 * - onClickCategory: 카테고리 필터 선택 함수
 * - searchParams: 현재 URLSearchParams 객체
 * - pathname: 현재 경로 이름
 * - router: Next.js useRouter 훅 반환 값
 */
const useStudyFilter = () => {
  // 현재 URL의 쿼리 파라미터를 가져오기 위한 훅
  const searchParams = useSearchParams();
  // Next.js 라우터 객체를 가져오기 위한 훅 (페이지 이동, 새로고침 등)
  const router = useRouter();
  // 현재 경로 이름(pathname)을 가져오기 위한 훅
  const pathname = usePathname();

  /**
   * @function onClickLiked
   * @description '좋아요' 필터를 토글하는 함수입니다.
   * URL의 'liked' 쿼리 파라미터를 'true' 또는 'false'로 설정하거나 제거합니다.
   * 항상 'page' 파라미터를 '1'로 초기화하여 새로운 필터 적용 시 첫 페이지로 이동시킵니다.
   */
  const onClickLiked = () => {
    // 현재 URLSearchParams를 복사하여 새로운 인스턴스 생성
    const params = new URLSearchParams(searchParams.toString());
    // 'liked' 쿼리 파라미터의 현재 값 가져오기
    const liked = searchParams.get("liked");
    // 'liked' 값이 "true"인지 여부 확인
    const boolValue = liked === "true";

    // 'liked' 파라미터가 없으면 'true'로 설정
    if (liked === null) {
      params.set("liked", `${true}`);
    } else {
      // 'liked' 파라미터가 있으면 현재 값의 반대로 설정 (true <-> false)
      params.set("liked", `${!boolValue}`);
    }
    // 필터 변경 시 항상 페이지를 1로 초기화
    params.set("page", "1");
    // URL 업데이트 및 페이지 이동
    router.push(`${pathname}?${params.toString()}`);
  };

  /**
   * @function onClickSelected
   * @description '진행 방식' 또는 '모집 방식' 필터를 적용하는 함수입니다.
   * @param {StudyFilterDropdownProps["type"]} type - 필터링할 타입 ('meet' 또는 'recruitment').
   * @param {string} value - 선택된 필터 값. 값이 없으면 해당 파라미터를 URL에서 제거합니다.
   * 항상 'page' 파라미터를 '1'로 초기화하여 새로운 필터 적용 시 첫 페이지로 이동시킵니다.
   */
  const onClickSelected = (
    type: StudyFilterDropdownProps["type"], // 예를 들어 "meet" 또는 "recruitment"
    value: string // 선택된 드롭다운 값 (예: "대면", "비대면", "모집 중" 등)
  ) => {
    // 현재 URLSearchParams를 복사하여 새로운 인스턴스 생성
    const params = new URLSearchParams(searchParams.toString());

    // 필터 타입에 따라 쿼리 파라미터 설정 또는 제거
    if (type === "meet") {
      if (value) {
        // 값이 있으면 'meetType' 파라미터 설정
        params.set("meetType", value);
      } else {
        // 값이 없으면 'meetType' 파라미터 제거 ('전체' 선택 시)
        params.delete("meetType");
      }
    } else {
      // 'recruitment' 타입일 경우
      if (value) {
        // 값이 있으면 'recruitmentStatus' 파라미터 설정
        params.set("recruitmentStatus", value);
      } else {
        // 값이 없으면 'recruitmentStatus' 파라미터 제거 ('전체' 선택 시)
        params.delete("recruitmentStatus");
      }
    }
    // 필터 변경 시 항상 페이지를 1로 초기화
    params.set("page", "1");
    // URL 업데이트 및 페이지 이동
    router.push(`${pathname}?${params.toString()}`);
  };

  /**
   * @function onClickCategory
   * @description '카테고리' 필터를 적용하는 함수입니다.
   * @param {string} value - 선택된 카테고리 값. 값이 없으면 'category' 파라미터를 URL에서 제거합니다.
   * 항상 'page' 파라미터를 '1'로 초기화하여 새로운 필터 적용 시 첫 페이지로 이동시킵니다.
   */
  const onClickCategory = (value: string) => {
    // 현재 URLSearchParams를 복사하여 새로운 인스턴스 생성
    const params = new URLSearchParams(searchParams.toString());

    // 값이 있으면 'category' 파라미터 설정
    if (value) {
      params.set("category", value);
    } else {
      // 값이 없으면 'category' 파라미터 제거 ('전체' 선택 시)
      params.delete("category");
    }
    // 필터 변경 시 항상 페이지를 1로 초기화
    params.set("page", "1");
    // URL 업데이트 및 페이지 이동
    router.push(`${pathname}?${params.toString()}`);
  };

  // 필터링 관련 함수 및 Next.js 라우터/검색 파라미터 반환
  return {
    onClickLiked,
    onClickSelected,
    onClickCategory,
    searchParams, // 현재 URL의 쿼리 파라미터 객체
    pathname, // 현재 경로 이름
    router, // Next.js 라우터 객체
  };
};

export default useStudyFilter;
