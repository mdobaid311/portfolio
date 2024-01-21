import { useState } from "react";
import LandingPage from "./Containers/LandingPage";
import IntroLoader from "./Components/IntroLoader/IntroLoader";
import ParticlesContainer from "./Common/ParticlesContainer";
import "./App.scss";

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <>
          <ParticlesContainer background="#ffffff" color="#0e0e0e" />
          <IntroLoader setLoading={setLoading} />
        </>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default App;
