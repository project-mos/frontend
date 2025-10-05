"use client";

import { requestNotificationPermission } from "@/shared/utils/firebase";
import { useEffect } from "react";

function InitNotification() {
  useEffect(() => {
    requestNotificationPermission();
  });
  return <></>;
}

export default InitNotification;
