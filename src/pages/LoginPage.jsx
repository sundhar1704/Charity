import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { findUser } from "../utils/authStorage";
import "./AuthPages.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // where to go back after login (default: home)
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};

    if (!email.includes("@")) err.email = "Email must contain @.";
    if (!password) err.password = "Please enter your password.";
    if (Object.keys(err).length) return setErrors(err);

    const user = findUser(email);
    if (!user || user.password !== password) {
      return setErrors({ form: "Wrong email or password." });
    }

    login(user);
    navigate(from, { replace: true });
  }

  return (
    <>
      <Navbar />
      <section className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-sub">Login to continue with HopeHands Foundation.</p>

          {errors.form && <p className="auth-error auth-error-top">{errors.form}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <input
                type="text"
                className="auth-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({});
                }}
              />
              {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>

            <div className="auth-field">
              <input
                type="password"
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({});
                }}
              />
              {errors.password && (
                <span className="auth-error">{errors.password}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary auth-submit">
              Login
            </button>
          </form>

          <p className="auth-switch">
            New here?{" "}
            <Link className="auth-link" to="/signup" state={{ from }}>
              Create Account
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}