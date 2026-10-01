# backend/models/practice_question.py
# D4: Practice Question Database

from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.app.database import Base


class PracticeQuestion(Base):
    __tablename__ = "practice_questions"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    concept = Column(String, nullable=True)   # concept this question targets

    question_text = Column(Text, nullable=False)
    difficulty = Column(String, nullable=True)  # e.g. "easy", "medium", "hard"
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    practice_attempts = relationship("PracticeAttempt", back_populates="question")