import "./Impact.css";

const stats = [
  { label: "Lives Helped", value: "10,000+" },
  { label: "Volunteers", value: "500+" },
  { label: "Projects Completed", value: "120+" },
];

export default function Impact() {
  return (
    <section className="impact">
      <div className="container">
        <h2 className="section-title">Impact Section</h2>
        <div className="impact-grid">
          {stats.map((stat) => (
            <div className="impact-card" key={stat.label}>
              <p className="impact-label">{stat.label}</p>
              <p className="impact-value">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}