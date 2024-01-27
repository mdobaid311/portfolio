import gsap from "gsap";
import throttle from "lodash.throttle";
import { useEffect } from "react";
import "./Spotlight.scss";
import { motion } from "framer-motion";

interface IProps {
  text: string;
}

const Spotlight = ({ text }: IProps) => {
  useEffect(() => {
    const hero = document.querySelector("[data-hero]");

    const onMouseMove = (e: any) => {
      const { clientX, clientY } = e;
      const x = Math.round((clientX / window.innerWidth) * 100);
      const y = Math.round((clientY / window.innerHeight) * 100);

      gsap.to(hero, {
        "--x": `${x}%`,
        "--y": `${y}%`,
        duration: 0.3,
        ease: "sine.out",
      });
    };

    gsap.set(".hero--primary .char", {
      opacity: 0,
      y: 25,
    });

    const tl = gsap.timeline();

    tl.to(".hero--primary .char", {
      opacity: 1,
      y: 0,
    })
      .to(hero, {
        "--maskSize1": "20%",
        ease: "back.out(2)",
      })
      .then(() => {
        window.addEventListener("mousemove", throttle(onMouseMove, 30));
      });
  }, []);
  return (
    <div
      className="wrapper"
      onMouseLeave={() => {
        gsap.to("[data-hero]", {
          "--maskSize1": "0%",
          ease: "back.out(2)",
        });
      }}
      onMouseEnter={() => {
        gsap.to("[data-hero]", {
          "--maskSize1": "20%",
          ease: "back.out(2)",
        });
      }}
    >
      <div className="hero hero--primary">
        <div className="container">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{delay:.5, duration: 1.5 }}
            className="hero__heading"
            data-splitting
          >
            {text}
          </motion.h1>
        </div>
      </div>

      <div className="hero hero--secondary" aria-hidden="true" data-hero>
        <div className="container">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{delay:.5, duration: 1.5 }}
            className="hero__heading"
            data-splitting
          >
            {text}
          </motion.h1>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
