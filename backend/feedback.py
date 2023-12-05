from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from auth import get_db
import schemas, models

router = APIRouter()

class Feedback(BaseModel):
    prompt: str
    response: str
    rating: str
    type: str

@router.post("/general", response_model=schemas.Feedback)
def post_feedback(feedback: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    print("Feedback: " + feedback.prompt)
    db_feedback = models.Feedback(
            prompt=feedback.prompt,
            response=feedback.response,
            rating=feedback.rating,
            type=feedback.type
        )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback
