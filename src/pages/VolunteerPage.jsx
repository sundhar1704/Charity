import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VolunteerHero from "../components/VolunteerHero";
import VolunteerIntro from "../components/VolunteerIntro";
import VolunteerPhoto from "../components/VolunteerPhoto";
import WaysToHelp from "../components/WaysToHelp";
import VolunteerForm from "../components/VolunteerForm";

export default function VolunteerPage() {
  return (
    <>
      <Navbar />
      <VolunteerHero />
      <VolunteerIntro />
      <VolunteerPhoto />
      <WaysToHelp />
      <VolunteerForm />
      <Footer />
    </>
  );
}
