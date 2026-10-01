import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";

export default function Courses() {
  const { user } = useAuth();
  const { courses, loading, error, enrollments, enrollCourse, deleteCourse } = useCourses();
  const isAdmin = user.role === "Admin";
  const [query, setQuery] = useState("");
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter((course) =>
      [course.courseName, course.courseCode, course.instructor, course.category].join(" ").toLowerCase().includes(term)
    );
  }, [courses, query]);

  async function handleDelete(id) {
    const course = courses.find((item) => item.id === id);
    if (!window.confirm(`Delete "${course?.courseName}"?`)) return;
    try { await deleteCourse(id); }
    catch (err) { console.error(err); alert("Unable to delete course."); }
  }

  async function handleEnroll(id) {
    try {
      setEnrollingCourseId(id);
      await enrollCourse(id);
    } catch (err) {
      console.error(err);
      alert(err.message || "Unable to enroll in this course.");
    } finally {
      setEnrollingCourseId(null);
    }
  }

  return (
    <section className="page">
      <div className="page-head">
        <div><span className="section-tag">/ COURSE_REGISTRY</span><h1>Course catalogue <em>{String(courses.length).padStart(2, "0")}</em></h1><p>Live records loaded from Supabase.</p></div>
        {isAdmin && <Link className="primary-btn" to="/add-course">+ ADD COURSE</Link>}
      </div>

      <div className="registry-bar">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="⌕  Search courses, instructors, categories..." />
        <span>COURSE CATALOGUE · ENROLLMENT</span>
      </div>

      {loading && <div className="state-box">LOADING COURSE REGISTRY...</div>}
      {error && <div className="state-box error"><strong>API CONNECTION FAILED</strong><p>{error}</p></div>}
      {!loading && !error && <div className="course-list">
        {filtered.map((course) => <CourseCard
          key={course.id}
          course={course}
          admin={isAdmin}
          onDelete={isAdmin ? handleDelete : undefined}
          onEnroll={handleEnroll}
          isEnrolled={enrollments.some((item) => String(item.courseId) === String(course.id))}
          enrolling={String(enrollingCourseId) === String(course.id)}
        />)}
        {!filtered.length && <div className="state-box">NO MATCHING RECORDS</div>}
      </div>}
    </section>
  );
}
