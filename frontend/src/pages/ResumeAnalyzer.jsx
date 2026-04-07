import { useState } from "react";
import { analyzeResume } from "../services/api";
import SkillTag from "../components/SkillTag";

function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError("Please paste your resume text.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await analyzeResume(resumeText);
      setResult(res.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Resume Analyzer</h2>
      <p className="page-subtitle">
        Paste your resume text below to get a structured analysis.
      </p>

      <textarea
        className="text-input"
        rows={12}
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <button className="btn-primary" onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {error && <p className="error-msg">{error}</p>}

      {result && (
        <div className="result-card">
          <h3>{result.contact?.name || "Resume Analysis"}</h3>

          {result.summary && (
            <section>
              <h4>Summary</h4>
              <p>{result.summary}</p>
            </section>
          )}

          {result.skills && (
            <section>
              <h4>Skills</h4>
              <div className="skills-group">
                <div>
                  <strong>Technical</strong>
                  <div className="tag-list">
                    {result.skills.technical?.map((s) => (
                      <SkillTag key={s} label={s} variant="technical" />
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Tools</strong>
                  <div className="tag-list">
                    {result.skills.tools?.map((s) => (
                      <SkillTag key={s} label={s} variant="tools" />
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Soft Skills</strong>
                  <div className="tag-list">
                    {result.skills.soft?.map((s) => (
                      <SkillTag key={s} label={s} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {result.experience?.length > 0 && (
            <section>
              <h4>Experience</h4>
              {result.experience.map((exp, i) => (
                <div key={i} className="experience-item">
                  <strong>
                    {exp.title} — {exp.company}
                  </strong>
                  <span className="duration">{exp.duration}</span>
                  <ul>
                    {exp.highlights?.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {result.strengths?.length > 0 && (
            <section>
              <h4>Strengths</h4>
              <ul className="insight-list insight-list--green">
                {result.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>
          )}

          {result.gaps?.length > 0 && (
            <section>
              <h4>Areas for Improvement</h4>
              <ul className="insight-list insight-list--amber">
                {result.gaps.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;
