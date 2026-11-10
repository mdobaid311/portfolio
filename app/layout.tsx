import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Relative URLs below (canonical, og:url, the generated og:image) resolve against this.
  metadataBase: new URL("https://www.mohammedobaid.in"),
  title: {
    default: "Mohammed Obaid | Full-Stack Software Engineer",
    template: "%s | Mohammed Obaid",
  },
  description:
    "Full-stack software engineer in Hyderabad, India. React and Next.js on the front, .NET and Node.js behind them, event-driven microservices and self-hosted Kubernetes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mohammed Obaid | Full-Stack Software Engineer",
    description: "I build web software end to end, mostly after dark, from Hyderabad.",
    url: "/",
    siteName: "Mohammed Obaid",
    type: "website",
    locale: "en_IN",
  },
  // The image itself comes from app/opengraph-image.tsx; X falls back to og:image.
  twitter: { card: "summary_large_image", creator: "@mdobaid311" },
};

export const viewport: Viewport = {
  themeColor: "#eeebe4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${schibsted.variable} ${jetbrains.variable} antialiased`}>
      <body>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style>
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
