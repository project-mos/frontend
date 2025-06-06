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

  // 백엔드에서 response 주는 것 같음.
  if (!response.ok) {
    const responseText = await response.text();
    throw new FetchAPIError(responseText);
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
