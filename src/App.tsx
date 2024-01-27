import { useEffect, useState } from "react";
import LandingPage from "./Containers/LandingPage/LandingPage";
import IntroLoader from "./Components/IntroLoader/IntroLoader";
import ParticlesContainer from "./Common/ParticlesContainer";
import "./App.scss";
import Skills from "./Containers/Skills/Skills";
import Lenis from "@studio-freight/lenis";
import logo from "./assets/logo-illustrator.svg";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e:any) => {
      console.log(e);
    });

    function raf(time:any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div>
      {loading ? (
        <>
          <ParticlesContainer background="#ffffff" color="#0e0e0e" />
          <IntroLoader setLoading={setLoading} />
        </>
      ) : (
        <>
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
          <LandingPage />
          <Skills />
        </>
      )}
    </div>
  );
};

export default App;
