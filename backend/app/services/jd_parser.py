import json

from app.prompts.jd_parser import JD_PARSER_PROMPT
from app.prompts.jd_parser_validation import JD_PARSER_VALIDATION_PROMPT
from app.services.llm_service import call_claude


def parse_job_description(jd_text: str) -> dict:
    """Parse a job description, then validate and auto-correct."""
    # Step 1: initial parse
    parse_prompt = JD_PARSER_PROMPT.format(jd_text=jd_text)
    parsed = call_claude(parse_prompt)

    # Step 2: validation pass
    validation_prompt = JD_PARSER_VALIDATION_PROMPT.format(
        original_jd=jd_text,
        parsed_output=json.dumps(parsed, indent=2),
    )
    validation = call_claude(validation_prompt)

    # Use corrected output when validation finds issues
    if not validation.get("is_valid") and validation.get("corrected_output"):
        final_output = validation["corrected_output"]
    else:
        final_output = parsed

    return {
        "parsed": final_output,
        "validation": {
            "is_valid": validation.get("is_valid", True),
            "issues": validation.get("issues", []),
        },
    }
