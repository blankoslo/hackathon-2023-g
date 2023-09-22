import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
