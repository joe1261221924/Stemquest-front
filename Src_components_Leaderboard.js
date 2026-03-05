import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Leaderboard() {
  const [list, setList] = useState([]);
  useEffect(() => { api.getLeaderboard().then(d => setList(d || [])); }, []);
  return (
    <section>
      <h2>Top Supporters</h2>
      {list.length === 0 && <div className="card">No supporters yet.</div>}
      {list.map((u, i) => (
        <div key={i} className="leader-card card">
          <div>#{i+1} <strong>{u.name}</strong></div>
          <div className="badge">{u.count}</div>
        </div>
      ))}
    </section>
  );
}