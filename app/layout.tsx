import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creating Digital Poetry — Glacier",
  description: "We shape premium digital experiences through layered translucency, frozen light, and atmospheric depth.",
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
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
