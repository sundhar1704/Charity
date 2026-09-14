import "./VolunteerHero.css";

// Replace src with your linked illustration
import volunteerHeroImg from "../assets/Images/Depth4,Frame0.jpg";

export default function VolunteerHero() {
  return (
    <section className="volunteer-hero">
      <div className="container">
        <div className="volunteer-hero-banner">
          <img
            className="volunteer-hero-img"
            src={volunteerHeroImg}
            alt="Volunteers with a child"
          />
          <div className="volunteer-hero-overlay">
            <h1>Be the Change. Become a Volunteer.</h1>
            <p>
              Your time, skills, and compassion can bring real change to
              lives that need support.
            </p>
            <a href="#volunteer-form" className="btn btn-primary volunteer-hero-btn">
              Join as a Volunteer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}