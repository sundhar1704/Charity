import "./Values.css";

const values = [
  {
    icon: "🤝",
    title: "Compassion",
    text: "We approach our work with empathy and understanding, recognizing the inherent dignity of every person.",
  },
  {
    icon: "🧑‍🤝‍🧑",
    title: "Collaboration",
    text: "We believe in the power of partnerships and collective action to achieve lasting change.",
  },
  {
    icon: "🛡️",
    title: "Integrity",
    text: "We uphold the highest standards of honesty and ethical conduct in all our endeavors.",
  },
];

export default function Values() {
  return (
    <section className="values">
      <div className="container">
        <h2 className="section-title">Our Values</h2>

        <div className="values-grid">
          {values.map((value) => (
            <div className="value-card" key={value.title}>
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}