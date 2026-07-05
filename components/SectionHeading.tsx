"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

type Props = {
  index: string;
  kicker: string;
  title: string;
  outline?: boolean;
};

export default function SectionHeading({ index, kicker, title, outline }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heading = rootRef.current?.querySelector("h2");
      if (!heading) return;

      document.fonts.ready.then(() => {
        const split = SplitText.create(heading, {
          type: "chars,lines",
          mask: "lines",
          charsClass: "will-change-transform",
        });
        gsap.from(split.chars, {
          yPercent: 110,
          stagger: 0.02,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.from(".heading-meta", {
        autoAlpha: 0,
        y: 14,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="mb-14 md:mb-20">
      <div className="heading-meta mono-label mb-5 flex items-center gap-3 text-dim">
        <span className="text-acid">/{index}</span>
        <span className="h-px w-10 bg-line" />
        <span>{kicker}</span>
      </div>
      <h2
        className={`display-type text-[clamp(2.6rem,7.5vw,6.5rem)] ${
          outline ? "display-outline" : "text-bone"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
