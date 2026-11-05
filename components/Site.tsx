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
import Contact from "@/components/sections/Contact";

export default function Site() {
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Trajectory />
        <Work />
        <Arsenal />
        <Contact />
      </main>
    </>
  );
}
