interface oAuthLoginProps {
  code: string;
  provider: string;
}

export default async function oAuthLogin({ code, provider }: oAuthLoginProps) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code,
          oauthProvider: provider,
        }),
      }
    );

    return response;
  } catch (error) {
    console.error("OAuth 로그인 중 오류 발생:", error);
    return null;
  }
}
