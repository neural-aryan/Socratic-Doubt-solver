from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.app.database import Base


class Student(Base):
    __tablename__ = 'students'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    attempts = relationship('Attempt', back_populates='student', cascade='all, delete-orphan')
    conversations = relationship('Conversation', back_populates='student', cascade='all, delete-orphan')
    practice_attempts = relationship('PracticeAttempt', back_populates='student', cascade='all, delete-orphan')


class Attempt(Base):
    __tablename__ = 'attempts'

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey('students.id'), nullable=False)
    question_number = Column(Integer, nullable=True)
    question_text = Column(Text, nullable=True)
    reconstruction = Column(Text, nullable=True)
    diagnosis_json = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    student = relationship('Student', back_populates='attempts')
    steps = relationship('AttemptStep', back_populates='attempt', cascade='all, delete-orphan')
    concepts_mistakes = relationship('ConceptMistake', back_populates='attempt', cascade='all, delete-orphan')
    conversations = relationship('Conversation', back_populates='attempt')


class AttemptStep(Base):
    __tablename__ = 'attempt_steps'

    id = Column(Integer, primary_key=True, index=True)
    attempt_id = Column(Integer, ForeignKey('attempts.id'), nullable=False)
    step_number = Column(Integer, nullable=False)
    step_text = Column(Text, nullable=False)
    attempt = relationship('Attempt', back_populates='steps')
