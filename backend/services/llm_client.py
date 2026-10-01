from openai import OpenAI
from backend.app.config import OPENAI_API_KEY, GEMINI_API_KEY, AI_MODEL

if OPENAI_API_KEY:
    client = OpenAI(api_key=OPENAI_API_KEY)
elif GEMINI_API_KEY:
    client = OpenAI(api_key=GEMINI_API_KEY, base_url='https://generativelanguage.googleapis.com/v1beta/openai/')
else:
    raise RuntimeError('Set OPENAI_API_KEY or GEMINI_API_KEY')

MODEL_NAME = AI_MODEL
