# backend/models/practice_attempt.py
# D5: Practice Attempt Database

from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.app.database import Base


class PracticeAttempt(Base):
    __tablename__ = "practice_attempts"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    question_id = Column(Integer, ForeignKey("practice_questions.id"), nullable=False)

    student_answer = Column(Text, nullable=False)
    is_correct = Column(Boolean, nullable=True)
    evaluation_feedback = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship("Student", back_populates="practice_attempts")
    question = relationship("PracticeQuestion", back_populates="practice_attempts")