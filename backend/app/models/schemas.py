from pydantic import BaseModel


class ResumeInput(BaseModel):
    resume_text: str


class JobMatchInput(BaseModel):
    resume_text: str
    job_description: str


class JDParserInput(BaseModel):
    jd_text: str


class ResumeBulletsInput(BaseModel):
    parsed_jd: dict
    match_result: dict
    master_resume: str
    story_bank: list


class ProfessionalSummaryInput(BaseModel):
    parsed_jd: dict
    match_result: dict
    master_resume: str


class HealthResponse(BaseModel):
    status: str
    version: str
