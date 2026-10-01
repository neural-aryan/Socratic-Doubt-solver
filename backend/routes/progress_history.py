import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.dependencies import get_current_student
from backend.models.student import Student, Attempt
from backend.models.practice_attempt import PracticeAttempt
from backend.schemas.progress import ProgressResponse

router = APIRouter()


@router.get('', response_model=ProgressResponse)
def get_progress(db: Session = Depends(get_db), student: Student = Depends(get_current_student)):
    attempts = db.query(Attempt).filter(Attempt.student_id == student.id).order_by(Attempt.created_at.desc()).limit(20).all()
    practice = db.query(PracticeAttempt).filter(PracticeAttempt.student_id == student.id).order_by(PracticeAttempt.created_at.desc()).limit(20).all()
    total_practice = db.query(PracticeAttempt).filter(PracticeAttempt.student_id == student.id).count()
    correct = db.query(PracticeAttempt).filter(PracticeAttempt.student_id == student.id, PracticeAttempt.is_correct.is_(True)).count()
    accuracy = round(correct / total_practice * 100, 1) if total_practice else None
    weak = []
    for attempt in attempts:
        if attempt.diagnosis_json:
            try:
                misconception = json.loads(attempt.diagnosis_json).get('misconception')
                if misconception and misconception not in weak:
                    weak.append(misconception)
            except json.JSONDecodeError:
                pass
    return {'student_id': student.id,
            'summary': {'total_attempts': db.query(Attempt).filter(Attempt.student_id == student.id).count(),
                        'total_practice_attempts': total_practice, 'accuracy': accuracy, 'weak_concepts': weak[:5]},
            'recent_attempts': attempts, 'recent_practice_attempts': practice,
            'recommended_practice': weak[:3]}
