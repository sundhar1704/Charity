import "./Supporttrust.css";

const badges = [
  { icon: "🛡️", text: "Trusted by Volunteers", variant: "green" },
  { icon: "👥", text: "Community Support", variant: "blue" },
  { icon: "❤️", text: "Making a Difference", variant: "red" },
];

export default function SupportTrust() {
  return (
    <section className="support-trust">
      <div className="container">
        <h2>Support &amp; Trust</h2>
        <p>
          We believe in transparency, trust, and people-powered change. Every
          volunteer helps us move closer to a better future.
        </p>

        <div className="badge-grid">
          {badges.map((badge) => (
            <div className={`badge badge-${badge.variant}`} key={badge.text}>
              <span className="badge-icon">{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}