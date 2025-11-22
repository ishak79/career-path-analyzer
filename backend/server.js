const express = require("express");
const cors = require("cors");
const axios = require("axios"); 

const app = express();
const PORT = process.env.PORT || 5000;

// Predefined required skills for each role
const ROLE_SKILLS = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git"],
  "Backend Developer": ["Java", "Spring Boot", "SQL", "APIs", "Git"],
  "Data Analyst": ["Excel", "SQL", "Python", "Dashboards", "Statistics"],
};

// Roadmap for each role (simple mock "AI" roadmap)
const ROLE_ROADMAP = {
  "Backend Developer": [
    {
      phase: "Phase 1 (1–2 months)",
      items: [
        "Learn Java basics",
        "Understand OOP concepts",
        "Practice Git basics"
      ],
    },
    {
      phase: "Phase 2 (2 months)",
      items: [
        "Learn Spring Boot fundamentals",
        "Practice SQL queries (joins, group by)",
        "Build simple REST APIs"
      ],
    },
    {
      phase: "Phase 3 (1–2 months)",
      items: [
        "Learn deployment basics",
        "Build 2–3 backend projects",
        "Revise core Java + Spring concepts"
      ],
    },
  ],

  "Frontend Developer": [
    {
      phase: "Phase 1 (1–2 months)",
      items: [
        "HTML & CSS fundamentals",
        "Basic JavaScript",
        "Build simple static pages"
      ],
    },
    {
      phase: "Phase 2 (2 months)",
      items: [
        "Learn React basics (components, props, state)",
        "Use Git & GitHub",
        "Build a small React project"
      ],
    },
    {
      phase: "Phase 3 (1–2 months)",
      items: [
        "Learn React Router and API calls",
        "Deploy a React app",
        "Improve UI and performance slightly"
      ],
    },
  ],

  "Data Analyst": [
    {
      phase: "Phase 1 (1–2 months)",
      items: [
        "Excel basics (formulas, charts)",
        "Descriptive statistics",
        "Basic SQL (select, where)"
      ],
    },
    {
      phase: "Phase 2 (2 months)",
      items: [
        "Learn Python (Pandas, NumPy)",
        "SQL joins and aggregation",
        "Build simple dashboards"
      ],
    },
    {
      phase: "Phase 3 (1–2 months)",
      items: [
        "Work on case studies",
        "Create 2–3 portfolio projects",
        "Practice presenting insights"
      ],
    },
  ],
};


// Middlewares
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Career API backend is running");
});

// POST /api/skill-gap
// Body: { targetRole: "...", currentSkills: "Java, SQL, Git" or ["Java", "SQL"] }
app.post("/api/skill-gap", (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;

    // 1) Basic validation
    if (!targetRole || !currentSkills) {
      return res
        .status(400)
        .json({ error: "targetRole and currentSkills are required" });
    }

    // 2) Get required skills for that role
    const requiredSkills = ROLE_SKILLS[targetRole.trim()];
    if (!requiredSkills) {
      return res.status(404).json({
        error: "Role not found in predefined list",
        availableRoles: Object.keys(ROLE_SKILLS),
      });
    }

    // 3) Convert currentSkills to an array of trimmed, lowercase strings
    let userSkillsArray = [];
    if (Array.isArray(currentSkills)) {
      userSkillsArray = currentSkills;
    } else if (typeof currentSkills === "string") {
      userSkillsArray = currentSkills.split(","); // "Java, SQL" -> ["Java", " SQL"]
    }

    const userSkillsLower = userSkillsArray.map((s) => s.trim().toLowerCase());

    // 4) Find matched and missing skills
    const matchedSkills = requiredSkills.filter((skill) =>
      userSkillsLower.includes(skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(
      (skill) => !userSkillsLower.includes(skill.toLowerCase())
    );

    // 5) Simple recommendation + learning order
    const recommendations = [];

    if (missingSkills.length > 0) {
      recommendations.push(
        `You should focus on learning: ${missingSkills.join(", ")}.`
      );
    } else {
      recommendations.push("You already cover most of the required skills.");
    }

    if (matchedSkills.length > 0) {
      recommendations.push(
        `Keep practicing: ${matchedSkills.join(
          ", "
        )} with small real-world projects.`
      );
    }

    const suggestedLearningOrder = [...matchedSkills, ...missingSkills];

    // 6) Send response
    res.json({
      targetRole,
      matchedSkills,
      missingSkills,
      recommendations,
      suggestedLearningOrder,
    });
  } catch (err) {
    console.error("Error in /api/skill-gap:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET /api/news
// Returns top 5 HackerNews stories
app.get("/api/news", async (req, res) => {
  try {
    const topStoriesUrl =
      "https://hacker-news.firebaseio.com/v0/topstories.json";

    // 1) Get list of top story IDs
    const { data: ids } = await axios.get(topStoriesUrl);

    // 2) Take first 5 IDs
    const firstFiveIds = ids.slice(0, 5);

    // 3) For each ID, fetch story details
    const stories = await Promise.all(
      firstFiveIds.map(async (id) => {
        const itemUrl = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        const { data } = await axios.get(itemUrl);
        return {
          id: data.id,
          title: data.title,
          url: data.url,
          score: data.score,
          time: data.time,
          type: data.type,
          by: data.by,
        };
      })
    );

    // 4) Send to client
    res.json({ stories });
  } catch (err) {
    console.error("Error in /api/news:", err.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});


app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// POST /api/roadmap
// Body: { targetRole: "Backend Developer" }
app.post("/api/roadmap", (req, res) => {
  try {
    const { targetRole } = req.body;

    // 1) Validate
    if (!targetRole) {
      return res.status(400).json({ error: "targetRole is required" });
    }

    const roleKey = targetRole.trim();
    const roadmap = ROLE_ROADMAP[roleKey];

    // 2) If roadmap not found, send a generic one
    if (!roadmap) {
      return res.json({
        targetRole: roleKey,
        phases: [
          {
            phase: "Phase 1 (1–2 months)",
            items: [
              "Strengthen programming fundamentals",
              "Learn Git and version control"
            ],
          },
          {
            phase: "Phase 2 (2 months)",
            items: [
              "Learn core tools/technologies for the role",
              "Build 1–2 mini projects"
            ],
          },
          {
            phase: "Phase 3 (1–2 months)",
            items: [
              "Build a bigger project",
              "Prepare for interviews and revise concepts"
            ],
          },
        ],
      });
    }

    // 3) Normal case: send roadmap for that role
    res.json({
      targetRole: roleKey,
      phases: roadmap,
    });
  } catch (err) {
    console.error("Error in /api/roadmap:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


