import { useState } from "react";
import Dropdown from "./Dropdown";
import "./DonateForm.css";

const presetAmounts = ["500", "1000", "2000"];

const causeOptions = [
  "Healthcare for Children",
  "Education for All",
  "Poverty Relief",
  "Environmental Sustainability",
];

const STORAGE_KEY = "hopehands-donations";

export default function DonateForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [cause, setCause] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "done"

  const finalAmount = selectedAmount === "custom" ? customAmount : selectedAmount;
  const locked = status !== "idle";

  function handleAmountClick(amount) {
    if (locked) return;
    setSelectedAmount(amount);
    if (amount !== "custom") {
      setCustomAmount("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !finalAmount || !cause) {
      alert("Please fill in your name, email, an amount, and a cause.");
      return;
    }

    setStatus("loading");

    setTimeout(() => {
      const entry = {
        name,
        email,
        address,
        amount: finalAmount,
        cause,
        donatedAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        existing.push(entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      } catch (err) {
        console.error("Could not save to localStorage:", err);
      }

      setStatus("done");
      onSuccess?.({ name, amount: finalAmount, cause });
    }, 900);
  }

  return (
    <section className="donate-form-section">
      <div className="container">
        <form className="donate-form" onSubmit={handleSubmit}>
          <div className="donate-form-left">
            <h2>Donor Information</h2>

            <input
              type="text"
              placeholder="Name"
              className="donate-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={locked}
            />
            <input
              type="email"
              placeholder="Email"
              className="donate-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={locked}
            />
            <input
              type="text"
              placeholder="Address"
              className="donate-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={locked}
            />

            <h2>Select Donation Amount</h2>

            <div className="amount-grid">
              {presetAmounts.map((amount) => (
                <button
                  type="button"
                  key={amount}
                  className={
                    "amount-btn" +
                    (selectedAmount === amount ? " amount-btn-active" : "")
                  }
                  onClick={() => handleAmountClick(amount)}
                  disabled={locked}
                >
                  ₹{amount}
                </button>
              ))}
              <button
                type="button"
                className={
                  "amount-btn" +
                  (selectedAmount === "custom" ? " amount-btn-active" : "")
                }
                onClick={() => handleAmountClick("custom")}
                disabled={locked}
              >
                Custom
              </button>
            </div>

            {selectedAmount === "custom" && (
              <input
                type="number"
                placeholder="Enter custom amount"
                className="donate-input"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                min="1"
                disabled={locked}
              />
            )}

            <div className="donate-cause-wrapper">
              <Dropdown
                options={causeOptions}
                value={cause}
                onChange={setCause}
                placeholder="Select a Cause"
                disabled={locked}
              />
            </div>
          </div>

          <div className="donate-form-right">
            <button
              type="submit"
              className={
                "btn btn-primary donate-submit" +
                (status === "done" ? " donate-submit-done" : "")
              }
              disabled={locked}
            >
              {status === "idle" && "Donate Securely"}
              {status === "loading" && "Processing..."}
              {status === "done" && "Donated!"}
            </button>
            <p className="donate-note">
              Your donation is safe with us. We use secure payment processing.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}