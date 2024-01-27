import Hero from "../../Components/Hero/Hero";
import "./LandingPage.scss";

const LandingPage = () => {
  return (
    <section className="landing-page-container">
      <div className="reveal-animator"></div>
      <div className="main-container">
        <Hero />
      </div>
    </section>
  );
};

export default LandingPage;
