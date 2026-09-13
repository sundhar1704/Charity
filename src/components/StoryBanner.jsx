import "./StoryBanner.css";
import storybannerImg from "../assets/images/Depth 6, Frame 6.jpg";

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