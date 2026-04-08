import { useState } from "react";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import JobMatcher from "./pages/JobMatcher";
import JDParser from "./pages/JDParser";
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
          <button
            className={`tab ${tab === "jd-parser" ? "tab--active" : ""}`}
            onClick={() => setTab("jd-parser")}
          >
            JD Parser
          </button>
        </nav>
      </header>

      <main className="app-main">
        {tab === "resume" && <ResumeAnalyzer />}
        {tab === "matcher" && <JobMatcher />}
        {tab === "jd-parser" && <JDParser />}
      </main>
    </div>
  );
}

export default App;
