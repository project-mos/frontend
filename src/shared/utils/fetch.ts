export class FetchAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FetchAPIError";
  }
}

export const fetchAPI = async <T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<T> => {
  const response = await fetch(input, init);

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new FetchAPIError("인증되지 않은 사용자입니다.");
      case 403:
        throw new FetchAPIError("접근 권한이 없습니다.");
      case 404:
        throw new FetchAPIError("요청한 리소스를 찾을 수 없습니다.");
      case 422:
        throw new FetchAPIError("유효하지 않은 요청입니다.");
      case 503:
        throw new FetchAPIError("서버가 현재 점검 중입니다.");
      case 504:
        throw new FetchAPIError("서버 응답이 지연되고 있습니다.");
      default:
        if (response.status >= 500) {
          throw new FetchAPIError("예상치 못한 서버 오류입니다.");
        }
        throw new FetchAPIError("클라이언트 오류");
    }
  }

  let data: T | string;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  // testing
  // throw new FetchAPIError("예상치 못한 서버 오류입니다.");
  return data as T;
};
