import type { Metadata } from "next";
import { Inria_Serif, Crafty_Girls } from "next/font/google";
import "./globals.css";

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria-serif",
});
const craftyGirls = Crafty_Girls({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-crafty-girls",
});

export const metadata: Metadata = {
  title: "bobado",
  description: "todo | fruits pluck app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inriaSerif.variable} ${craftyGirls.variable} h-full antialiased`}
    >
      <body className={`${inriaSerif.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
