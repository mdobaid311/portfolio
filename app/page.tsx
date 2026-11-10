import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Writing from "@/components/sections/Writing";
import WorkingTogether from "@/components/sections/WorkingTogether";
import Contact from "@/components/sections/Contact";
import { profile } from "@/lib/data";

// Structured data for search: who this page is about, matching what the page shows.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: "https://www.mohammedobaid.in",
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: profile.company },
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
  sameAs: profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="main" className="relative z-10">
        <Hero />
        <div data-tone="night">
          <About />
          <Projects />
          <Experience />
          <Writing />
          <WorkingTogether />
        </div>
      </main>
      <Contact />
    </>
  );
}
