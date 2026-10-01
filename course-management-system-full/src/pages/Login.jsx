import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validation";

export default function Login() {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function change(e) {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    const validation = validateLogin(form);
    setErrors(validation);
    setMessage("");
    if (Object.keys(validation).length) return;

    try {
      await login(form.identifier, form.password);
      setMessage("Authentication successful.");
      navigate(location.state?.from || "/dashboard", { replace: true });
    } catch (error) {
      setErrors({ form: error.message });
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="section-tag">/ AUTHENTICATION / 01</span>
        <h1>Welcome back.</h1>
        <p>Access your student workspace.</p>

        {errors.form && <div className="form-alert error">{errors.form}</div>}
        {message && <div className="form-alert success">{message}</div>}

        <form onSubmit={submit}>
          <label>Email or username<input name="identifier" value={form.identifier} onChange={change} placeholder="asiya@example.com" /></label>
          {errors.identifier && <small className="field-error">{errors.identifier}</small>}
          <label>Password<input type="password" name="password" value={form.password} onChange={change} placeholder="••••••••" /></label>
          {errors.password && <small className="field-error">{errors.password}</small>}
          <button className="primary-btn full" disabled={authLoading}>{authLoading ? "AUTHENTICATING..." : "LOGIN →"}</button>
        </form>

        <div className="auth-footer">New here? <Link to="/register">Create an account</Link></div>
        <div className="demo-note">DEMO: asiya / Password123</div>
      </div>
    </section>
  );
}
