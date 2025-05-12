"use client";

import ToastRenderer from "@/shared/components/ToastRenderer";
import { useToast } from "@/shared/hooks/useToast";
import { useEffect, useRef } from "react";

const LandingLoginToast = () => {
  const shownRef = useRef(false);
  const toast = useToast();

  useEffect(() => {
    if (shownRef.current) return;
    const loginStatus = localStorage.getItem("login");

    if (!loginStatus) return;
    if (loginStatus === "true") toast.success("로그인에 성공하였습니다.");
    if (loginStatus === "false") toast.error("로그인에 실패하였습니다.");
    shownRef.current = true;
    localStorage.removeItem("login");
  }, []);

  return <ToastRenderer />;
};

export default LandingLoginToast;
