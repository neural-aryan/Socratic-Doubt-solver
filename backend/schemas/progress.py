from pydantic import BaseModel

from backend.schemas.attempt import AttemptResponse
from backend.schemas.practice import PracticeAttemptResponse


class ProgressSummary(BaseModel):
    total_attempts: int
    total_practice_attempts: int
    accuracy: float | None = None
    weak_concepts: list[str] = []


class ProgressResponse(BaseModel):
    student_id: int
    summary: ProgressSummary
    recent_attempts: list[AttemptResponse] = []
    recent_practice_attempts: list[PracticeAttemptResponse] = []
    recommended_practice: list[str] = []