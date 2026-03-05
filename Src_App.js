import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Showcase from "./components/Showcase";
import Mentors from "./components/Mentors";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import "./index.css";

function Dashboard() {
  const [section, setSection] = useState("feed");
  return (
    <div className="app-grid">
      <Sidebar onSelect={setSection} />
      <main className="main">
        {section === "feed" && <Feed />}
        {section === "showcase" && <Showcase />}
        {section === "mentors" && <Mentors />}
        {section === "leaderboard" && <Leaderboard />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<div style={{padding:20}}><h2>Pricing (coming soon)</h2></div>} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}