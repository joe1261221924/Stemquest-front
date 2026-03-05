import React, { createContext, useState, useEffect } from "react";
import { api } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const me = await api.me();
      setUser(me || null);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadUser(); }, []);

  async function login(email, password) {
    await api.login(email, password);
    await loadUser();
  }

  async function logout() {
    try { await api.logout(); } catch (e) {}
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}