import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import SiteHeader from "@/components/shared_components/header";
import SiteFooter from "@/components/shared_components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Studio Space",
  description: "Vision to Life",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Toaster>
      </body>
    </html>
  );
}
