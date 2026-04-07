import { useState } from "react";
import { matchJob } from "../services/api";
import ScoreBar from "../components/ScoreBar";
import SkillTag from "../components/SkillTag";

function JobMatcher() {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMatch = async () => {
    if (!resumeText.trim() || !jobDesc.trim()) {
      setError("Please provide both a resume and a job description.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await matchJob(resumeText, jobDesc);
      setResult(res.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const verdictClass = (verdict) => {
    if (!verdict) return "";
    const v = verdict.toLowerCase();
    if (v.includes("strong")) return "verdict--strong";
    if (v.includes("good")) return "verdict--good";
    if (v.includes("moderate")) return "verdict--moderate";
    return "verdict--weak";
  };

  return (
    <div className="page">
      <h2>Job Matcher</h2>
      <p className="page-subtitle">
        Compare your resume against a job description to see how well you fit.
      </p>

      <div className="two-col">
        <div>
          <label>Resume</label>
          <textarea
            className="text-input"
            rows={10}
            placeholder="Paste your resume text..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>
        <div>
          <label>Job Description</label>
          <textarea
            className="text-input"
            rows={10}
            placeholder="Paste the job description..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>
      </div>

      <button className="btn-primary" onClick={handleMatch} disabled={loading}>
        {loading ? "Matching..." : "Analyze Fit"}
      </button>

      {error && <p className="error-msg">{error}</p>}

      {result && (
        <div className="result-card">
          <div className="match-header">
            <div className="overall-score">{result.overall_score}</div>
            <div>
              <span className={`verdict ${verdictClass(result.verdict)}`}>
                {result.verdict}
              </span>
            </div>
          </div>

          {result.breakdown && (
            <section>
              <h4>Score Breakdown</h4>
              <ScoreBar
                label="Skills Match"
                score={result.breakdown.skills_match?.score || 0}
              />
              <ScoreBar
                label="Experience Match"
                score={result.breakdown.experience_match?.score || 0}
              />
              <ScoreBar
                label="Education Match"
                score={result.breakdown.education_match?.score || 0}
              />
            </section>
          )}

          {result.breakdown?.skills_match && (
            <section>
              <h4>Skills Analysis</h4>
              <p>{result.breakdown.skills_match.reasoning}</p>
              {result.breakdown.skills_match.matched?.length > 0 && (
                <div>
                  <strong>Matched Skills</strong>
                  <div className="tag-list">
                    {result.breakdown.skills_match.matched.map((s) => (
                      <SkillTag key={s} label={s} variant="technical" />
                    ))}
                  </div>
                </div>
              )}
              {result.breakdown.skills_match.missing?.length > 0 && (
                <div>
                  <strong>Missing Skills</strong>
                  <div className="tag-list">
                    {result.breakdown.skills_match.missing.map((s) => (
                      <SkillTag key={s} label={s} variant="missing" />
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {result.recommendations?.length > 0 && (
            <section>
              <h4>Recommendations</h4>
              <ul className="insight-list insight-list--amber">
                {result.recommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {result.talking_points?.length > 0 && (
            <section>
              <h4>Talking Points</h4>
              <ul className="insight-list insight-list--green">
                {result.talking_points.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default JobMatcher;
