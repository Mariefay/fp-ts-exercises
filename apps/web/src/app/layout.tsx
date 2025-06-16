import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fp-ts Exercises",
  description: "Interactive learning platform for fp-ts functional programming concepts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
