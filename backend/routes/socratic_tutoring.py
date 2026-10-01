import json
from fastapi import APIRouter, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.dependencies import get_current_student
from backend.models.student import Student
from backend.models.conversation import Conversation, Message
from backend.services.llm_client import client, MODEL_NAME
from backend.services.analysis_services import safe_json_parse
from backend.services.prompts import build_followup_eval_prompt

router = APIRouter()


def _normalize(s: str) -> str:
    return ''.join(s.lower().split())


@router.post('/follow-up')
async def follow_up(session_id: int = Form(...), student_answer: str = Form(...),
                    db: Session = Depends(get_db), student: Student = Depends(get_current_student)):
    student_answer = ' '.join(student_answer.split())
    if not student_answer:
        raise HTTPException(status_code=400, detail='student_answer is required')
    conversation = db.query(Conversation).filter(Conversation.id == session_id, Conversation.student_id == student.id).first()
    if not conversation:
        raise HTTPException(status_code=404, detail='Tutoring session not found')

    attempt = conversation.attempt
    reconstruction = attempt.reconstruction if attempt else ''
    diagnosis = json.loads(attempt.diagnosis_json) if attempt and attempt.diagnosis_json else {}
    current_question = conversation.current_question
    correct_final_answer = conversation.correct_final_answer
    messages = conversation.messages
    student_msgs = [m.content for m in messages if m.sender == 'student']
    ai_msgs = [m.content for m in messages if m.sender == 'ai']
    turn_count = len(student_msgs) + 1

    if correct_final_answer and _normalize(student_answer) == _normalize(correct_final_answer):
        db.add(Message(conversation_id=conversation.id, sender='student', content=student_answer))
        conversation.current_question = None; conversation.understanding_status = 'understood'
        db.commit()
        return {'session_id': conversation.id, 'turn_count': turn_count, 'understood': True,
                'answer_revealed': False, 'feedback': "That's correct — that's the fully corrected answer.", 'next_question': None}

    history_text = ''.join(f'Tutor asked: {q}\nStudent answered: {a}\n' for q, a in zip(ai_msgs, student_msgs))
    prompt = build_followup_eval_prompt(reconstruction=reconstruction, diagnosis=diagnosis,
                                        current_question=current_question, history_text=history_text,
                                        student_answer=student_answer, turn_count=turn_count)
    response = client.chat.completions.create(model=MODEL_NAME, messages=[{'role': 'user', 'content': prompt}], response_format={'type': 'json_object'})
    result_text = response.choices[0].message.content or '{}'
    result, cleaned = safe_json_parse(result_text)
    if result is None:
        result = {'error': 'Tutor returned invalid JSON', 'raw_response': cleaned}

    db.add(Message(conversation_id=conversation.id, sender='student', content=student_answer))
    next_question = result.get('next_question')
    conversation.current_question = next_question
    if next_question:
        db.add(Message(conversation_id=conversation.id, sender='ai', content=next_question))
    if result.get('understood') and not next_question:
        conversation.understanding_status = 'understood'
    db.commit()
    return {'session_id': conversation.id, 'turn_count': turn_count, **result}
