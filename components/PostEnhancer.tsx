"use client";

import { useEffect } from "react";

/** Adds a copy button to every code block. Added here, not in the HTML, so there is no dead button without JS. */
export default function PostEnhancer() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>(".post .code").forEach((block) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy";
      button.textContent = "Copy";
      button.setAttribute("aria-label", "Copy code to clipboard");

      let timer: ReturnType<typeof setTimeout>;
      const onClick = async () => {
        try {
          await navigator.clipboard.writeText(block.querySelector("pre")?.textContent ?? "");
          button.textContent = "Copied";
        } catch {
          button.textContent = "Press Ctrl+C";
        }
        clearTimeout(timer);
        timer = setTimeout(() => (button.textContent = "Copy"), 1800);
      };

      button.addEventListener("click", onClick);
      block.appendChild(button);
      cleanups.push(() => {
        clearTimeout(timer);
        button.remove();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
