import { useNavigate } from "react-router-dom";
import "./CauseRow.css";

export default function CauseRow({ img, title, interest, paragraphs }) {
  const navigate = useNavigate();

  function handleDonateClick() {
    navigate("/volunteer", { state: { interest } });
  }

  return (
    <div className="cause-row">
      <img className="cause-row-img" src={img} alt={title} />

      <div className="cause-row-content">
        <h2>{title}</h2>

        {paragraphs.map((text, i) => (
          <p key={i}>{text}</p>
        ))}

        <button
          type="button"
          className="btn btn-primary cause-row-btn"
          onClick={handleDonateClick}
        >
          Donate for this cause
        </button>
      </div>
    </div>
  );
}