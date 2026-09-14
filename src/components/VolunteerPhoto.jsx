import "./VolunteerPhoto.css";

// Replace src with your linked photo
import volunteerPhotoImg from "../assets/images/Depth5,Frame2.jpg";

export default function VolunteerPhoto() {
  return (
    <section className="volunteer-photo">
      <div className="container">
        <img
          className="volunteer-photo-img"
          src={volunteerPhotoImg}
          alt="Volunteer team wearing HopeHands lanyards"
        />
      </div>
    </section>
  );
}