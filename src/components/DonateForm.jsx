import { useState } from "react";
import { jsPDF } from "jspdf";
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

  const [paymentMethod, setPaymentMethod] = useState("");

  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [upiId, setUpiId] = useState("");

  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [status, setStatus] = useState("idle");

  const [donationHistory, setDonationHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const finalAmount =
    selectedAmount === "custom" ? customAmount : selectedAmount;

  const locked = status !== "idle";

  function handleAmountClick(amount) {
    if (locked) return;

    setSelectedAmount(amount);

    if (amount !== "custom") {
      setCustomAmount("");
    }

    setError("");
  }

  function handleCardNumberChange(e) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(value);
    setError("");
  }

  function handleCvvChange(e) {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(value);
    setError("");
  }

  function handleExpiryChange(e) {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setExpiryDate(value);
    setError("");
  }

  function validateExpiryDate() {
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return false;
    }

    const [month, year] = expiryDate.split("/").map(Number);

    if (month < 1 || month > 12) {
      return false;
    }

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (year < currentYear) {
      return false;
    }

    if (year === currentYear && month < currentMonth) {
      return false;
    }

    return true;
  }

  function validatePayment() {
    if (!name.trim() || !email.trim() || !finalAmount || !cause) {
      setError(
        "Please fill in your name, email, an amount, and a cause."
      );
      return false;
    }

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return false;
    }

    if (paymentMethod === "card") {
      if (!cardHolder.trim()) {
        setError("Please enter the card holder name.");
        return false;
      }

      if (!/^[A-Za-z\s.'-]+$/.test(cardHolder.trim())) {
        setError("Please enter a valid card holder name.");
        return false;
      }

      if (cardNumber.length !== 16) {
        setError("Card number must contain exactly 16 digits.");
        return false;
      }

      if (!validateExpiryDate()) {
        setError("Please enter a valid expiry date in MM/YY format.");
        return false;
      }

      if (cvv.length !== 3) {
        setError("CVV must contain exactly 3 digits.");
        return false;
      }
    }

    if (paymentMethod === "upi") {
      const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;

      if (!upiId.trim()) {
        setError("Please enter your UPI ID.");
        return false;
      }

      if (!upiPattern.test(upiId.trim())) {
        setError(
          "Please enter a valid UPI ID, for example name@upi."
        );
        return false;
      }
    }

    setError("");
    return true;
  }

  // Create receipt PDF
  function downloadReceipt(donation) {
    const pdf = new jsPDF();

    const receiptId =
      donation.receiptId || "HH-" + Date.now();

    pdf.setFontSize(22);
    pdf.setFont("helvetica", "bold");
    pdf.text("HopeHands Foundation", 105, 25, {
      align: "center",
    });

    pdf.setFontSize(16);
    pdf.text("Donation Receipt", 105, 38, {
      align: "center",
    });

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    pdf.line(20, 45, 190, 45);

    pdf.text(`Receipt ID: ${receiptId}`, 20, 58);

    pdf.text(
      `Date: ${new Date(donation.donatedAt).toLocaleString()}`,
      20,
      68
    );

    pdf.setFont("helvetica", "bold");
    pdf.text("Donor Information", 20, 85);

    pdf.setFont("helvetica", "normal");

    pdf.text(`Name: ${donation.name}`, 20, 97);
    pdf.text(`Email: ${donation.email}`, 20, 107);

    const addressText = donation.address || "Not provided";

    pdf.text(`Address: ${addressText}`, 20, 117);

    pdf.setFont("helvetica", "bold");
    pdf.text("Donation Details", 20, 137);

    pdf.setFont("helvetica", "normal");

    pdf.text(`Amount: Rs.${donation.amount}`, 20, 149);
    pdf.text(`Cause: ${donation.cause}`, 20, 159);

    pdf.text(
      `Payment Method: ${donation.paymentMethod === "card" ? "Card" : "UPI"}`,
      20,
      169
    );

    if (donation.paymentMethod === "card") {
      pdf.text(
        `Card Holder: ${donation.cardHolder}`,
        20,
        179
      );

      pdf.text(
        `Card Number: **** **** **** ${donation.cardLast4}`,
        20,
        189
      );
    }

    if (donation.paymentMethod === "upi") {
      pdf.text(
        `UPI ID: ${donation.upiId}`,
        20,
        179
      );
    }

    pdf.line(20, 205, 190, 205);

    pdf.setFont("helvetica", "bold");
    pdf.text(
      "Thank you for making a difference!",
      105,
      220,
      { align: "center" }
    );

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    pdf.text(
      "Your generous donation helps us support communities in need.",
      105,
      230,
      { align: "center" }
    );

    pdf.save(`HopeHands-Receipt-${receiptId}.pdf`);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validatePayment()) {
      return;
    }

    setStatus("loading");

    setTimeout(() => {
      const receiptId =
        "HH-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(100000 + Math.random() * 900000);

      const entry = {
        receiptId,
        name,
        email,
        address,
        amount: finalAmount,
        cause,
        paymentMethod,

        // Store only safe card information
        cardHolder:
          paymentMethod === "card" ? cardHolder : "",
        cardLast4:
          paymentMethod === "card"
            ? cardNumber.slice(-4)
            : "",

        // UPI ID can be stored for receipt/history
        upiId:
          paymentMethod === "upi" ? upiId : "",

        donatedAt: new Date().toISOString(),
      };

      try {
        const existing = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "[]"
        );

        existing.push(entry);

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(existing)
        );

        setDonationHistory(existing);

        // Automatically download receipt
        downloadReceipt(entry);
      } catch (err) {
        console.error(
          "Could not save donation:",
          err
        );
      }

      setStatus("done");
      setPaymentSuccess(true);

      setTimeout(() => {
        onSuccess?.({
          name,
          amount: finalAmount,
          cause,
        });
      }, 1500);
    }, 1200);
  }

  // Delete one donation
  function deleteDonation(receiptId) {
    const updatedHistory = donationHistory.filter(
      (donation) => donation.receiptId !== receiptId
    );

    setDonationHistory(updatedHistory);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );
  }

  // Delete all donations
  function deleteAllHistory() {
    if (donationHistory.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all donation history?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    setDonationHistory([]);
  }

  return (
    <section className="donate-form-section">
      <div className="container">
        <form
          className="donate-form"
          onSubmit={handleSubmit}
        >
          <div className="donate-form-left">
            <h2>Donor Information</h2>

            <input
              type="text"
              placeholder="Name"
              className="donate-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              disabled={locked}
            />

            <input
              type="email"
              placeholder="Email"
              className="donate-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={locked}
            />

            <input
              type="text"
              placeholder="Address"
              className="donate-input"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setError("");
              }}
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
                    (selectedAmount === amount
                      ? " amount-btn-active"
                      : "")
                  }
                  onClick={() =>
                    handleAmountClick(amount)
                  }
                  disabled={locked}
                >
                  ₹{amount}
                </button>
              ))}

              <button
                type="button"
                className={
                  "amount-btn" +
                  (selectedAmount === "custom"
                    ? " amount-btn-active"
                    : "")
                }
                onClick={() =>
                  handleAmountClick("custom")
                }
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
                onChange={(e) =>
                  setCustomAmount(e.target.value)
                }
                min="1"
                disabled={locked}
              />
            )}

            <div className="donate-cause-wrapper">
              <Dropdown
                options={causeOptions}
                value={cause}
                onChange={(value) => {
                  setCause(value);
                  setError("");
                }}
                placeholder="Select a Cause"
                disabled={locked}
              />
            </div>

            <h2>Payment Method</h2>

            <div className="payment-method-grid">
              <button
                type="button"
                className={
                  "payment-method-btn" +
                  (paymentMethod === "card"
                    ? " payment-method-active"
                    : "")
                }
                onClick={() => {
                  setPaymentMethod("card");
                  setError("");
                }}
                disabled={locked}
              >
                💳 Card
              </button>

              <button
                type="button"
                className={
                  "payment-method-btn" +
                  (paymentMethod === "upi"
                    ? " payment-method-active"
                    : "")
                }
                onClick={() => {
                  setPaymentMethod("upi");
                  setError("");
                }}
                disabled={locked}
              >
                📱 UPI
              </button>
            </div>

            {paymentMethod === "card" && (
              <div className="payment-details">
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  className="donate-input"
                  value={cardHolder}
                  onChange={(e) => {
                    setCardHolder(e.target.value);
                    setError("");
                  }}
                  disabled={locked}
                />

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Card Number (16 digits)"
                  className="donate-input"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={16}
                  disabled={locked}
                />

                <div className="card-small-fields">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    className="donate-input"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    maxLength={5}
                    disabled={locked}
                  />

                  <input
                    type="password"
                    inputMode="numeric"
                    placeholder="CVV"
                    className="donate-input"
                    value={cvv}
                    onChange={handleCvvChange}
                    maxLength={3}
                    disabled={locked}
                  />
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="payment-details">
                <input
                  type="text"
                  placeholder="UPI ID (example: name@upi)"
                  className="donate-input"
                  value={upiId}
                  onChange={(e) => {
                    setUpiId(e.target.value);
                    setError("");
                  }}
                  disabled={locked}
                />
              </div>
            )}

            {error && (
              <p className="payment-error">
                {error}
              </p>
            )}

            {paymentSuccess && (
              <div className="payment-success">
                ✓ Payment Successful!
                <br />
                <small>
                  Your donation receipt has been downloaded.
                </small>
              </div>
            )}
          </div>

          <div className="donate-form-right">
            <button
              type="submit"
              className={
                "btn btn-primary donate-submit" +
                (status === "done"
                  ? " donate-submit-done"
                  : "")
              }
              disabled={locked}
            >
              {status === "idle" &&
                "Donate Securely"}

              {status === "loading" &&
                "Processing..."}

              {status === "done" &&
                "Payment Successful ✓"}
            </button>

            <p className="donate-note">
              Your donation is safe with us. We use secure
              payment processing.
            </p>
          </div>
        </form>

        {/* ================================
            DONATION HISTORY
        ================================= */}

        <section className="donation-history">
          <div className="donation-history-header">
            <h2>Donation History</h2>

            {donationHistory.length > 0 && (
              <button
                type="button"
                className="delete-all-btn"
                onClick={deleteAllHistory}
              >
                Delete All
              </button>
            )}
          </div>

          {donationHistory.length === 0 ? (
            <p className="history-empty">
              No donation history yet.
            </p>
          ) : (
            <div className="history-list">
              {donationHistory
                .slice()
                .reverse()
                .map((donation) => (
                  <div
                    className="history-card"
                    key={donation.receiptId}
                  >
                    <div className="history-info">
                      <h3>
                        ₹{donation.amount}
                      </h3>

                      <p>
                        <strong>Name:</strong>{" "}
                        {donation.name}
                      </p>

                      <p>
                        <strong>Cause:</strong>{" "}
                        {donation.cause}
                      </p>

                      <p>
                        <strong>Payment:</strong>{" "}
                        {donation.paymentMethod ===
                        "card"
                          ? "Card"
                          : "UPI"}
                      </p>

                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(
                          donation.donatedAt
                        ).toLocaleString()}
                      </p>

                      <p className="receipt-id">
                        Receipt ID:{" "}
                        {donation.receiptId}
                      </p>
                    </div>

                    <div className="history-actions">
                      <button
                        type="button"
                        className="history-download-btn"
                        onClick={() =>
                          downloadReceipt(donation)
                        }
                      >
                        Download Receipt
                      </button>

                      <button
                        type="button"
                        className="history-delete-btn"
                        onClick={() =>
                          deleteDonation(
                            donation.receiptId
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}