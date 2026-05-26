import type { Metadata } from "next";
import localFont from "next/font/local";
import { Shantell_Sans } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

// Define the Overused Grotesk font with all its weights and styles
const overusedGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/OverusedGrotesk-Light.woff2",
      weight: "300", // Common weight for 'Light'
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-Book.woff2",
      weight: "400", // Common weight for 'Book' or 'Regular'
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-BookItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-Roman.woff2", // Assuming 'Roman' is also a regular weight
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-Italic.woff2", // Pure 'Italic' often pairs with 'Regular'
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-Medium.woff2",
      weight: "500", // Common weight for 'Medium'
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-SemiBold.woff2",
      weight: "600", // Common weight for 'SemiBold'
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-Bold.woff2",
      weight: "700", // Common weight for 'Bold'
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-ExtraBold.woff2",
      weight: "800", // Common weight for 'ExtraBold'
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-Black.woff2",
      weight: "900", // Common weight for 'Black'
      style: "normal",
    },
    {
      path: "../../public/fonts/OverusedGrotesk-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap", // 'swap' is generally good for self-hosted fonts to prevent layout shift
  variable: "--font-overused-grotesk", // Optional: This creates a CSS variable for easier use with Tailwind CSS
});

// Define the Shantell Sans font from Google Fonts
const shantellSans = Shantell_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-shantell-sans",
});

export const metadata: Metadata = {
  title: "Evans Osei Frimpong",
  description: "Evans Osei Frimpong - Portolio",
  icons: {
    icon: "/favicon.ico",
    other: {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  },
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${overusedGrotesk.className} ${shantellSans.variable}  w-full mt-[100px]  mx-auto antialiased`}
    >
      <Navbar />
      <StarsBackground className="bg-white" />
      {children}
      <Footer />
    </div>
  );
}
