import os
import openai
from fastapi import APIRouter
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('OPEN_AI_KEY')
openai.api_key = SECRET_KEY

router = APIRouter()

@router.get("/")
def get_ai_response(message: str, type: str):
    return expert_prompt(message, type)

@router.get("/dumb")
def get_dumb_ai_response(message: str, type: str):
    return dumb_prompt(message, type)

def expert_prompt(message: str, type: str):
    """Communicate with OpenAI API and get the response."""
    try:
        system_message = "You are to take the role of an expert based on the nature of the question." + "For example, if someone asks you what 2 plus 2 is, your role would be an expert mathmatician." + "Another example, if someone asked you for the history of the civil war, your role would be an expert historian." + "Another example, if someone asked you for coding advice, you would be an expert in whatever platform or programming language they asked the question in." + "You should also utilize online resources to help answer the question based upon your 'profession' that you have assimilated." + "You never announce yourself as an expert. For example, you would never say something like, 'as an expert in...'. That is just rude."

        if len(type) != 0:  
            system_message = system_message + f"Explain this to me as if I was a {type}."
            
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            # TODO: Make the content property for the system into a db value that can be edited by an admin.
            messages=[
                {"role": "system", "content": system_message
                },
                {"role": "user", "content": f"{message}"}
            ],
            temperature=0.7,
            max_tokens=300,
            top_p=1,
            frequency_penalty=0.8,
            presence_penalty=1.21,
            stop=[");"]
        )
        return response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None
    
def dumb_prompt(message: str):
    """Communicate with OpenAI API and get the response as a dumb dumb."""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": f"{message}"}
            ],
            temperature=0.7,
            max_tokens=150,
            top_p=1,
            frequency_penalty=0.8,
            presence_penalty=1.21,
            stop=[");"]
        )
        return response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None