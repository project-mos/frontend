"use client";

import { useAuthStore } from "@/shared/store/authStore";
import { useEffect } from "react";

interface Props {
  hasTokens: boolean;
}

const LoginInitializer = ({ hasTokens }: Props) => {
  const { isLoggedIn, setLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn && !hasTokens) {
      setLoggedIn(false);
    }
  }, [isLoggedIn, hasTokens]);
  return null;
};

export default LoginInitializer;
