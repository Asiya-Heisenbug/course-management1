import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateRegistration } from "../utils/validation";

export default function Register() {
  const { register, authLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", username: "", email: "", phone: "", password: "",
    confirmPassword: "", program: "B.Sc. Computer Science (AI)", year: "First Year"
  });
  const [errors, setErrors] = useState({});

  function change(e) {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    const validation = validateRegistration(form);
    setErrors(validation);
    if (Object.keys(validation).length) return;

    try {
      await register(form);
      alert("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      setErrors({ form: error.message });
    }
  }

  return (
    <section className="auth-page">
      <div className="register-card">
        <div className="auth-intro">
          <span className="section-tag">/ STUDENT_REGISTRATION / 02</span>
          <h1>Build your<br /><span>learning profile.</span></h1>
          <p>Enter your details once. Course Command keeps your session and student state available across the application.</p>
        </div>

        <form className="register-form" onSubmit={submit}>
          {errors.form && <div className="form-alert error">{errors.form}</div>}
          <div className="field-grid">
            <label>Full name<input name="name" value={form.name} onChange={change} placeholder="Your name" />{errors.name && <small className="field-error">{errors.name}</small>}</label>
            <label>Username<input name="username" value={form.username} onChange={change} placeholder="student01" />{errors.username && <small className="field-error">{errors.username}</small>}</label>
            <label>Email<input name="email" value={form.email} onChange={change} placeholder="you@example.com" />{errors.email && <small className="field-error">{errors.email}</small>}</label>
            <label>Phone<input name="phone" value={form.phone} onChange={change} placeholder="9876543210" />{errors.phone && <small className="field-error">{errors.phone}</small>}</label>
            <label>Password<input type="password" name="password" value={form.password} onChange={change} placeholder="Minimum 8 characters" />{errors.password && <small className="field-error">{errors.password}</small>}</label>
            <label>Confirm password<input type="password" name="confirmPassword" value={form.confirmPassword} onChange={change} placeholder="Repeat password" />{errors.confirmPassword && <small className="field-error">{errors.confirmPassword}</small>}</label>
            <label>Programme<select name="program" value={form.program} onChange={change}><option>B.Sc. Computer Science (AI)</option><option>B.Sc. Computer Science</option><option>BCA</option><option>B.Tech Computer Science</option></select></label>
            <label>Year<select name="year" value={form.year} onChange={change}><option>First Year</option><option>Second Year</option><option>Third Year</option><option>Final Year</option></select></label>
          </div>
          <button className="primary-btn full" disabled={authLoading}>{authLoading ? "CREATING..." : "CREATE ACCOUNT →"}</button>
          <div className="auth-footer">Already registered? <Link to="/login">Login</Link></div>
        </form>
      </div>
    </section>
  );
}
