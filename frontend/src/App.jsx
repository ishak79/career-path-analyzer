// src/App.jsx
import { useEffect, useState } from "react";
import { fetchSkillGap, fetchRoadmap, fetchNews } from "./api";
import "./index.css";

function App() {
  const [targetRole, setTargetRole] = useState("Backend Developer");
  const [currentSkills, setCurrentSkills] = useState("Java, SQL, Git");

  const [skillGapResult, setSkillGapResult] = useState(null);
  const [roadmapResult, setRoadmapResult] = useState(null);
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [error, setError] = useState("");

  // Load HackerNews when app starts
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoadingNews(true);
        const stories = await fetchNews();
        setNews(stories);
      } catch (err) {
        console.error(err);
        setError("Failed to load tech news");
      } finally {
        setLoadingNews(false);
      }
    };

    loadNews();
  }, []);

  // When user clicks "Analyze"
  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingAnalysis(true);
    setSkillGapResult(null);
    setRoadmapResult(null);

    try {
      const [skillGapData, roadmapData] = await Promise.all([
        fetchSkillGap(targetRole, currentSkills),
        fetchRoadmap(targetRole),
      ]);

      setSkillGapResult(skillGapData);
      setRoadmapResult(roadmapData);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Something went wrong while analyzing"
      );
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Career Path Analyzer</h1>
        <p className="subtitle">
          Skill gap analysis, roadmap, and latest tech news in one place.
        </p>
      </header>

      {/* Input Form */}
      <section className="input-section">
        <h2>Career Goal Input</h2>
        <form onSubmit={handleAnalyze} className="form">
          <div className="form-group">
            <label>Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder='e.g., "Backend Developer"'
            />
          </div>

          <div className="form-group">
            <label>Current Skills (comma separated)</label>
            <textarea
              rows={3}
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              placeholder="e.g., Java, SQL, Git"
            />
          </div>

          <button type="submit" disabled={loadingAnalysis}>
            {loadingAnalysis ? "Analyzing..." : "Analyze My Career Path"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </section>

      {/* Dashboard: Skill Gap + Roadmap */}
      <section className="dashboard">
        <div className="panel">
          <h2>Skill Gap Results</h2>
          {!skillGapResult && <p>Run an analysis to see results.</p>}

          {skillGapResult && (
            <div className="panel-content">
              <p>
                <strong>Target Role:</strong> {skillGapResult.targetRole}
              </p>

              <div className="chips-group">
                <p>
                  <strong>Matched Skills:</strong>
                </p>
                <div className="chips">
                  {skillGapResult.matchedSkills.length === 0 && (
                    <span className="chip chip-muted">None yet</span>
                  )}
                  {skillGapResult.matchedSkills.map((skill) => (
                    <span key={skill} className="chip chip-good">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="chips-group">
                <p>
                  <strong>Missing Skills:</strong>
                </p>
                <div className="chips">
                  {skillGapResult.missingSkills.length === 0 && (
                    <span className="chip chip-good">No major gaps 🎉</span>
                  )}
                  {skillGapResult.missingSkills.map((skill) => (
                    <span key={skill} className="chip chip-bad">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p>
                  <strong>Suggested Learning Order:</strong>
                </p>
                <ol>
                  {skillGapResult.suggestedLearningOrder.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ol>
              </div>

              <div>
                <p>
                  <strong>Recommendations:</strong>
                </p>
                <ul>
                  {skillGapResult.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="panel">
          <h2>Career Roadmap</h2>
          {!roadmapResult && <p>Run an analysis to see your roadmap.</p>}

          {roadmapResult && (
            <div className="panel-content">
              <p>
                <strong>Target Role:</strong> {roadmapResult.targetRole}
              </p>
              {roadmapResult.phases.map((phase) => (
                <div key={phase.phase} className="phase-card">
                  <h3>{phase.phase}</h3>
                  <ul>
                    {phase.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <h2>Latest Tech News (HackerNews)</h2>
        {loadingNews && <p>Loading news...</p>}
        {!loadingNews && news.length === 0 && (
          <p>No news available right now.</p>
        )}

        <div className="news-grid">
          {news.map((story) => (
            <article key={story.id} className="news-card">
              <h3>{story.title}</h3>
              <p className="news-meta">
                <span>By: {story.by}</span> • <span>Score: {story.score}</span>
              </p>
              <p className="news-meta">
                <span>Type: {story.type}</span>
              </p>
              {story.url && (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noreferrer"
                  className="news-link"
                >
                  Read article
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
