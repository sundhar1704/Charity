import "./CauseRow.css";

export default function CauseRow({ img, title, paragraphs }) {
  return (
    <div className="cause-row">
      <img className="cause-row-img" src={img} alt={title} />

      <div className="cause-row-content">
        <h2>{title}</h2>
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
        <button className="btn btn-primary cause-row-btn">
          Donate for this cause
        </button>
      </div>
    </div>
  );
}