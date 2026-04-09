from fastapi import APIRouter, HTTPException

from app.models.schemas import (
    ResumeInput,
    JobMatchInput,
    JDParserInput,
    ResumeBulletsInput,
    ProfessionalSummaryInput,
)
from app.services.resume_analyzer import analyze_resume
from app.services.job_matcher import match_job
from app.services.jd_parser import parse_job_description
from app.services.resume_bullet_generator import generate_resume_bullets
from app.services.professional_summary_generator import generate_professional_summary

router = APIRouter(prefix="/api", tags=["resume"])


@router.post("/analyze-resume")
def api_analyze_resume(payload: ResumeInput):
    """Analyze a resume and return structured extracted data."""
    if not payload.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty")
    try:
        result = analyze_resume(payload.resume_text)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/match-job")
def api_match_job(payload: JobMatchInput):
    """Match a resume against a job description and return fit analysis."""
    if not payload.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty")
    if not payload.job_description.strip():
        raise HTTPException(
            status_code=400, detail="Job description cannot be empty"
        )
    try:
        result = match_job(payload.resume_text, payload.job_description)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/parse-jd")
def api_parse_jd(payload: JDParserInput):
    """Parse a job description and return structured data."""
    if not payload.jd_text.strip():
        raise HTTPException(
            status_code=400, detail="Job description text cannot be empty"
        )
    try:
        result = parse_job_description(payload.jd_text)
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate-resume-bullets")
def api_generate_resume_bullets(payload: ResumeBulletsInput):
    """Generate tailored resume bullets for a specific job application."""
    if not payload.master_resume.strip():
        raise HTTPException(status_code=400, detail="Master resume cannot be empty")
    if not payload.parsed_jd:
        raise HTTPException(status_code=400, detail="parsed_jd cannot be empty")
    if not payload.match_result:
        raise HTTPException(status_code=400, detail="match_result cannot be empty")
    try:
        result = generate_resume_bullets(
            parsed_jd=payload.parsed_jd,
            match_result=payload.match_result,
            master_resume=payload.master_resume,
            story_bank=payload.story_bank,
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate-professional-summary")
def api_generate_professional_summary(payload: ProfessionalSummaryInput):
    """Generate a tailored professional summary for a specific job application."""
    if not payload.master_resume.strip():
        raise HTTPException(status_code=400, detail="Master resume cannot be empty")
    if not payload.parsed_jd:
        raise HTTPException(status_code=400, detail="parsed_jd cannot be empty")
    if not payload.match_result:
        raise HTTPException(status_code=400, detail="match_result cannot be empty")
    try:
        result = generate_professional_summary(
            parsed_jd=payload.parsed_jd,
            match_result=payload.match_result,
            master_resume=payload.master_resume,
        )
        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
