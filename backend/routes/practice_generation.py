from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.dependencies import get_current_student
from backend.models.student import Student
from backend.models.practice_question import PracticeQuestion
from backend.services.llm_client import client, MODEL_NAME
from backend.services.analysis_services import safe_json_parse
from backend.schemas.practice import PracticeGenerateRequest

router = APIRouter()


@router.post('', response_model=list[dict])
def generate_practice(payload: PracticeGenerateRequest, db: Session = Depends(get_db), student: Student = Depends(get_current_student)):
    count = min(max(payload.count, 1), 10)
    prompt = f'''Generate {count} short math practice questions for a student. Concept: {payload.concept or "the student's recent weak concepts"}. Return JSON {{"questions":[{{"question_text":"...","difficulty":"easy|medium|hard","concept":"..."}}]}}. Do not include answers.'''
    response = client.chat.completions.create(model=MODEL_NAME, messages=[{'role': 'user', 'content': prompt}], response_format={'type': 'json_object'})
    parsed, _ = safe_json_parse(response.choices[0].message.content or '{}')
    if not parsed or not isinstance(parsed.get('questions'), list):
        raise HTTPException(status_code=502, detail='AI returned invalid practice questions')
    rows = []
    for item in parsed['questions'][:count]:
        if not item.get('question_text'): continue
        q = PracticeQuestion(student_id=student.id, concept=item.get('concept'), question_text=item['question_text'], difficulty=item.get('difficulty'))
        db.add(q); rows.append(q)
    db.commit()
    for q in rows: db.refresh(q)
    return [{'id': q.id, 'student_id': q.student_id, 'concept': q.concept, 'question_text': q.question_text, 'difficulty': q.difficulty, 'created_at': q.created_at} for q in rows]
