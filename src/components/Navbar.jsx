import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-logo">
          <span className="navbar-logo-icon">⛃</span>
          <span>HopeHands Foundation</span>
        </div>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/causes">Causes</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <Link to="/donate" className="btn btn-primary navbar-cta">
          Donate Now
        </Link>
      </div>
    </header>
  );
}