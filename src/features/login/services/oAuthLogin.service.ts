interface oAuthLoginProps {
  code: string;
  provider: string;
}

export default async function oAuthLogin({ code, provider }: oAuthLoginProps) {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code: code,
          oauthProvider: provider,
        }),
      }
    );

    if (!result.ok) {
      return null;
    }

    const token = result.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return null;
    }

    localStorage.setItem("access_token", token);
    return result;
  } catch (error) {
    console.error("OAuth 요청 중 오류 발생:", error);
    return null;
  }

  // fetcher.ts 가 data를 반환하는 형식이라 보류
  // const response = await fetchData({
  //   endpoint: API_ENDPOINT.auth.signIn(),
  //   data: {
  //     code: code,
  //     oauthProvider: provider,
  //   }
  // })
}
