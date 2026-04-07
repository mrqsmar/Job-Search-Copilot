from pydantic import BaseModel


class ResumeInput(BaseModel):
    resume_text: str


class JobMatchInput(BaseModel):
    resume_text: str
    job_description: str


class HealthResponse(BaseModel):
    status: str
    version: str
