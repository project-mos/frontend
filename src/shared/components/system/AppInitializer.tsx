"use client";

import { useAuthStore } from "@/shared/store/authStore";
import { useEffect } from "react";

interface AppInitializerProps {
  isLoggedIn: boolean;
}
const AppInitializer = ({ isLoggedIn }: AppInitializerProps) => {
  const { setLoggedIn } = useAuthStore();

  useEffect(() => {
    setLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  return null;
};

export default AppInitializer;
