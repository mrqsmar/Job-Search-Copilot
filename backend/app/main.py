from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models.schemas import HealthResponse
from app.routers import resume

app = FastAPI(title="Job Search Copilot API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router)


@app.get("/api/health", response_model=HealthResponse)
def health():
    return HealthResponse(status="ok", version="0.1.0")
