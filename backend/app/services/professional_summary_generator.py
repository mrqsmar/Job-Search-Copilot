import json

from app.prompts.professional_summary import PROFESSIONAL_SUMMARY_PROMPT
from app.services.llm_service import call_claude


def generate_professional_summary(
    parsed_jd: dict,
    match_result: dict,
    master_resume: str,
) -> dict:
    """Generate a tailored professional summary for a specific job application."""
    prompt = PROFESSIONAL_SUMMARY_PROMPT.format(
        parsed_jd=json.dumps(parsed_jd, indent=2),
        match_result=json.dumps(match_result, indent=2),
        master_resume=master_resume,
    )
    return call_claude(prompt)
