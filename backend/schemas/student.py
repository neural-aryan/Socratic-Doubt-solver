from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, field_validator


def normalize_email(value: str) -> str:
    value = value.strip().lower()
    if '@' not in value or value.startswith('@') or value.endswith('@'):
        raise ValueError('Enter a valid email address')
    return value


class RegisterRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: str
    password: str = Field(min_length=8, max_length=128)

    _email = field_validator('email')(normalize_email)


class LoginRequest(BaseModel):
    email: str
    password: str

    _email = field_validator('email')(normalize_email)


class StudentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str | None = None
    email: str
    created_at: datetime


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    student: StudentResponse
