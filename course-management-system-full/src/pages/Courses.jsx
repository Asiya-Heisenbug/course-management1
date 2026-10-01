import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { useCourses } from "../context/CourseContext";

export default function Courses() {
  const { courses, loading, error, deleteCourse } = useCourses();
  const [query, setQuery] = useState("");

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

  return (
    <section className="page">
      <div className="page-head">
        <div><span className="section-tag">/ COURSE_REGISTRY</span><h1>Course catalogue <em>{String(courses.length).padStart(2, "0")}</em></h1><p>Live records loaded from Supabase.</p></div>
        <Link className="primary-btn" to="/add-course">+ ADD COURSE</Link>
      </div>

      <div className="registry-bar">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="⌕  Search courses, instructors, categories..." />
        <span>GET · POST · PUT · DELETE</span>
      </div>

      {loading && <div className="state-box">LOADING COURSE REGISTRY...</div>}
      {error && <div className="state-box error"><strong>API CONNECTION FAILED</strong><p>{error}</p></div>}
      {!loading && !error && <div className="course-list">
        {filtered.map((course) => <CourseCard key={course.id} course={course} admin onDelete={handleDelete} />)}
        {!filtered.length && <div className="state-box">NO MATCHING RECORDS</div>}
      </div>}
    </section>
  );
}
