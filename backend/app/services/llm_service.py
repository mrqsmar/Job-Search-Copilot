import json

import anthropic

from app.config import ANTHROPIC_API_KEY, CLAUDE_MODEL
from app.prompts.system import APP_SYSTEM_PROMPT


client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)


def call_claude(user_prompt: str) -> dict:
    """Send a prompt to Claude and return the parsed JSON response."""
    message = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=4096,
        system=APP_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )

    raw = message.content[0].text.strip()

    # Strip markdown fences if present
    if raw.startswith("```"):
        lines = raw.split("\n")
        lines = lines[1:]  # remove opening fence
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        raw = "\n".join(lines)

    return json.loads(raw)
