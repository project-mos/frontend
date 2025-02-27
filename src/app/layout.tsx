import QueryClientProvider from "@/app/queryClientProvider";
import "../styles/global.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <QueryClientProvider>
          <Header />
          <div className="flex items-center justify-center">
            <div className="layout">{children}</div>
          </div>
          <Footer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
