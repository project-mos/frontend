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
        <Header />
        <QueryClientProvider>
          <div className="px-[100px] pt-[75px]">{children}</div>
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  );
}
