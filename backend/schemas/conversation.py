from datetime import datetime
from pydantic import BaseModel, ConfigDict


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    sender: str
    content: str
    created_at: datetime


class ConversationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    attempt_id: int | None = None
    understanding_status: str | None = None
    created_at: datetime
    messages: list[MessageResponse] = []


class StudentMessageRequest(BaseModel):
    conversation_id: int | None = None
    attempt_id: int | None = None
    message: str


class TutorReplyResponse(BaseModel):
    conversation_id: int
    socratic_question: str
    understanding_status: str | None = None

class FollowUpRequest(BaseModel):
    session_id: int
    student_answer: str


class FollowUpResponse(BaseModel):
    session_id: int
    turn_count: int
    understood: bool | None = None
    answer_revealed: bool | None = None
    feedback: str | None = None
    next_question: str | None = None