import { Link } from "react-router-dom";
import "./hero.css";
import heroImg from "../assets/images/Depth 6, Frame 5.jpg";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <img className="hero-bg" src={heroImg} alt="Volunteers and children illustration" />

      <div className="hero-overlay">
        <div className="container hero-content">
          <h1>Together, We Can Change Lives</h1>
          <p>
            Your kindness today can bring hope, health, and happiness to
            someone in need.
          </p>
          <div className="hero-actions">
            <Link to="/donate" className="btn btn-primary hero-btn-primary">
              Donate Now
            </Link>
            <Link to="/volunteer" className="btn btn-secondary hero-btn-secondary">
              Become a Volunteer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}