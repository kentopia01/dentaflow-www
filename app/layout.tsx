import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DentaFlow — Dental practice management for Singapore clinics",
  description: "Online booking, WhatsApp reminders, and patient recall — built for Singapore dental clinics. Replace your WhatsApp booking chaos with a platform that runs itself.",
  metadataBase: new URL("https://dentaflow-www.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DentaFlow — Dental practice management for Singapore clinics",
    description: "Online booking, WhatsApp reminders, and patient recall — built for Singapore dental clinics.",
    url: "https://dentaflow-www.vercel.app",
    siteName: "DentaFlow",
    type: "website",
    locale: "en_SG",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DentaFlow — Stop managing bookings on WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DentaFlow — Dental practice management for Singapore clinics",
    description: "Online booking, WhatsApp reminders, and patient recall — built for Singapore dental clinics.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
