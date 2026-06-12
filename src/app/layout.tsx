import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-neue-montreal",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DivyanshuOP — India's Best Credit Cards",
  description:
    "Compare rewards, fees, lounge access, and benefits across Axis Bank, HDFC Bank, ICICI Bank, and AU Bank.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable}`}>
      <body className="bg-slate-veil text-bone-white font-neue-montreal antialiased">
        {children}
      </body>
    </html>
  );
}
