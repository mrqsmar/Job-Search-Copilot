const API_BASE = "http://localhost:8000/api";

export async function analyzeResume(resumeText) {
  const res = await fetch(`${API_BASE}/analyze-resume`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume_text: resumeText }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to analyze resume");
  }
  return res.json();
}

export async function parseJobDescription(jdText) {
  const res = await fetch(`${API_BASE}/parse-jd`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jd_text: jdText }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to parse job description");
  }
  return res.json();
}

export async function matchJob(resumeText, jobDescription) {
  const res = await fetch(`${API_BASE}/match-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resume_text: resumeText,
      job_description: jobDescription,
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to match job");
  }
  return res.json();
}
