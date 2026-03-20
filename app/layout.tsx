import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "SEX ON THE KURUMA",
  description: "Personal site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${pressStart.variable} bg-black text-white flex flex-col h-full`}
      >
        <Header />
        <div className="flex-1 overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
