import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleAvatarClick() {
    if (isLoggedIn) {
      setMenuOpen(!menuOpen);
    } else {
      navigate("/login", { state: { from: location.pathname } });
    }
  }

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

        <div className="navbar-right">
          <Link to="/donate" className="btn btn-primary navbar-cta">
            Donate Now
          </Link>

          <div className="nav-profile">
            <button
              className={"nav-avatar" + (isLoggedIn ? " nav-avatar-in" : "")}
              onClick={handleAvatarClick}
              title={isLoggedIn ? user.name : "Login"}
            >
              {isLoggedIn ? user.name.charAt(0).toUpperCase() : "👤"}
            </button>

            {isLoggedIn && menuOpen && (
              <div className="nav-menu">
                <p className="nav-menu-name">{user.name}</p>
                <p className="nav-menu-email">{user.email}</p>
                <button
                  className="nav-logout"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}