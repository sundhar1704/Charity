import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-inner">
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/causes">Our Programs</Link>
          <Link to="/volunteer">Volunteer</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-socials">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Twitter">t</a>
          <a href="#" aria-label="Instagram">ig</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>

        <p className="footer-copy">
          © 2024 HopeHands Foundation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}