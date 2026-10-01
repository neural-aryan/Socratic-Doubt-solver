from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend.app.database import get_db
from backend.dependencies import get_current_student
from backend.models.student import Student
from backend.models.practice_question import PracticeQuestion
from backend.models.practice_attempt import PracticeAttempt
from backend.services.llm_client import client, MODEL_NAME
from backend.services.analysis_services import safe_json_parse

router = APIRouter()

class PracticeAnswer(BaseModel):
    question_id: int
    student_answer: str


@router.post('')
def evaluate_practice_attempt(payload: PracticeAnswer, db: Session = Depends(get_db), student: Student = Depends(get_current_student)):
    question = db.query(PracticeQuestion).filter(PracticeQuestion.id == payload.question_id, PracticeQuestion.student_id == student.id).first()
    if not question:
        raise HTTPException(status_code=404, detail='Practice question not found')
    prompt = f'''Evaluate this student's answer. Question: {question.question_text}\nStudent answer: {payload.student_answer}\nReturn JSON {{"is_correct": true/false, "feedback":"brief helpful feedback"}}.'''
    response = client.chat.completions.create(model=MODEL_NAME, messages=[{'role': 'user', 'content': prompt}], response_format={'type': 'json_object'})
    result, _ = safe_json_parse(response.choices[0].message.content or '{}')
    if not result or 'is_correct' not in result:
        raise HTTPException(status_code=502, detail='AI returned invalid evaluation')
    attempt = PracticeAttempt(student_id=student.id, question_id=question.id, student_answer=payload.student_answer,
                              is_correct=bool(result['is_correct']), evaluation_feedback=result.get('feedback'))
    db.add(attempt); db.commit(); db.refresh(attempt)
    return {'id': attempt.id, 'question_id': question.id, 'is_correct': attempt.is_correct, 'feedback': attempt.evaluation_feedback}
