import { useState } from "react";
import { parseJobDescription } from "../services/api";
import SkillTag from "../components/SkillTag";

function JDParser() {
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleParse = async () => {
    if (!jdText.trim()) {
      setError("Please paste a job description.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await parseJobDescription(jdText);
      setResult(res.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>JD Parser</h2>
      <p className="page-subtitle">
        Paste a job description to extract structured data for your prep.
      </p>

      <textarea
        className="text-input"
        rows={12}
        placeholder="Paste the job description here..."
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
      />

      <button className="btn-primary" onClick={handleParse} disabled={loading}>
        {loading ? "Parsing..." : "Parse JD"}
      </button>

      {error && <p className="error-msg">{error}</p>}

      {result && (
        <div className="result-card">
          <h3>
            {result.title || "Parsed Job Description"}
            {result.company && ` — ${result.company}`}
          </h3>

          {(result.seniority || result.location || result.remote_policy) && (
            <section>
              <div className="jd-meta">
                {result.seniority && (
                  <span className="jd-meta-item">
                    Seniority: <strong>{result.seniority}</strong>
                  </span>
                )}
                {result.location && (
                  <span className="jd-meta-item">
                    Location: <strong>{result.location}</strong>
                  </span>
                )}
                {result.remote_policy &&
                  result.remote_policy !== "unspecified" && (
                    <span className="jd-meta-item">
                      Remote: <strong>{result.remote_policy}</strong>
                    </span>
                  )}
              </div>
            </section>
          )}

          {(result.product_area || result.domain) && (
            <section>
              <h4>Product Area & Domain</h4>
              <p>
                {[result.product_area, result.domain]
                  .filter(Boolean)
                  .join(" — ")}
              </p>
            </section>
          )}

          {result.required_skills?.length > 0 && (
            <section>
              <h4>Required Skills</h4>
              <div className="tag-list">
                {result.required_skills.map((s) => (
                  <SkillTag key={s} label={s} variant="technical" />
                ))}
              </div>
            </section>
          )}

          {result.preferred_skills?.length > 0 && (
            <section>
              <h4>Preferred Skills</h4>
              <div className="tag-list">
                {result.preferred_skills.map((s) => (
                  <SkillTag key={s} label={s} variant="tools" />
                ))}
              </div>
            </section>
          )}

          {result.role_themes?.length > 0 && (
            <section>
              <h4>Role Themes</h4>
              <ul className="insight-list insight-list--green">
                {result.role_themes.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>
          )}

          {result.likely_pain_points?.length > 0 && (
            <section>
              <h4>Likely Pain Points</h4>
              <ul className="insight-list insight-list--amber">
                {result.likely_pain_points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </section>
          )}

          {result.interview_focus?.length > 0 && (
            <section>
              <h4>Interview Focus</h4>
              <div className="tag-list">
                {result.interview_focus.map((f) => (
                  <SkillTag key={f} label={f} />
                ))}
              </div>
            </section>
          )}

          {result.keywords?.length > 0 && (
            <section>
              <h4>ATS Keywords</h4>
              <div className="tag-list">
                {result.keywords.map((k) => (
                  <SkillTag key={k} label={k} variant="technical" />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default JDParser;
