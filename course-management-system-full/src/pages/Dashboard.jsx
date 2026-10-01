import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";

export default function Dashboard() {
  const { user } = useAuth();
  const { courses, enrollments, enrollmentsLoading } = useCourses();

  const enrolled = useMemo(
    () => enrollments.map((enrollment) => ({
      ...enrollment,
      course: courses.find((course) => String(course.id) === String(enrollment.courseId))
    })),
    [enrollments, courses]
  );

  return (
    <section className="dashboard-page">
      <div className="dashboard-head">
        <div>
          <span className="section-tag">/ STUDENT_DASHBOARD</span>
          <h1>Good to see you, <span>{user.name.split(" ")[0]}.</span></h1>
          <p>{user.program} · {user.year}</p>
        </div>
        <div className="profile-code">USER/{user.username.toUpperCase()}</div>
      </div>

      <div className="dashboard-grid">
        <div className="student-panel panel">
          <span className="panel-label">STUDENT PROFILE</span>
          <div className="big-avatar">{user.name.charAt(0)}</div>
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
          <div className="profile-lines">
            <span><small>EMAIL</small>{user.email}</span>
            <span><small>PHONE</small>{user.phone}</span>
            <span><small>PROGRAMME</small>{user.program}</span>
            <span><small>YEAR</small>{user.year}</span>
          </div>
        </div>

        <div className="learning-panel panel">
          <div className="panel-head"><span className="panel-label">MY LEARNING</span><Link to="/courses">BROWSE ALL →</Link></div>
          {enrollmentsLoading ? <div className="empty-small">LOADING ENROLLMENTS...</div> : enrolled.length ? enrolled.map(({ id, course, status, progress }) => (
            <div className="enrollment-row" key={id}>
              <div><small>{course?.courseCode}</small><strong>{course?.courseName || "Course unavailable"}</strong></div>
              <div className="progress-wrap"><div className="progress-bar"><i style={{ width: `${progress}%` }} /></div><span>{progress}%</span></div>
              <span className={`enroll-status ${status === "Completed" ? "done" : ""}`}>{status}</span>
            </div>
          )) : <div className="empty-small">No enrolments yet.</div>}
        </div>

        <div className="stats-panel panel">
          <span className="panel-label">ACTIVITY</span>
          <div className="stat"><strong>{enrollments.length}</strong><span>ENROLLED COURSES</span></div>
          <div className="stat"><strong>{courses.length}</strong><span>AVAILABLE COURSES</span></div>
        </div>

        <div className="notifications-panel panel">
          <div className="panel-head"><span className="panel-label">NOTIFICATIONS</span></div>
          <div className="empty-small">No notifications yet.</div>
        </div>
      </div>
    </section>
  );
}
