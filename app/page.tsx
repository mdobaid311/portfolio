import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact, { Writing } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Writing />
      </main>
      <Contact />
    </>
  );
}
