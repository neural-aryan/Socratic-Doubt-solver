from datetime import datetime
from pydantic import BaseModel, ConfigDict


class PracticeQuestionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    concept: str | None = None
    question_text: str
    difficulty: str | None = None
    created_at: datetime


class PracticeGenerateRequest(BaseModel):
    concept: str | None = None
    count: int = 3


class PracticeAnswerRequest(BaseModel):
    question_id: int
    student_answer: str


class PracticeAttemptResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    question_id: int
    student_answer: str
    is_correct: bool | None = None
    evaluation_feedback: str | None = None
    created_at: datetime