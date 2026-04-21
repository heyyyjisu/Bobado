import type { Metadata } from "next";
import { Inria_Serif, Crafty_Girls, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
      className={cn(
        "h-full",
        "antialiased",
        inriaSerif.variable,
        craftyGirls.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className={`${inriaSerif.className} min-h-full flex flex-col`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
