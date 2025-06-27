import QueryClientProvider from "@/app/queryClientProvider";

import "@/shared/styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Footer from "@/shared/components/molecules/Footer";
import Header from "@/shared/components/molecules/Header";
import Chat from "@/features/landing/components/chat/Chat";
import AuthInitializerProvider from "@/shared/components/system/AuthInitializerProvider";
import ToastRenderer from "@/shared/components/system/ToastRenderer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <QueryClientProvider>
          <ToastRenderer />
          <AuthInitializerProvider />
          <Header />
          <div className="flex items-center justify-center">
            <div className="layout">{children}</div>
          </div>
          <Footer />
        </QueryClientProvider>
        <Chat />
        <div id="portal"></div>
      </body>
    </html>
  );
}
