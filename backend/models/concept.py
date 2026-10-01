# backend/models/concept.py
# D2: Concept & Mistake Database

from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.app.database import Base


class ConceptMistake(Base):
    __tablename__ = "concept_mistakes"

    id = Column(Integer, primary_key=True, index=True)
    attempt_id = Column(Integer, ForeignKey("attempts.id"), nullable=False)

    concept = Column(String, nullable=True)        # e.g. "Sign errors in inequalities"
    mistake = Column(Text, nullable=True)           # description of what went wrong
    first_error_step = Column(Integer, nullable=True)
    confidence = Column(String, nullable=True)       # High / Medium / Low
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    attempt = relationship("Attempt", back_populates="concepts_mistakes")