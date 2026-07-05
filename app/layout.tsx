import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammed Obaid — Full-Stack Software Engineer",
  description:
    "Full-stack software engineer in Hyderabad, India. Building transport & ground-support tech at Smartquip with React and .NET. Distributed systems, self-hosted Kubernetes, and interfaces with intent.",
  keywords: [
    "Mohammed Obaid",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    ".NET",
    "Hyderabad",
  ],
  openGraph: {
    title: "Mohammed Obaid — Full-Stack Software Engineer",
    description:
      "React on the surface, .NET and Node underneath — from pixel to pipeline.",
    url: "https://mohammedobaid.vercel.app",
    siteName: "Mohammed Obaid",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable} antialiased`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
