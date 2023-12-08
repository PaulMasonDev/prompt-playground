from fastapi import APIRouter, Depends
from prompt_logging import log_prompt_to_db
from sqlalchemy.orm import Session
from pydantic import BaseModel
from auth import get_db
import schemas, models
import os
import openai
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('OPEN_AI_KEY')
openai.api_key = SECRET_KEY

router = APIRouter()

class Feedback(BaseModel):
    prompt: str
    response: str
    rating: str
    type: str

def redact_personally_identifiable_info(user_string: str, db: Session):
    system_message = """
        Your task is to redact personally identifiable information (PII) from the text. Please adhere to the following guidelines:

        1. Redact all sensitive PII, including:
        - Full names (e.g., 'John Doe' should be '[FULL_NAME]')
        - Phone numbers
        - Social security numbers
        - Email addresses
        - LinkedIn profiles and personal websites

        2. Do not redact:
        - General knowledge
        - Basic information such as simple mathematical expressions

        3. In cases of ambiguity (e.g., a name that is also a place), use your discretion to decide whether it qualifies as PII.

        4. If uncertain about whether something is PII, lean towards redaction for safety.

        Remember, the goal is to protect privacy while maintaining the overall meaning and coherence of the text.

        """
    server_response = log_prompt_to_db(system_message, user_string, "redaction", db)
    return server_response

@router.post("/general", response_model=schemas.Feedback)
def post_feedback(feedback: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    # redacted_prompt = redact_personally_identifiable_info(feedback.prompt, db)
    # redacted_response = redact_personally_identifiable_info(feedback.response, db)
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
