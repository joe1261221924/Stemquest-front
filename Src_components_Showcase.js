import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Showcase() {
  const [event, setEvent] = useState(null);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.getShowcase().then(setEvent);
    api.getProjects().then(d => setProjects(d || []));
  }, []);
  return (
    <section>
      <h2>Global Showcase</h2>
      {event ? (
        <div className="card">
          <h3>{event.title}</h3>
          <p className="muted">{event.description}</p>
          <div className="small-text muted">Ends: {event.ends_at}</div>
        </div>
      ) : <div className="card">No active showcase.</div>}
      <div className="projects-grid">
        {projects.map(p => (
          <div key={p.id} className="project-card card">
            <div>
              <strong>{p.title}</strong>
              <div className="muted small-text">{p.short_description}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="small-text muted">Votes: {p.votes}</div>
              <button className="btn-primary" onClick={() => api.voteProject(p.id)}>Vote</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}