import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trade Diary - 投資ブログ",
  description: "投資経験を記録し、学びを共有する投資ブログ。株式、仮想通貨、FXなどの投資記録と分析を公開しています。",
  keywords: "投資, ブログ, 株式, 仮想通貨, FX, トレード, 資産運用",
  authors: [{ name: "トレーダー田中" }],
  openGraph: {
    title: "Trade Diary - 投資ブログ",
    description: "投資経験を記録し、学びを共有する投資ブログ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
