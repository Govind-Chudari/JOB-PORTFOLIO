import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/LenisProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "block",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "block",
});

export const metadata: Metadata = {
  title: "GOVIND CHUDARI — Vibe Coder",
  description: "Full Stack Developer, ML Engineer & Vibe Coder. Building cool stuff on the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased bg-background text-foreground`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
