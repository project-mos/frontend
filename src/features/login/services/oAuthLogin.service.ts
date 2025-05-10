interface oAuthLoginProps {
  code: string;
  provider: string;
}

export default async function oAuthLogin({ code, provider }: oAuthLoginProps) {
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
  console.log(result);

  const token = result.headers.get("Authorization")?.split(" ")[1];
  localStorage.setItem("access_token", token!);
  return result;
}
