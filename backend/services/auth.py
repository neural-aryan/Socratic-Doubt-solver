import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone

import jwt

from backend.app.config import JWT_EXPIRE_MINUTES, JWT_SECRET

ALGORITHM = 'HS256'


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 310_000)
    return f'{salt.hex()}${digest.hex()}'


def verify_password(password: str, stored: str) -> bool:
    try:
        salt_hex, digest_hex = stored.split('$', 1)
        expected = bytes.fromhex(digest_hex)
        actual = hashlib.pbkdf2_hmac('sha256', password.encode(), bytes.fromhex(salt_hex), 310_000)
        return hmac.compare_digest(actual, expected)
    except (ValueError, TypeError):
        return False


def create_access_token(student_id: int) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        'sub': str(student_id),
        'iat': now,
        'exp': now + timedelta(minutes=JWT_EXPIRE_MINUTES),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=ALGORITHM)
