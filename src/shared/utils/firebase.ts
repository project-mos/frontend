import { initializeApp } from "firebase/app";
import {
  getToken as _getToken,
  onMessage as _onMessage,
  getMessaging,
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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function initFCM() {
  // 1) 포그라운드 수신
  _onMessage(messaging, (payload) => {
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

  // 2) 토큰 발급
  try {
    if (!("serviceWorker" in navigator)) return;
    const reg = await navigator.serviceWorker.ready;
    const token = await _getToken(messaging, {
      vapidKey: "",
      serviceWorkerRegistration: reg,
    });
    if (token) {
      localStorage.setItem("fcmToken", token);
      console.log("FCM Token", token);
    } else {
      console.warn("FCM 토큰을 받아올 수 없음. 알림 권한을 허용해주세요.");
    }
  } catch (err) {
    console.error("FCM 토큰 발급 실패:", err);
  }
}

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.info("이 환경은 Notification API를 지원하지 않아요.");
    return;
  }
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("알림 권한 거부됨");
    return;
  }
  await initFCM();
}

export const getToken = _getToken;
export const onMessage = _onMessage;
export { messaging };
