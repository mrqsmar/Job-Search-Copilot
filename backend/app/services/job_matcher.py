import json

from app.prompts.job_matcher import JOB_MATCH_PROMPT
from app.services.llm_service import call_claude
from app.services.resume_analyzer import analyze_resume


def match_job(resume_text: str, job_description: str) -> dict:
    """Analyze resume against a job description and return fit scoring."""
    resume_analysis = analyze_resume(resume_text)

    prompt = JOB_MATCH_PROMPT.format(
        resume_analysis=json.dumps(resume_analysis, indent=2),
        job_description=job_description,
    )

    match_result = call_claude(prompt)
    match_result["resume_analysis"] = resume_analysis
    return match_result
