"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Trajectory from "@/components/sections/Trajectory";
import Work from "@/components/sections/Work";
import Arsenal from "@/components/sections/Arsenal";
import Contact from "@/components/sections/Contact";

export default function Site() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SmoothScroll enabled={booted} />
      <Cursor />
      <Preloader onDone={() => setBooted(true)} />
      <Navbar started={booted} />

      <main>
        <Hero started={booted} />
        <About />
        <Trajectory />
        <Work />
        <Arsenal />
        <Contact />
      </main>

      {/* atmosphere */}
      <div className="noise-overlay z-[95]" aria-hidden />
    </>
  );
}
