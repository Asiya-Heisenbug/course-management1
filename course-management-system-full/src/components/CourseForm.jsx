import { useState } from "react";

const defaults = {
  courseName: "",
  courseCode: "",
  instructor: "",
  duration: "",
  category: "Programming",
  level: "Beginner",
  status: "Active",
  image: "",
  overview: "",
  description: ""
};

export default function CourseForm({ initialValues = {}, onSubmit, submitLabel, busy }) {
  const [form, setForm] = useState({ ...defaults, ...initialValues });

  function change(e) {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    await onSubmit(form);
  }

  return (
    <form className="course-form" onSubmit={submit}>
      <div className="form-heading"><span>01</span><div><h3>Course identity</h3><p>Core catalogue information.</p></div></div>
      <div className="field-grid">
        <label>Course name<input name="courseName" value={form.courseName} onChange={change} required placeholder="Data Structures" /></label>
        <label>Course code<input name="courseCode" value={form.courseCode} onChange={change} required placeholder="CS201" /></label>
        <label>Instructor<input name="instructor" value={form.instructor} onChange={change} required placeholder="Dr. Priya" /></label>
        <label>Duration<input name="duration" value={form.duration} onChange={change} required placeholder="10 Weeks" /></label>
        <label>Category<select name="category" value={form.category} onChange={change}><option>Programming</option><option>Web Development</option><option>Artificial Intelligence</option><option>Data Science</option><option>Design</option></select></label>
        <label>Level<select name="level" value={form.level} onChange={change}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
      </div>

      <div className="form-heading second"><span>02</span><div><h3>Course description</h3><p>What should a learner expect?</p></div></div>
      <label className="full-field">Overview<input name="overview" value={form.overview} onChange={change} placeholder="Short catalogue description" /></label>
      <label className="full-field">Detailed description<textarea name="description" value={form.description} onChange={change} rows="6" required placeholder="Describe the learning experience..." /></label>
      <label className="full-field">Image URL <em>optional</em><input name="image" value={form.image} onChange={change} placeholder="https://..." /></label>

      <div className="form-footer">
        <span>API OPERATION → {submitLabel.toUpperCase()}</span>
        <button className="primary-btn" disabled={busy}>{busy ? "PROCESSING..." : `${submitLabel} →`}</button>
      </div>
    </form>
  );
}
