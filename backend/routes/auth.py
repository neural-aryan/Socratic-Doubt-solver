from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.dependencies import get_current_student
from backend.models.student import Student
from backend.schemas.student import AuthResponse, LoginRequest, RegisterRequest, StudentResponse
from backend.services.auth import create_access_token, hash_password, verify_password

router = APIRouter()


@router.post('/register', response_model=AuthResponse, status_code=201)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    email = payload.email.lower()
    if db.query(Student).filter(Student.email == email).first():
        raise HTTPException(status_code=409, detail='An account with this email already exists')
    student = Student(name=payload.name.strip(), email=email, password_hash=hash_password(payload.password))
    db.add(student)
    db.commit()
    db.refresh(student)
    return AuthResponse(access_token=create_access_token(student.id), student=student)


@router.post('/login', response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.email == payload.email.lower()).first()
    if not student or not verify_password(payload.password, student.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid email or password')
    return AuthResponse(access_token=create_access_token(student.id), student=student)


@router.get('/me', response_model=StudentResponse)
def me(student: Student = Depends(get_current_student)):
    return student
