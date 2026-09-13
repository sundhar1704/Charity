import { useState } from "react";
import Dropdown from "./Dropdown";
import "./VolunteerForm.css";

const interestOptions = [
  "Healthcare for children",
  "Education for All",
  "Poverty Relief",
  "Environmental regrowth",
];

const availabilityOptions = ["Weekdays", "Weekends", "Evenings", "Flexible"];

const STORAGE_KEY = "hopehands-volunteers";

export default function VolunteerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [availability, setAvailability] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "done"

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !interest || !availability) {
      alert("Please fill in your name, email, area of interest, and availability.");
      return;
    }

    setStatus("loading");

    setTimeout(() => {
      const entry = {
        name,
        email,
        phone,
        interest,
        availability,
        submittedAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        existing.push(entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      } catch (err) {
        console.error("Could not save to localStorage:", err);
      }

      setStatus("done");
    }, 700);
  }

  const locked = status !== "idle";

  return (
    <section className="volunteer-form-section" id="volunteer-form">
      <div className="container">
        <h2>Join Our Volunteer Community</h2>

        <form className="volunteer-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="volunteer-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={locked}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="volunteer-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={locked}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="volunteer-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={locked}
          />

          <Dropdown
            options={interestOptions}
            value={interest}
            onChange={setInterest}
            placeholder="Area of Interest"
            disabled={locked}
          />

          <Dropdown
            options={availabilityOptions}
            value={availability}
            onChange={setAvailability}
            placeholder="Availability"
            disabled={locked}
          />

          <button
            type="submit"
            className={
              "btn btn-primary volunteer-submit" +
              (status === "done" ? " volunteer-submit-done" : "")
            }
            disabled={locked}
          >
            {status === "idle" && "Become a Volunteer"}
            {status === "loading" && "Submitting..."}
            {status === "done" && "You Added Our Team"}
          </button>

          <p className="volunteer-note">
            We respect your time and privacy. Our team will contact you soon.
          </p>
        </form>
      </div>
    </section>
  );
}