import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const solinaFont = localFont({
  src: [
    {
      path: "./fonts/Solina/Solina-CondensedMedium.otf",
      weight: "400",
    },
    {
      path: "./fonts/Solina/Solina-CondensedSemiBold.otf",
      weight: "500",
    },
    {
      path: "./fonts/Solina/Solina-Heavy.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Solina/Solina-Light.ttf",
      weight: "300",
    },
  ],
  display: "swap",
  variable: "--font-solina",
});

export const metadata: Metadata = {
  title: "Breaking tunes",
  description: "Hackathon 2023 group G",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" className={`${solinaFont.variable} ${solinaFont.variable}`}>
      <body className={solinaFont.className}>{children}</body>
    </html>
  );
}
