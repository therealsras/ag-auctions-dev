import type { Metadata } from "next";
import { Bodoni_Moda, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/app/navbar";
import "./globals.css";

const bodySans = Plus_Jakarta_Sans({
  variable: "--font-body-sans",
  subsets: ["latin"],
});

const displaySerif = Bodoni_Moda({
  variable: "--font-display-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agentic Auctions",
  description: "Auction marketplace for enthusiast sellers and bidders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodySans.variable} ${displaySerif.variable} h-screen overflow-hidden antialiased`}>
        <div className="flex h-full flex-col">
          <Navbar />
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-6xl px-6 py-10">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
