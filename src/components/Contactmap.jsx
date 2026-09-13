import "./Contactmap.css";

export default function ContactMap() {
  return (
    <section className="contact-map">
      <div className="container">
        <iframe
          className="contact-map-frame"
          title="HopeHands Foundation location - Chennai, India"
          src="https://www.google.com/maps?q=Chennai,India&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}