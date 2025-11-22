// src/api.js
import axios from "axios";

const API_BASE = "http://localhost:5000";

export async function fetchSkillGap(targetRole, currentSkills) {
  const res = await axios.post(`${API_BASE}/api/skill-gap`, {
    targetRole,
    currentSkills,
  });
  return res.data;
}

export async function fetchRoadmap(targetRole) {
  const res = await axios.post(`${API_BASE}/api/roadmap`, { targetRole });
  return res.data;
}

export async function fetchNews() {
  const res = await axios.get(`${API_BASE}/api/news`);
  return res.data.stories;
}
