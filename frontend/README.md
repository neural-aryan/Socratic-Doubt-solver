# Doubt Solver

Full-stack React + FastAPI application for analyzing handwritten solutions, tutoring, progress tracking, and AI-generated practice.

## Backend

```bash
cd backend
python -m venv .venv
# activate the venv
pip install -r requirements.txt
cp .env.example .env
# set GEMINI_API_KEY or OPENAI_API_KEY and a strong JWT_SECRET
uvicorn backend.app.main:app --reload --port 8000
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_BASE_URL=http://localhost:8000` in `frontend/.env` if needed.

## Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

The frontend stores the bearer token locally and automatically attaches it to API requests. Solve sessions, tutoring conversations, progress, and practice data are scoped to the authenticated student; clients can no longer choose another student's ID.

## AI provider

The backend supports either OpenAI or Gemini's OpenAI-compatible endpoint. Configure exactly one API key and optionally set `AI_MODEL`.
