import QueryClientProvider from "@/app/queryClientProvider";
import { cookies } from "next/headers";

import "@/shared/styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Footer from "@/shared/components/molecules/Footer";
import Header from "@/shared/components/molecules/Header";
import AppInitializer from "@/shared/components/system/AppInitializer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access-token")?.value;

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <QueryClientProvider>
          <AppInitializer isLoggedIn={!!accessToken} />
          <Header />
          <div className="flex items-center justify-center">
            <div className="layout">{children}</div>
          </div>
          <Footer />
        </QueryClientProvider>
        <div id="portal"></div>
      </body>
    </html>
  );
}
