import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseForm from "../components/CourseForm";
import { useCourses } from "../context/CourseContext";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, loading, editCourse } = useCourses();
  const [busy, setBusy] = useState(false);
  const course = courses.find((item) => String(item.id) === String(id));

  useEffect(() => {
    if (!loading && !course) navigate("/courses", { replace: true });
  }, [loading, course, navigate]);

  async function submit(form) {
    try {
      setBusy(true);
      await editCourse(id, { ...course, ...form });
      alert("Course updated successfully!");
      navigate("/courses");
    } catch (err) {
      console.error(err);
      alert("Unable to update course.");
    } finally { setBusy(false); }
  }

  if (loading || !course) return <section className="page"><div className="state-box">LOADING RECORD...</div></section>;

  return <section className="page form-page"><div className="page-head"><div><span className="section-tag">/ EDIT_RECORD / {String(id).padStart(2, "0")}</span><h1>Modify course</h1><p>Persist changes with PUT /courses/:id.</p></div></div><CourseForm initialValues={course} onSubmit={submit} submitLabel="Save changes" busy={busy} /></section>;
}
