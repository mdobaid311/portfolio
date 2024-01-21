import ParticlesContainer from "../../Common/ParticlesContainer";
import "./Hero.scss";
import logo from "../../assets/logo-illustrator.svg";
import { motion } from "framer-motion";
import Spotlight from "../SpotlightTitle/Spotlight";

const Hero = () => {
  return (
    <section id="hero">
      <div className="hero-background">
        <ParticlesContainer background="#0e0e0e" color="#ffffff" />
      </div>
      <header>
        <a href="/">
          <img src={logo} alt="logo-illustrator" />
        </a>
        <nav>
          <ul>
            <li>
              <a href="#">Work</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Skills</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Spotlight text="Mohammed Obaid" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Coming Soon
        </motion.h3>
        <ul className="social-links">
          {["FB", "IG", "LI", "X", "YT"].map((link) => {
            return (
              <motion.li
                key={link}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
              >
                <a href="#">{link}</a>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <svg
        width="40"
        height="56"
        viewBox="0 0 40 56"
        fill="none"
        id="scroll-icon"
      >
        <rect x="0.5" y="0.5" width="39" height="55" rx="19.5" stroke="white" />
        <path
          d="M20 37V19M24 33L20 37L24 33ZM20 37L16 33L20 37Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </section>
  );
};

export default Hero;
