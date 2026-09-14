import { useState } from "react";
import { Link } from "react-router-dom";
import "./DonationThankYou.css";

import thankYouHeroImg from "../assets/images/Depth6,Frame11.jpg";

// Replace these three with your own linked images per card
import educationImpactImg from "../assets/images/Depth7,Frame6.jpg";
import mealsImpactImg from "../assets/images/Depth7,Frame7.jpg";
import healthcareImpactImg from "../assets/images/Depth7,Frame8.jpg";

const impactItems = [
  {
    title: "Educated a child for a month",
    text: "Your contribution ensures a child receives quality education for an entire month.",
    img: educationImpactImg,
  },
  {
    title: "Provided meals for families",
    text: "Your donation helps provide nutritious meals to families in need.",
    img: mealsImpactImg,
  },
  {
    title: "Supported basic healthcare",
    text: "Your support aids in delivering essential healthcare services to those without access.",
    img: healthcareImpactImg,
  },
];

export default function DonationThankYou() {
  const [emailUpdates, setEmailUpdates] = useState(false);

  return (
    <section className="thank-you">
      <div className="container">
        <img
          className="thank-you-hero"
          src={thankYouHeroImg}
          alt="Two children smiling"
        />

        <h1 className="thank-you-title">Thank You for Making a Difference ❤️</h1>
        <p className="thank-you-subtitle">
          Your kindness has brought hope, care, and support to those who need
          it the most.
        </p>

        <h2>Your Impact</h2>
        <p className="thank-you-impact-text">
          Your generous donation will directly support our mission to provide
          essential resources and opportunities to underserved communities.
          It will help us deliver critical services, empower individuals, and
          foster sustainable change.
        </p>

        <div className="impact-grid">
          {impactItems.map((item) => (
            <div className="impact-item" key={item.title}>
              <img className="impact-item-img" src={item.img} alt={item.title} />
              <p className="impact-item-title">{item.title}</p>
              <p className="impact-item-text">{item.text}</p>
            </div>
          ))}
        </div>

        <h2>Your Support Can Go Even Further</h2>

        <div className="thank-you-actions">
          <button className="btn-thank-you btn-thank-you-solid">
            Donate Again
          </button>
          <button className="btn-thank-you btn-thank-you-outline">
            Share This Cause
          </button>
        </div>

        <p className="thank-you-followup">
          Consider making a recurring donation to ensure continuous support
          for our programs. Share our cause with your friends and family to
          help us reach more people.
        </p>

        <h3>Stay Connected</h3>

        <label className="email-updates-row">
          <span>Receive email updates</span>
          <input
            type="checkbox"
            checked={emailUpdates}
            onChange={(e) => setEmailUpdates(e.target.checked)}
          />
        </label>

        <div className="thank-you-volunteer">
          <Link to="/volunteer" className="btn-thank-you btn-thank-you-outline">
            Become a Volunteer
          </Link>
        </div>

        <p className="thank-you-closing">
          From all of us at HopeHands Foundation — thank you for believing in
          humanity.
        </p>
      </div>
    </section>
  );
}