from fastapi import APIRouter, HTTPException

from app.models.schemas import ResumeInput, JobMatchInput, JDParserInput
from app.services.resume_analyzer import analyze_resume
from app.services.job_matcher import match_job
from app.services.jd_parser import parse_job_description

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
