from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.database import Base, engine
from backend.models import student, concept, conversation, practice_question, practice_attempt  # noqa: F401
from backend.routes import auth, solution_analysis, socratic_tutoring, practice_generation, practice_evaluation, progress_history
from backend.app.config import FRONTEND_URL

Base.metadata.create_all(bind=engine)

app = FastAPI(title='Doubt Solver API', version='2.0.0')
app.add_middleware(CORSMiddleware, allow_origins=[FRONTEND_URL, 'http://localhost:5173'], allow_credentials=True,
                   allow_methods=['*'], allow_headers=['*'])

app.include_router(auth.router, prefix='/api/auth', tags=['Authentication'])
app.include_router(solution_analysis.router, prefix='/api/analysis', tags=['Solution Analysis'])
app.include_router(socratic_tutoring.router, prefix='/api/tutoring', tags=['Socratic Tutoring'])
app.include_router(practice_generation.router, prefix='/api/practice/generate', tags=['Practice Generation'])
app.include_router(practice_evaluation.router, prefix='/api/practice/evaluate', tags=['Practice Evaluation'])
app.include_router(progress_history.router, prefix='/api/progress', tags=['Progress & History'])


@app.get('/')
def root(): return {'status': 'ok', 'message': 'Doubt Solver API is running'}


@app.get('/health')
def health_check(): return {'status': 'healthy'}
