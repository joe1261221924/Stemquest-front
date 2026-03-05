import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Feed() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.getFeed().then(d => setItems(d || [])); }, []);
  return (
    <section>
      <h2>Recognition Feed</h2>
      {items.length === 0 && <div className="card">No recognition yet.</div>}
      {items.map(it => (
        <div key={it.id} className="feed-card card">
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div className="avatar" />
            <div>
              <div><strong>{it.user}</strong> <span className="muted">{it.action}</span></div>
              <div className="small-text muted">{it.milestone} • {it.timestamp}</div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <button className="btn-primary" onClick={() => api.applaud(it.id).then(()=>{})}>Applaud</button>
            <button className="btn-outline" onClick={() => { const c = prompt("Comment:"); if (c) api.comment(it.id, c); }}>Comment</button>
          </div>
        </div>
      ))}
    </section>
  );
}