import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { title } from "process";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
title: "Coffee & Chill",
description: "Cozy cafe and restaurant in Shillong",
manifest: "/manifest.json",
icons: {
  icon: '/assets/logo1.png',
    apple: '/assets/logo1.png',
  },
appleWebApp: {
  capable: true,
    statusBarStyle: "default",
      title: "Coffee & Chill",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
