import type { Metadata } from "next";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammed Obaid | Full-Stack Software Engineer",
  description:
    "Full-stack software engineer in Hyderabad, India. React and Next.js on the front, .NET and Node.js behind them, event-driven microservices and self-hosted Kubernetes.",
  keywords: ["Mohammed Obaid", "Software Engineer", "Full-Stack Developer", "React", "Next.js", ".NET", "Hyderabad"],
  openGraph: {
    title: "Mohammed Obaid | Full-Stack Software Engineer",
    description: "I build web software end to end, mostly after dark, from Hyderabad.",
    url: "https://www.mohammedobaid.in",
    siteName: "Mohammed Obaid",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${schibsted.variable} ${jetbrains.variable} antialiased`}>
      <body>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-4 py-2 text-sm text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
