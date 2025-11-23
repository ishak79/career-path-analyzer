
# Career Path Analyzer

A simple full-stack web application that performs skill-gap analysis, generates a role-based career roadmap and displays the latest tech news using the public HackerNews API.

## Project Overview

This project is a full-stack application composed of two main parts:

*   **Backend:** Node.js + Express
*   **Frontend:** React (Vite)

## Live Demo

| Component | Platform | URL |
| :--- | :--- | :--- |
| Frontend | Vercel | [https://career-path-analyzer-pi.vercel.app](https://career-path-analyzer-pi.vercel.app) |
| Backend | Render | [https://career-path-backend-ewj2.onrender.com](https://career-path-backend-ewj2.onrender.com) |

## Tech Stack

### Frontend

*   React (Vite)
*   Axios (API calls)
*   CSS (basic styling)

### Backend

*   Node.js
*   Express
*   Axios (for calling HackerNews API)
*   CORS

### Deployment

*   Frontend: Vercel
*   Backend: Render

## Project Structure

```

fullstack-career-app/
│
├── backend/ → Node.js + Express APIs
│ └── server.js
│
└── frontend/ → React UI (Vite)
└── src/

```` 

## How to Run Locally

### 1. Run the Backend

```bash
cd backend
npm install
npm run dev

````

Backend runs at: `http://localhost:5000`

### 2\. Run the Frontend

``` bash
cd frontend
npm install
npm run dev

```

Frontend runs at: `http://localhost:5173`

## API ENDPOINTS

| Endpoint             | Method | Purpose                                                                                                 | Request Body                                                                    | Sample Response                                                                                                      |
| :------------------- | :----- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------- |
| **`/api/skill-gap`** | `POST` | Calculates matched skills, missing skills, recommendations, and learning order for a given role.        | `json { "targetRole": "Backend Developer", "currentSkills": "Java, SQL, Git" }` | `json { "matchedSkills": [...], "missingSkills": [...], "recommendations": [...], "suggestedLearningOrder": [...] }` |
| **`/api/roadmap`**   | `POST` | Returns a phase-wise career roadmap for a selected role. If role is unknown, returns a generic roadmap. | `json { "targetRole": "Backend Developer" }`                                    | `json { "targetRole": "...", "phases": [ { "phase": "Phase 1", "items": [...] }, ... ] }`                            |
| **`/api/news`**      | `GET`  | Fetches top 5 trending tech news stories from HackerNews.                                               | **None**                                                                        | `json { "stories": [ { "id": 123, "title": "...", "url": "...", "score": 100, "by": "user" } ] }`                    |

