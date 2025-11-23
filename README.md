# Career Path Analyzer

A simple full-stack web application that performs **skill-gap analysis**, generates a **role-based career roadmap**, and displays **latest tech news** using the public HackerNews API.

---

## 🚀 Live Demo

**Frontend (Vercel):**  
https://career-path-analyzer-pi.vercel.app  

**Backend (Render):**  
https://career-path-backend-ewj2.onrender.com  

---

## 🛠️ Tech Stack Used

### 🔹 Frontend
- React (Vite)
- Axios (API calls)
- CSS (basic styling)

### 🔹 Backend
- Node.js
- Express
- Axios (for calling HackerNews API)
- CORS

### 🔹 Deployment
- Frontend → **Vercel**
- Backend → **Render**

---

## 📂 Project Structure
fullstack-career-app/
│
├── backend/ → Node.js + Express APIs
│ └── server.js
│
└── frontend/ → React UI (Vite)
└── src/


---

## 💻 How to Run the Project Locally

### 1️⃣ Run the Backend
```bash
cd backend
npm install
npm run dev

Backend runs at:
http://localhost:5000

2️⃣ Run the Frontend
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173



📘 API Documentation

1. POST /api/skill-gap

Finds:

matched skills

missing skills

recommendations

suggested learning order


Request Body
{
  "targetRole": "Backend Developer",
  "currentSkills": "Java, SQL, Git"
}

Sample Response
{
  "targetRole": "Backend Developer",
  "matchedSkills": ["Java", "SQL", "Git"],
  "missingSkills": ["Spring Boot", "APIs"],
  "recommendations": [
    "You should focus on learning: Spring Boot, APIs.",
    "Keep practicing: Java, SQL, Git with small real-world projects."
  ],
  "suggestedLearningOrder": [
    "Java",
    "SQL",
    "Git",
    "Spring Boot",
    "APIs"
  ]
}


2. POST /api/roadmap

Generates a 3-phase roadmap for the selected role.

Request Body
{
  "targetRole": "Backend Developer"
}

Sample Response
{
  "targetRole": "Backend Developer",
  "phases": [
    {
      "phase": "Phase 1 (1–2 months)",
      "items": ["Java basics", "OOP concepts", "Git basics"]
    },
    {
      "phase": "Phase 2 (2 months)",
      "items": ["Spring Boot", "SQL practice", "Build REST APIs"]
    },
    {
      "phase": "Phase 3 (1–2 months)",
      "items": ["Deployment basics", "2–3 projects", "System design basics"]
    }
  ]
}


3. GET /api/news

Fetches top 5 latest HackerNews stories.

Sample Response
{
  "stories": [
    {
      "id": 123,
      "title": "Business Story",
      "url": "https://business.com",
      "score": 120,
      "time": 1690000000,
      "type": "story",
      "by": "authorname"
    }
  ]
}


