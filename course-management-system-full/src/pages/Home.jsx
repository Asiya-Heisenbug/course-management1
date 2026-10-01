import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="home-page">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="section-tag">/ LEARNING_OPERATIONS / ONLINE</span>
          <h1>Learning,<br /><span>under command.</span></h1>
          <p>
            Course Command is a student learning management system for discovering courses,
            tracking enrolments and managing an academic catalogue through a connected mock API.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn" to={user ? "/dashboard" : "/register"}>
              {user ? "OPEN DASHBOARD →" : "CREATE STUDENT ACCOUNT →"}
            </Link>
            <Link className="ghost-btn" to="/courses">VIEW COURSES</Link>
          </div>
        </div>

        <div className="hero-console">
          <div className="console-top"><span>CC://SYSTEM</span><span>ONLINE ●</span></div>
          <div className="console-grid">
            <div><small>STUDENTS</small><strong>ACTIVE</strong></div>
            <div><small>COURSES</small><strong>LIVE</strong></div>
            <div><small>API</small><strong>5000</strong></div>
            <div><small>STATE</small><strong>SYNCED</strong></div>
          </div>
          <div className="console-line"><i /> API GATEWAY CONNECTED</div>
          <div className="console-line"><i /> COURSE REGISTRY AVAILABLE</div>
          <div className="console-line"><i /> AUTH STATE READY</div>
        </div>
      </div>

      <div className="feature-strip">
        <div><span>01</span><b>STUDENT ACCESS</b><p>Register, login and maintain a persistent session.</p></div>
        <div><span>02</span><b>COURSE DISCOVERY</b><p>Browse live course records from the mock backend.</p></div>
        <div><span>03</span><b>LEARNING STATE</b><p>See enrolment, progress and notifications.</p></div>
      </div>
    </section>
  );
}
