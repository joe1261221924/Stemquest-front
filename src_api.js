const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export function readCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

async function getJson(path) {
  const res = await fetch(API_BASE + path, { credentials: "include" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function postJson(path, body) {
  const csrf = readCookie("csrf_token");
  const res = await fetch(API_BASE + path, {
    method: "POST",
    credentials: "include",
    headers: Object.assign({ "Content-Type": "application/json" }, csrf ? { "X-CSRF-Token": csrf } : {}),
    body: JSON.stringify(body || {})
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json().catch(() => null);
}

export const api = {
  getFeed: () => getJson("/recognition-feed"),
  getShowcase: () => getJson("/showcase"),
  getProjects: () => getJson("/projects"),
  getMentors: () => getJson("/mentorship-dashboard"),
  getLeaderboard: () => getJson("/leaderboard"),
  getStatus: () => getJson("/status"),
  login: (email, password) => postJson("/auth/login", { email, password }),
  logout: () => postJson("/auth/logout", {}),
  me: () => getJson("/auth/me"),
  applaud: (id) => postJson(`/applaud/${encodeURIComponent(id)}`, {}),
  comment: (id, comment) => postJson(`/comment/${encodeURIComponent(id)}`, { comment }),
  voteProject: (id) => postJson(`/vote-project/${encodeURIComponent(id)}`, {}),
  createShowcase: (payload) => postJson("/create-showcase", payload)
};