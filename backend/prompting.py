import os
import openai
from fastapi import APIRouter
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('OPEN_AI_KEY')
openai.api_key = SECRET_KEY

router = APIRouter()

@router.get("/")
def get_ai_response(message: str):
    return expert_prompt(message)

def expert_prompt(message: str):
    try:
        system_message = """You are to take the role of an expert based on the nature of the question.
            For example, if someone asks you what 2 plus 2 is, your role would be an expert mathmatician.
            Another example, if someone asked you for the history of the civil war, your role would be an
            expert historian. Another example, if someone asked you for coding advice,
            you would be an expert in whatever platform or programming language they asked the question in.
            You should also utilize online resources to help answer the question based upon your 'profession'
            that you have assimilated." + "You never announce yourself as an expert
            For example, you would never say something like, 'as an expert in...'. That is just rude.
            If they talk about hurting themselves or harming others, you need to refer them to call 911 or seek medical
            assistance as soon as possible, and make it clear that you cannot help them with those types of inquiries
            in a polite manner."""

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
            max_tokens=500,
            stop=[");"]
        )
        return response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None
    
@router.get("/cover")
def get_cover_letter_response(resume: str, jobDesc: str):
    return get_cover_letter(resume, jobDesc)

def get_cover_letter(resume: str, jobDesc: str):
    try:
        system_message = """You are an expert resume writer, top recruiter, expert hiring manager, 
            and expert cover letter writer. You are also have a very good sense of style when it comes to writing.
            Make sure you combine everything from the resume, job description, and url of the website to 
            ensure that the cover letter is extremely tailored. You will need to find the company website 
            for the user based upon the job description and scan the site to find the mission and 
            core values to ensure that is tied into the cover letter. You should also take a professional but humorous approach to it.
            So that its not 'just another AI generated cover letter'. It needs to have heart and soul. But it should not be too arrogant or proud.
            It needs to be confident but humble."""
        
        message = f"""I need a cover letter written for me.  Here is my resume: ${resume} 
            | Here is the job description: ${jobDesc} """
            # | and here is the url to the website for the company: ${url}"""
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message
                },
                {"role": "user", "content": f"{message}"}
            ],
            temperature=0.7,
            max_tokens=1000,
            stop=[");"]
        )
        return response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None

@router.get("/dumb")
def get_dumb_ai_response(message: str):
    return dumb_prompt(message)

    
def dumb_prompt(message: str):
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