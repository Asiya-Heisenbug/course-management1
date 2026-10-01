import { Link } from "react-router-dom";

const accent = {
  Programming: "amber",
  "Web Development": "violet",
  "Artificial Intelligence": "cyan",
  "Data Science": "green"
};

export default function CourseCard({ course, admin = false, onDelete, onEnroll, isEnrolled, enrolling }) {
  return (
    <article className={`course-card ${accent[course.category] || "cyan"}`}>
      <div className="course-icon">
        {course.image ? <img src={course.image} alt="" /> : <span>◈</span>}
      </div>
      <div className="course-content">
        <div className="course-topline">
          <span>{course.courseCode}</span>
          <span className="active-status"><i /> {course.status}</span>
        </div>
        <h3>{course.courseName}</h3>
        <p>{course.overview || course.description}</p>
        <div className="course-meta">
          <span><small>INSTRUCTOR</small>{course.instructor}</span>
          <span><small>DURATION</small>{course.duration}</span>
          <span><small>LEVEL</small>{course.level}</span>
        </div>
      </div>
      <div className="card-actions">
        <span className="catalog-tag">{course.category}</span>
        {onEnroll && (
          <button disabled={isEnrolled || enrolling} onClick={() => onEnroll(course.id)}>
            {isEnrolled ? "ENROLLED" : enrolling ? "ENROLLING..." : "ENROLL"}
          </button>
        )}
        {admin && <>
          <Link to={`/edit-course/${course.id}`}>EDIT ↗</Link>
          <button onClick={() => onDelete(course.id)}>DELETE</button>
        </>}
      </div>
    </article>
  );
}
