from app.prompts.jd_parser import JD_PARSER_PROMPT
from app.services.llm_service import call_claude


def parse_job_description(jd_text: str) -> dict:
    """Parse a job description and return structured data."""
    prompt = JD_PARSER_PROMPT.format(jd_text=jd_text)
    return call_claude(prompt)
