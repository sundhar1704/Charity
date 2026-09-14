import "./Causes.css";
import EducationImg from "../assets/images/Depth7,Frame1.jpg";
import MedicalImg from "../assets/images/Depth7,Frame3.jpg";
import FoodImg from "../assets/images/Depth7,Frame2.jpg";
import DisasterImg from "../assets/images/Depth7,Frame0.jpg";
const causes = [
  {
    title: "Education for Children",
    text: "Providing quality education and resources to underprivileged children, ensuring they have the opportunity to succeed.",
    img: EducationImg,
  },
  {
    title: "Medical Support",
    text: "Offering medical assistance and healthcare support to those in need, ensuring access to essential medical services.",
    img: MedicalImg,
  },
  {
    title: "Food & Shelter",
    text: "Providing food, shelter, and basic necessities to individuals and families facing hardship and homelessness.",
    img: FoodImg,
  },
  {
    title: "Disaster Relief",
    text: "Responding swiftly to natural disasters and providing immediate relief and long-term support to affected communities.",
    img: DisasterImg,
  },
];

export default function Causes() {
  return (
    <section className="causes" id="causes">
      <div className="container">
        <h2 className="section-title">Our Causes</h2>

        <div className="causes-grid">
          {causes.map((cause) => (
            <div className="cause-card" key={cause.title}>
              <img className="cause-card-img" src={cause.img} alt={cause.title} />
              <h3>{cause.title}</h3>
              <p>{cause.text}</p>
            </div>
          ))}
        </div>

        <div className="causes-actions">
          <button className="btn btn-primary causes-btn-donate">Donate</button>
          <button className="btn btn-secondary causes-btn-learn">``
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}