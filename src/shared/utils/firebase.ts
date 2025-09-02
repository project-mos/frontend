import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getToken as _getToken,
  onMessage as _onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export async function getMessagingSafe() {
  if (typeof window === "undefined") return null;
  const { isSupported, getMessaging } = await import("firebase/messaging");
  if (!(await isSupported())) return null;
  return getMessaging(app);
}

export async function initFCM() {
  if (typeof window === "undefined") return;

  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
      scope: "/",
    });
  } else {
    console.warn("Service Worker 미지원 환경");
    return;
  }

  const messaging = await getMessagingSafe();
  if (!messaging) {
    console.warn(
      "이 브라우저는 FCM을 지원하지 않거나(사파리 등) HTTPS가 아닙니다."
    );
    return;
  }

  const { getToken, onMessage } = await import("firebase/messaging");

  // 포그라운드 메시지
  onMessage(messaging, (payload) => {
    const { title, body } = payload.notification || {};
    if (
      "Notification" in window &&
      Notification.permission === "granted" &&
      title &&
      body
    ) {
      new Notification(title, { body });
    }
  });

  // 토큰 발급
  try {
    const reg = await navigator.serviceWorker.ready;
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
      serviceWorkerRegistration: reg,
    });
    if (token) {
      return token;
    } else {
      console.warn("FCM 토큰 발급 실패: 알림 권한 허용 필요");
    }
  } catch (e) {
    console.error("FCM 토큰 발급 에러:", e);
  }
}

export async function requestNotificationPermission() {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("알림 권한 거부됨");
    return;
  }
  const token = await initFCM();

  if (token) {
    localStorage.setItem("fcmToken", token);
  }
}

export const getToken = _getToken;
export const onMessage = _onMessage;
