import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <header className="topbar">
      <div className="brand">
        <div className="logo" />
        <span className="title">StemQuest</span>
      </div>

      <nav className="nav">
        <button className="nav-btn" onClick={() => nav("/")}>Dashboard</button>
        <button className="nav-btn" onClick={() => nav("/pricing")}>Pricing</button>
      </nav>

      <div className="user-actions">
        {user ? (
          <>
            <span className="user-name">Hi, {user.name || user.email}</span>
            <button className="btn-outline" onClick={() => logout()}>Logout</button>
          </>
        ) : (
          <button className="btn-primary" onClick={() => nav("/login")}>Login</button>
        )}
      </div>
    </header>
  );
}