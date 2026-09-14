import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CausesHeader from "../components/CausesHeader";
import CauseRow from "../components/CauseRow";

// Replace each import with your own linked image for that cause
import HealthcareImg from "../assets/images/Depth6,Frame7.jpg";
import EducationImg from "../assets/images/Depth6,Frame8.jpg";
import PovertyImg from "../assets/images/Depth6,Frame9.jpg";
import EnvironmentImg from "../assets/images/Depth6,Frame10.jpg";

const causesData = [
  {
    img: HealthcareImg,
    title: "Healthcare for Children",
    paragraphs: [
      "Many children lack access to basic healthcare, leading to preventable diseases and suffering. We aim to bridge this gap by providing comprehensive medical support.",
      "Your donation will help provide essential medical care, including surgeries, treatments, and rehabilitation, to children suffering from critical illnesses.",
    ],
  },
  {
    img: EducationImg,
    title: "Education for All",
    paragraphs: [
      "Education is a fundamental right, yet many children are deprived of it due to poverty. We strive to provide quality education and resources to these children.",
      "Your support will fund educational programs, school supplies, and mentorship opportunities for underprivileged children, helping them achieve their full potential.",
    ],
  },
  {
    img: PovertyImg,
    title: "Poverty Relief",
    paragraphs: [
      "Poverty affects millions, leading to hunger, homelessness, and lack of basic necessities. We work to alleviate poverty by providing essential resources and support.",
      "Your contribution will help us provide nutritious meals, clean water, and safe shelter to families struggling with poverty, ensuring their basic needs are met.",
    ],
  },
  {
    img: EnvironmentImg,
    title: "Environmental Sustainability",
    paragraphs: [
      "Protecting our planet is crucial for future generations. We focus on environmental conservation and sustainability to ensure a healthy world for all.",
      "Your donation will support our efforts to protect the environment, promote sustainable practices, and raise awareness about climate change.",
    ],
  },
];

export default function CausesPage() {
  return (
    <>
      <Navbar />
      <CausesHeader />

      <section className="causes-list">
        <div className="container">
          {causesData.map((cause) => (
            <CauseRow
              key={cause.title}
              img={cause.img}
              title={cause.title}
              paragraphs={cause.paragraphs}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}