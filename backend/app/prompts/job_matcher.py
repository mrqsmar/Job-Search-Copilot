JOB_MATCH_PROMPT = """
You are evaluating how well a candidate's resume matches a specific job description.

## Candidate Resume Analysis
{resume_analysis}

## Job Description
{job_description}

Evaluate the fit and return a JSON object with this exact schema:
{{
  "overall_score": "integer 0-100",
  "verdict": "Strong Match | Good Match | Moderate Match | Weak Match | Poor Match",
  "breakdown": {{
    "skills_match": {{
      "score": "integer 0-100",
      "matched": ["skills from the resume that match the job requirements"],
      "missing": ["required skills the candidate lacks"],
      "reasoning": "string — explain the skills assessment"
    }},
    "experience_match": {{
      "score": "integer 0-100",
      "relevant_experience": ["specific experience items that align with the role"],
      "gaps": ["experience areas where the candidate falls short"],
      "reasoning": "string — explain the experience assessment"
    }},
    "education_match": {{
      "score": "integer 0-100",
      "meets_requirements": "boolean",
      "reasoning": "string — explain education fit"
    }}
  }},
  "recommendations": [
    "actionable suggestions for improving the candidate's fit for this role"
  ],
  "talking_points": [
    "key strengths to emphasize in a cover letter or interview for this specific role"
  ]
}}

Scoring guidelines:
- 80-100: Strong Match — candidate meets most/all requirements
- 60-79: Good Match — candidate meets many requirements with minor gaps
- 40-59: Moderate Match — candidate has relevant background but significant gaps
- 20-39: Weak Match — limited alignment, major upskilling needed
- 0-19: Poor Match — candidate's profile does not align with the role

Be honest and precise. Do not inflate scores. A 50 is a real 50.
"""
