import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Mission from "../components/Mission";
import Causes from "../components/Causes";
import Impact from "../components/Impact";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Mission />
      <Causes />
      <Impact />
      <Testimonials />
      <Footer />
    </>
  );
}