import { useState } from "react";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import JobMatcher from "./pages/JobMatcher";
import "./App.css";

function App() {
  const [tab, setTab] = useState("resume");

  return (
    <div className="app">
      <header className="app-header">
        <h1>Job Search Copilot</h1>
        <nav className="tab-bar">
          <button
            className={`tab ${tab === "resume" ? "tab--active" : ""}`}
            onClick={() => setTab("resume")}
          >
            Resume Analyzer
          </button>
          <button
            className={`tab ${tab === "matcher" ? "tab--active" : ""}`}
            onClick={() => setTab("matcher")}
          >
            Job Matcher
          </button>
        </nav>
      </header>

      <main className="app-main">
        {tab === "resume" && <ResumeAnalyzer />}
        {tab === "matcher" && <JobMatcher />}
      </main>
    </div>
  );
}

export default App;
