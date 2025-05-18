"use client";

import { useAuthStore } from "@/shared/store/authStore";
import { useEffect } from "react";

const AppInitializer = () => {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        setLoggedIn(data.isLoggedIn);
      } catch {
        setLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  return null;
};

export default AppInitializer;
