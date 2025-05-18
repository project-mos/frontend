import QueryClientProvider from "@/app/queryClientProvider";

import "@/shared/styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Footer from "@/shared/components/molecules/Footer";
import Header from "@/shared/components/molecules/Header";
import AppInitializer from "@/shared/components/system/AppInitializer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <QueryClientProvider>
          <AppInitializer />
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
