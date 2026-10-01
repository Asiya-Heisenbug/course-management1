import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseForm from "../components/CourseForm";
import { useCourses } from "../context/CourseContext";

export default function AddCourse() {
  const { addCourse } = useCourses();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function submit(form) {
    try {
      setBusy(true);
      await addCourse({ ...form, learningOutcomes: [], modules: [] });
      alert("Course added successfully!");
      navigate("/courses");
    } catch (err) {
      console.error(err);
      alert("Unable to add course.");
    } finally { setBusy(false); }
  }

  return <section className="page form-page"><div className="page-head"><div><span className="section-tag">/ NEW_RECORD</span><h1>Add course</h1><p>Create a new course in the Supabase catalogue.</p></div></div><CourseForm onSubmit={submit} submitLabel="Add course" busy={busy} /></section>;
}
