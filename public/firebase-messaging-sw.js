importScripts(
  "https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDmSFBCGiFPV8xtqFbVCYJCFw96Wnyq1aY",
  authDomain: "mos-project-ebc9a.firebaseapp.com",
  projectId: "mos-project-ebc9a",
  storageBucket: "mos-project-ebc9a.firebasestorage.app",
  messagingSenderId: "516973429629",
  appId: "1:516973429629:web:110d0af926954021cfc214",
  measurementId: "G-7EEDZFDC0E",
});

messaging.onBackgroundMessage((payload) => {
  const d = payload?.data || {};
  const title = d.title || "알림";
  const body = d.body || "";
  const icon = d.icon || "/icons/icon-192x192.png";
  const url = d.url || "/";

  self.registration.showNotification(title, {
    body,
    icon,
    data: { url, ...d },
  });
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = e.notification?.data?.url || self.location.origin + "/";

  e.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });
      // 같은 오리진 창 있으면 그 창으로 이동
      const existing = allClients.find((c) =>
        c.url.startsWith(self.location.origin)
      );
      if (existing) {
        existing.focus();
        try {
          await existing.navigate(url);
        } catch (e) {
          console.error(e);
        }
        return;
      }
      // 없으면 새 창
      return self.clients.openWindow(url);
    })()
  );
});
