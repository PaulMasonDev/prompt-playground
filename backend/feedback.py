from fastapi import APIRouter, Depends
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

def redact_personally_identifiable_info(user_string: str):
    print("user_str: " + user_string)
    try:
        system_message = """
            Your task is to redact personally identifiable information (PII) from the following text. 
            Do not redact basic information like simple mathematical expressions or general knowledge. 
            Focus on redacting sensitive details like names, phone numbers, social security numbers, email addresses, 
            LinkedIn profiles, and other types of personal contact information or websites. 
            For example, 'My name is Paul Mason' should be changed to 'My name is [FULL_NAME]'. 
            However, do not alter or redact non-sensitive information like the answer to '2 plus 2'.
            """


        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message
                },
                {"role": "user", "content": user_string}
            ],
            temperature=0.7,
            max_tokens=500,
        )
        print("response: " + response.choices[0].message['content'])
        return response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None

@router.post("/general", response_model=schemas.Feedback)
def post_feedback(feedback: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    redacted_prompt = redact_personally_identifiable_info(feedback.prompt)
    redacted_response = redact_personally_identifiable_info(feedback.response)
    db_feedback = models.Feedback(
            prompt=redacted_prompt,
            response=redacted_response,
            rating=feedback.rating,
            type=feedback.type
        )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback
