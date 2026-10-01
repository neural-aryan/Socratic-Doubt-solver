from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from backend.app.database import get_db

router = APIRouter()


@router.post("/upload")
async def upload_input(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    return {
        "filename": file.filename,
        "message": "Input received — processing not yet implemented",
    }