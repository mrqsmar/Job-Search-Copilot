import json

from app.prompts.resume_bullets import RESUME_BULLETS_PROMPT
from app.services.llm_service import call_claude


def generate_resume_bullets(
    parsed_jd: dict,
    match_result: dict,
    master_resume: str,
    story_bank: list,
) -> dict:
    """Generate tailored resume bullets for a specific job application."""
    prompt = RESUME_BULLETS_PROMPT.format(
        parsed_jd=json.dumps(parsed_jd, indent=2),
        match_result=json.dumps(match_result, indent=2),
        master_resume=master_resume,
        story_bank=json.dumps(story_bank, indent=2),
    )
    return call_claude(prompt)
