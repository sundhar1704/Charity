import "./WaysToHelp.css";

const ways = [
  { icon: "🎓", title: "Education Support", variant: "blue" },
  { icon: "🩺", title: "Medical Assistance", variant: "green" },
  { icon: "🚚", title: "Food Distribution", variant: "orange" },
  { icon: "📅", title: "Event Coordination", variant: "purple" },
  { icon: "🌐", title: "Online / Remote Volunteering", variant: "cyan" },
];

export default function WaysToHelp() {
  return (
    <section className="ways-to-help">
      <div className="container">
        <h2>Ways You Can Help</h2>

        <div className="ways-grid">
          {ways.map((way) => (
            <div className={`way-card way-${way.variant}`} key={way.title}>
              <span className="way-icon">{way.icon}</span>
              <span className="way-title">{way.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}