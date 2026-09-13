import "./ContactHeader.css";

const contactInfo = [
  { icon: "✉️", text: "support@hopehands.org" },
  { icon: "📞", text: "+91 98765 43210" },
  { icon: "📍", text: "Chennai, India" },
];

export default function ContactHeader() {
  return (
    <section className="contact-header">
      <div className="container">
        <h1 className="section-title">Get in Touch With Us</h1>

        <div className="contact-info-grid">
          {contactInfo.map((item) => (
            <div className="contact-info-card" key={item.text}>
              <span className="contact-info-icon">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}