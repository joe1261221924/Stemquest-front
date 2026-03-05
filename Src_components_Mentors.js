import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  useEffect(() => { api.getMentors().then(d => setMentors(d || [])); }, []);
  return (
    <section>
      <h2>Mentorship Dashboard</h2>
      {mentors.length === 0 && <div className="card">No mentorships yet.</div>}
      {mentors.map(m => (
        <div key={m.id} className="card">
          <strong>{m.name}</strong>
          <div className="muted small-text">{m.role}</div>
        </div>
      ))}
    </section>
  );
}