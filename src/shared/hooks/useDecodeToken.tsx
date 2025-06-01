"use client";
import { useMemo } from "react";

const useDecodeToken = (accessToken?: string) => {
  return useMemo(() => {
    if (!accessToken) return null;

    try {
      const payloadBase64 = accessToken.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      return decodedPayload;
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
      return null;
    }
  }, [accessToken]);
};

export default useDecodeToken;
