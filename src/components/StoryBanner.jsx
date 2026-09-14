import "./StoryBanner.css";
import storybannerImg from "../assets/Images/Depth6,Frame6.jpg";

export default function StoryBanner() {
  return (
    <section className="story-banner">
      <div className="container">
        <img
          className="story-banner-img"
          src={storybannerImg}
          alt="Two team members shaking hands"
        />
      </div>
    </section>
  );
}