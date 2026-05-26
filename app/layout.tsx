import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Owura Kwaku Safo",
  description: "Owura Kwaku Safo - Portfolio",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  other: {
    "facebook-domain-verification": "4td6ur9xweirwwc2kyr1q7k13uzycz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` w-full`}>{children}</body>
    </html>
  );
}
