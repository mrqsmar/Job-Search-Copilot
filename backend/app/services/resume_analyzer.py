from app.prompts.resume_analyzer import RESUME_ANALYSIS_PROMPT
from app.services.llm_service import call_claude


def analyze_resume(resume_text: str) -> dict:
    """Analyze a resume and return structured data."""
    prompt = RESUME_ANALYSIS_PROMPT.format(resume_text=resume_text)
    return call_claude(prompt)
