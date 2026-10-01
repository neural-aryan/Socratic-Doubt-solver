import json
from fastapi import APIRouter, File, UploadFile, Form, HTTPException, Depends
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.dependencies import get_current_student
from backend.models.student import Student, Attempt
from backend.models.concept import ConceptMistake
from backend.models.conversation import Conversation, Message
from backend.services.analysis_services import transcribe_solution, diagnose_solution, generate_correct_answer, generate_first_question

router = APIRouter()


@router.post('/solve')
async def solve(
    question_number: int = Form(...),
    images: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
    student: Student = Depends(get_current_student),
):
    if not images:
        raise HTTPException(status_code=400, detail='At least one image is required.')
    if question_number < 1:
        raise HTTPException(status_code=400, detail='question_number must be at least 1')

    reconstruction = await transcribe_solution(question_number, images)
    if '[UNCLEAR]' in reconstruction:
        attempt = Attempt(student_id=student.id, question_number=question_number, reconstruction=reconstruction)
        db.add(attempt); db.commit(); db.refresh(attempt)
        return {'session_id': None, 'student_id': student.id, 'attempt_id': attempt.id, 'reconstruction': reconstruction,
                'diagnosis': None, 'note': 'Transcription has unclear sections. Please retake the photo with better lighting/focus.'}

    diagnosis = diagnose_solution(reconstruction)
    attempt = Attempt(student_id=student.id, question_number=question_number, reconstruction=reconstruction,
                      diagnosis_json=json.dumps(diagnosis))
    db.add(attempt); db.commit(); db.refresh(attempt)

    conversation = Conversation(student_id=student.id, attempt_id=attempt.id)
    db.add(conversation); db.flush()

    if 'error' in diagnosis:
        db.commit(); db.refresh(conversation)
        return {'session_id': conversation.id, 'student_id': student.id, 'attempt_id': attempt.id,
                'reconstruction': reconstruction, 'diagnosis': diagnosis, 'first_question': None}

    if diagnosis.get('first_error') is None:
        conversation.understanding_status = 'understood'
        db.commit(); db.refresh(conversation)
        return {'session_id': conversation.id, 'student_id': student.id, 'attempt_id': attempt.id,
                'reconstruction': reconstruction, 'diagnosis': diagnosis, 'first_question': None,
                'message': 'No error found — solution appears correct.'}

    db.add(ConceptMistake(attempt_id=attempt.id, mistake=diagnosis.get('misconception'),
                          first_error_step=diagnosis.get('first_error'), confidence=diagnosis.get('confidence')))
    conversation.understanding_status = 'in_progress'
    conversation.correct_final_answer = generate_correct_answer(reconstruction)
    conversation.current_question = generate_first_question(diagnosis)
    if conversation.current_question:
        db.add(Message(conversation_id=conversation.id, sender='ai', content=conversation.current_question))
    db.commit(); db.refresh(conversation)

    return {'session_id': conversation.id, 'student_id': student.id, 'attempt_id': attempt.id,
            'reconstruction': reconstruction, 'diagnosis': diagnosis, 'first_question': conversation.current_question}
