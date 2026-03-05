import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
      nav("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h2>Sign in to StemQuest</h2>
        <form onSubmit={submit}>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <div className="error">{error}</div>}
          <div style={{display:"flex",gap:8,marginTop:12}}>
            <button className="btn-primary" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
            <button type="button" className="btn-outline" onClick={() => { setEmail("demo@stemquest.test"); setPassword("password"); }}>Demo</button>
          </div>
        </form>
      </div>
    </div>
  );
}