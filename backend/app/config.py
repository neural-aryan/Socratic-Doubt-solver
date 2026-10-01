import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./doubt_solver.db')
FRONTEND_URL = os.getenv('FRONTEND_URL', 'http://localhost:5173')
JWT_SECRET = os.getenv('JWT_SECRET', 'change-me-in-production')
JWT_EXPIRE_MINUTES = int(os.getenv('JWT_EXPIRE_MINUTES', '1440'))

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
if OPENAI_API_KEY in {'', 'your_api_key_here'}: OPENAI_API_KEY = None
if GEMINI_API_KEY in {'', 'your_api_key_here'}: GEMINI_API_KEY = None
AI_MODEL = os.getenv('AI_MODEL', 'gpt-4o-mini' if OPENAI_API_KEY else 'gemini-2.5-flash')

if JWT_SECRET == 'change-me-in-production':
    # Development default is intentionally allowed; production should set JWT_SECRET.
    pass

if not OPENAI_API_KEY and not GEMINI_API_KEY:
    raise RuntimeError('Set OPENAI_API_KEY or GEMINI_API_KEY in backend/.env')
