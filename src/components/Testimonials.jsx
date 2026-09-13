import "./Testimonials.css";
import SophiaImg from "../assets/images/Depth 7, Frame 4.jpg";
import EthanImg from "../assets/images/Depth 7, Frame 5.jpg";
import OliviaImg from "../assets/images/Depth 8, Frame 0.jpg";

const testimonials = [
  {
    name: "Sophia Carter",
    date: "2023-08-15",
    text: "HopeHands Foundation has truly made a difference in my life. Their support helped me get back on my feet during a difficult time.",
    likes: 12,
    dislikes: 2,
    img: SophiaImg,
  },
  {
    name: "Ethan Bennett",
    date: "2023-07-22",
    text: "Volunteering with HopeHands has been an incredibly rewarding experience. Seeing the impact we make is truly inspiring.",
    likes: 15,
    dislikes: 1,
    img: EthanImg,
  },
  {
    name: "Olivia Hayes",
    date: "2023-06-10",
    text: "The dedication and compassion of HopeHands Foundation are unmatched. They are a beacon of hope for so many.",
    likes: 10,
    dislikes: 3,
    img: OliviaImg,
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">Stories / Testimonials</h2>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-header">
                <img className="testimonial-avatar" src={t.img} alt={t.name} />
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-date">{t.date}</p>
                </div>
              </div>

              <p className="testimonial-stars">★★★★★</p>
              <p className="testimonial-text">"{t.text}"</p>

              <div className="testimonial-footer">
                <span>👍 {t.likes}</span>
                <span>👎 {t.dislikes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}