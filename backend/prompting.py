import os
import openai
from fastapi import APIRouter
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('OPEN_AI_KEY')
openai.api_key = SECRET_KEY

router = APIRouter()

@router.get("/expert")
def get_ai_response(message: str, type: str):
    return expert_prompt(message, type)

def expert_prompt(message: str, type: str):
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

        if len(type) > 0:
            system_message = system_message + f"You should respond as though you are a {type}. If that doesn't make sense, and 'language' is in the type, then you should respond in the language of {type}"

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
        )
        return response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None
    
@router.get("/cover")
def get_cover_letter_response(resume: str, jobDesc: str, isCasual: str, isHumorous: str, isConcise: str):
    return get_cover_letter(resume, jobDesc, isCasual, isHumorous, isConcise)

def get_cover_letter(resume: str, jobDesc: str, isCasual: str, isHumorous: str, isConcise: str):
    try:
        system_message = """You are an expert resume writer, top recruiter, expert hiring manager, 
            and expert cover letter writer. You are also have a very good sense of style when it comes to writing.
            Make sure you combine everything from the resume, job description, and url of the website to 
            ensure that the cover letter is extremely tailored. You will need to find the company website 
            for the user based upon the job description and scan the site to find the mission and 
            core values to ensure that is tied into the cover letter. You should also take a professional but humorous approach to it.
            So that its not 'just another AI generated cover letter'. It needs to have heart and soul. But it should not be too arrogant or proud.
            It needs to be confident but humble.
            Also, prepend to your AI response the following: 'Word Count:<word count>',
            where 'word count' is the amount of words in the cover letter."""
        
        message = f"""I need a cover letter written for me.  Here is my resume: ${resume} 
            | Here is the job description: ${jobDesc} """
        
        if isCasual == "true":
            message = message + "I also need this to be in a casual yet professional tone."

        if isHumorous == "true":
            message = message + "I also need this to use a sense of humor tied to the companies brand."

        if isConcise == "true":
            message = message + """I also need this to be a concise cover letter.
                Something that is easily digestible and not too wordy.
                It should be no more than 100 to 200 words.
                Here are some tips for keeping a cover letter concise:
                Get Straight to the Point: Start with a clear introduction and state the purpose of your letter
                in the first paragraph.
                Highlight Key Points: Focus on the most relevant qualifications and experiences that
                align with the job requirements.
                Avoid Redundancy: Dont repeat information thats already in your resume.
                Instead, provide context or additional insights that arent evident from the resume.
                Be Clear and Direct: Use clear and straightforward language. Avoid jargon,
                overly complex sentences, and unnecessary filler words.
                Strong Closing: End with a strong closing statement, expressing your enthusiasm
                for the role and the value you would bring to the company. 
                """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message
                },
                {"role": "user", "content": f"{message}"}
            ],
            temperature=0.7,
            max_tokens=1000,
        )
        return response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None

@router.get("/resume")
def get_resume_feedback_response(resume: str, jobDesc: str):
    return get_resume_feedback(resume, jobDesc)

def get_resume_feedback(resume: str, jobDesc: str):
    try:
        system_message = """You are an expert resume writer.  You have a very sharp eye for locating what the user currently
            has in their resume and tying it to what's in the job description. You do this masterfully.  You also make sure that
            it is not making anything up along the way, but tied specifically to the user's background based on their resume."""
        
        message = f"""I need some feedback on how I can beef up my resume based on the job description.  Here is my resume: ${resume} 
            | Here is the job description: ${jobDesc} """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message
                },
                {"role": "user", "content": f"{message}"}
            ],
            temperature=0.7,
            max_tokens=1000,
        )
        return response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None
    
@router.get("/rewrite")
def get_resume_rewrite_response(resume: str, jobDesc: str):
    return get_resume_rewrite(resume, jobDesc)

def get_resume_rewrite(resume: str, jobDesc: str):
    try:
        system_message = """You are an expert resume writer.  You have a very sharp eye for locating
            what the user currently has in their resume and tying it to what's in the job description.
            You do this masterfully.  You also make sure that it is not making anything up along the way,
            but tied specifically to the user's background based on their resume. Rather than give suggestions,
            you will rewrite the resume trying to keep the format as best as possible. If there are bullet
            points at all, you should be able to replicate those with some sort of emoji or unicode character.
            You DO NOT need to include the job description in your response. At the end of your rewrite,
            talk about the specific changes you made and why (you don't need to talk about formatting changes at all,
            just content). You may need to do a check between the original resume and the rewrite to ensure
            you don't falsely claim a change that it was your change and not the original. 
            Make sure your new resume you give back is the rewrite and not
            the original resume. Add a disclaimer at the end that states that they should be sure
            to proof the rewrite for accuracy to their actual skill set before sending it to any
            prospective employers"""
        
        message = f"""I need rewrite on my resume based on the job description.  Here is my resume: ${resume} 
            | Here is the job description: ${jobDesc} """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message
                },
                {"role": "user", "content": f"{message}"}
            ],
            temperature=0.7,
            max_tokens=1000,
        )
        return response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None


@router.get("/email")
def get_email_response(original: str, goal: str):
    return get_email_response(original, goal)

def get_email_response(original: str, goal: str):
    try:
        system_message = """You are an expert in all things email.  You know the right etiquette to use.
            you know the best techniques to use to get responses from people. (All ethical techniques). The user will
            be presenting you with an email they need a response to. And your job is to come up with an email that will help them respond
            and help them with a specific goal if they include it. While you can't predict the future,
            try to do everything you can to ensure that the user can get the best outcome from the e-mail response you create."""
        
        message = f"""I need an email response to an email I received: {original}."""
        if len(goal) > 0:
            message = message + f"I also want to be sure that it achieves this purpose: {goal}"
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_message
                },
                {"role": "user", "content": f"{message}"}
            ],
            temperature=0.7,
            max_tokens=1000,
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
        )
        return response.choices[0].message['content']
    except Exception as e:
        print('ERROR:', e)
        return None