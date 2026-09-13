import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHeader from "../components/ContactHeader";
import ContactMap from "../components/Contactmap";
import SupportTrust from "../components/Supporttrust";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactHeader />
      <ContactMap />
      <SupportTrust />
      <Footer />
    </>
  );
}