import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Development Info",
  description: "What is Web Development — a small login-protected site",
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
