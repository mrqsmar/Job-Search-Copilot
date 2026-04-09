import json

from app.prompts.recruiter_outreach import RECRUITER_OUTREACH_PROMPT
from app.services.llm_service import call_claude


def generate_recruiter_outreach(
    parsed_jd: dict,
    match_result: dict,
    candidate_name: str,
    recruiter_name: str | None,
) -> dict:
    """Generate a tailored recruiter outreach message for a specific role."""
    prompt = RECRUITER_OUTREACH_PROMPT.format(
        parsed_jd=json.dumps(parsed_jd, indent=2),
        match_result=json.dumps(match_result, indent=2),
        candidate_name=candidate_name,
        recruiter_name=recruiter_name if recruiter_name is not None else "null",
    )
    return call_claude(prompt)
