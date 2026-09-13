import Navbar from "../components/Navbar";
import AboutHero from "../components/Abouthero";
import StoryBanner from "../components/Storybanner";
import VisionMission from "../components/Visionmission";
import Values from "../components/Values";
import Team from "../components/Team";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <StoryBanner />
      <VisionMission />
      <Values />
      <Team />
      <Footer />
    </>
  );
}