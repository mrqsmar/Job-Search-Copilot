RESUME_ANALYSIS_PROMPT = """
Analyze the following resume text and extract structured information.

Return a JSON object with this exact schema:
{
  "contact": {
    "name": "string",
    "email": "string or null",
    "phone": "string or null",
    "location": "string or null",
    "linkedin": "string or null"
  },
  "summary": "string — a 2-3 sentence professional summary based on the resume",
  "skills": {
    "technical": ["list of technical/hard skills"],
    "soft": ["list of soft skills mentioned or clearly demonstrated"],
    "tools": ["list of specific tools, platforms, frameworks mentioned"]
  },
  "experience": [
    {
      "title": "string",
      "company": "string",
      "duration": "string",
      "highlights": ["key accomplishments or responsibilities — keep original wording"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "institution": "string",
      "year": "string or null"
    }
  ],
  "certifications": ["list of certifications if any"],
  "strengths": ["top 3-5 professional strengths with brief reasoning"],
  "gaps": ["areas that could be improved or are missing, with reasoning"]
}

Important:
- Only extract what is explicitly stated in the resume.
- For the "strengths" and "gaps" fields, include a brief explanation for each item.
- If a field has no data, use null or an empty array as appropriate.

Resume text:
{resume_text}
"""
