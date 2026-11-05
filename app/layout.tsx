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
  title: "Mohammed Obaid | Full-Stack Software Engineer",
  description:
    "Full-stack software engineer in Hyderabad, India. Building transport and ground-support tech at Smartquip with React and .NET. Distributed systems and self-hosted Kubernetes.",
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
    title: "Mohammed Obaid | Full-Stack Software Engineer",
    description: "React on the surface, .NET and Node underneath.",
    url: "https://www.mohammedobaid.in",
    siteName: "Mohammed Obaid",
    type: "website",
  },
};

// Runs before paint so a saved light theme never flashes dark.
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
