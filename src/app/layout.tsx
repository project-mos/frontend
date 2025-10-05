import QueryClientProvider from "@/app/queryClientProvider";

import "@/shared/styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import AuthInitializerProvider from "@/entities/auth/model/AuthInitializerProvider";
import Footer from "@/shared/components/molecules/Footer";
import ToastRenderer from "@/shared/components/system/ToastRenderer";
import { staticMetadata } from "@/shared/constants/metadata";
import Chat from "@/widget/chat/ui/Chat";
import Header from "@/widget/header/Header";

export const metadata = staticMetadata;

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
          <Chat />
        </QueryClientProvider>
        <div id="portal"></div>
      </body>
    </html>
  );
}
