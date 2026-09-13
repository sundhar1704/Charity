import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonateHeader from "../components/DonateHeader";
import DonateForm from "../components/DonateForm";
import DonationThankYou from "../components/DonationThankYou";

export default function DonatePage() {
  const [donationComplete, setDonationComplete] = useState(false);

  return (
    <>
      <Navbar />

      {donationComplete ? (
        <DonationThankYou />
      ) : (
        <>
          <DonateHeader />
          <DonateForm onSuccess={() => setDonationComplete(true)} />
        </>
      )}

      <Footer />
    </>
  );
}