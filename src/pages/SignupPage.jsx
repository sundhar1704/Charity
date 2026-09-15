import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { findUser, saveUser } from "../utils/authStorage";
import "./AuthPages.css";

// 8+ chars, 1 capital, 1 small, 1 special
function checkPassword(p) {
  if (p.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(p)) return "Password needs at least 1 capital letter.";
  if (!/[a-z]/.test(p)) return "Password needs at least 1 small letter.";
  if (!/[^A-Za-z0-9]/.test(p))
    return "Password needs at least 1 special character (! @ # $ ...).";
  return "";
}

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [form, setForm] = useState({
    name: "",
    age: "",
    dob: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "", form: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = {};

    if (form.name.trim().length < 2) err.name = "Please enter your full name.";

    const age = Number(form.age);
    if (!form.age) err.age = "Please enter your age.";
    else if (isNaN(age) || age < 12 || age > 100)
      err.age = "Age must be between 12 and 100.";

    if (!form.dob) err.dob = "Please choose your date of birth.";
    else if (new Date(form.dob) > new Date())
      err.dob = "Date of birth cannot be in the future.";

    if (!form.email.includes("@")) err.email = "Email must contain @.";
    else if (findUser(form.email))
      err.email = "This email already has an account.";

    const pwErr = checkPassword(form.password);
    if (pwErr) err.password = pwErr;

    if (form.confirm !== form.password) err.confirm = "Passwords do not match.";

    if (Object.keys(err).length) return setErrors(err);

    const newUser = {
      name: form.name.trim(),
      age,
      dob: form.dob,
      email: form.email.trim().toLowerCase(),
      password: form.password,
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);
    login(newUser);
    navigate(from, { replace: true });
  }

  return (
    <>
      <Navbar />
      <section className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">Create Your Account</h1>
          <p className="auth-sub">Fill your details to join HopeHands Foundation.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <input
                type="text"
                className="auth-input"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
              {errors.name && <span className="auth-error">{errors.name}</span>}
            </div>

            <div className="auth-row">
              <div className="auth-field">
                <input
                  type="number"
                  className="auth-input"
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                />
                {errors.age && <span className="auth-error">{errors.age}</span>}
              </div>

              <div className="auth-field">
                <input
                  type="date"
                  className="auth-input"
                  value={form.dob}
                  onChange={(e) => update("dob", e.target.value)}
                />
                {errors.dob && <span className="auth-error">{errors.dob}</span>}
              </div>
            </div>

            <div className="auth-field">
              <input
                type="text"
                className="auth-input"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
              {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>

            <div className="auth-field">
              <input
                type="password"
                className="auth-input"
                placeholder="Password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
              />
              {errors.password && (
                <span className="auth-error">{errors.password}</span>
              )}
            </div>

            <div className="auth-field">
              <input
                type="password"
                className="auth-input"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={(e) => update("confirm", e.target.value)}
              />
              {errors.confirm && (
                <span className="auth-error">{errors.confirm}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary auth-submit">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link className="auth-link" to="/login" state={{ from }}>
              Login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}