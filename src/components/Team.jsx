import "./Team.css";
import SophiaImg from "../assets/images/Depth 7, Frame 4.jpg";
import EthanImg from "../assets/images/Depth 7, Frame 5.jpg";
import OliviaImg from "../assets/images/Depth 8, Frame 0.jpg";

const team = [
  {
    name: "Sarah Johnson",
    role: "Co-Founder & Executive Director",
    img: SophiaImg,
  },
  {
    name: "David Lee",
    role: "Co-Founder & Program Director",
    img: EthanImg,
  },
  {
    name: "Emily Carter",
    role: "Volunteer Coordinator",
    img: OliviaImg,
  },
];

export default function Team() {
  return (
    <section className="team">
      <div className="container">
        <h2 className="section-title">Our Team</h2>

        <div className="team-grid">
          {team.map((member) => (
            <div className="team-card" key={member.name}>
              <img className="team-avatar" src={member.img} alt={member.name} />
              <p className="team-name">{member.name}</p>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}