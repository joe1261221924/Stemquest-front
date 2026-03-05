import React from "react";
export default function Sidebar({ onSelect }) {
  return (
    <aside className="sidebar">
      <button onClick={() => onSelect("feed")}>Recognition Feed</button>
      <button onClick={() => onSelect("showcase")}>Showcases</button>
      <button onClick={() => onSelect("mentors")}>Mentors</button>
      <button onClick={() => onSelect("leaderboard")}>Top Supporters</button>
    </aside>
  );
}