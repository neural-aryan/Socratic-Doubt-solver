from datetime import datetime
from pydantic import BaseModel, ConfigDict


class AttemptStepResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    step_number: int
    step_text: str


class ConceptMistakeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    concept: str | None = None
    mistake: str | None = None
    first_error_step: int | None = None
    confidence: str | None = None
    created_at: datetime


class AttemptResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    question_number: int | None = None
    question_text: str | None = None
    reconstruction: str | None = None
    created_at: datetime

    steps: list[AttemptStepResponse] = []
    concepts_mistakes: list[ConceptMistakeResponse] = []


class DiagnosisResult(BaseModel):
    first_error: int | None = None
    student_step: str | None = None
    previous_step: str | None = None
    why: str | None = None
    misconception: str | None = None
    confidence: str | None = None


class SolveResponse(BaseModel):
    session_id: int
    student_id: int
    attempt_id: int
    reconstruction: str
    diagnosis: DiagnosisResult | dict | None = None
    first_question: str | None = None
    note: str | None = None
    message: str | None = None