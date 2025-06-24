"use client";
import { useTokenStore } from "@/entities/auth/store/auty.store";

type JwtToken = {
  sub: string;
  id: number;
  exp: number;
};

const useDecodeToken = (): JwtToken | null => {
  const { accessToken } = useTokenStore();

  if (!accessToken) return null;

  try {
    const payloadBase64 = accessToken.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload;
  } catch (error) {
    console.error("토큰 디코딩 실패:", error);
    return null;
  }
};

export default useDecodeToken;
