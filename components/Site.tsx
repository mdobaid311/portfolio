"use client";

import { useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Trajectory from "@/components/sections/Trajectory";
import Work from "@/components/sections/Work";
import Arsenal from "@/components/sections/Arsenal";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";

export default function Site() {
  useEffect(() => {
    // Keep the browser's own restore for deep links like /#work; otherwise start at the top.
    history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />

      <main id="main">
        <Hero />
        <Work />
        <Trajectory />
        <About />
        <Arsenal />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
