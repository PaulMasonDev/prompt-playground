
from fastapi import APIRouter, Depends
from prompt_logging import log_prompt_to_db
from sqlalchemy.orm import Session
from auth import get_db
from pydantic import BaseModel
from file_utils import parse_PDF_from_file

router = APIRouter()

base_url_display = "https://prompt-playground-production.up.railway.app/home/"

def get_generated_message(type: str):
    return f"""Conclude your response at the very end with: 'Generated with
        {type} @ {base_url_display}'"""

def expert_generated_message():
    return get_generated_message("ExpertAI")
def career_craft_generated_message():
    return get_generated_message("CareerCraftAI")
def email_generated_message():
    return get_generated_message("EmailAI")

@router.get("/expert")
def get_ai_response(message: str, type: str, db: Session = Depends(get_db)):
    return expert_prompt(message, type, db)

def expert_prompt(message: str, type: str, db: Session):
    system_message = f"""You are an expert responding based on the question's nature.
        As a mathematician, answer math questions; as a historian, respond to history queries;
        as a programmer, provide coding advice. Avoid declaring expertise directly. Make sure to include the ExpertAI @ message at the end"""

    if len(type) > 0:
        system_message = system_message + f"""You should respond as though you are a {type}.
            If that doesn't make sense, and 'language' is in the type, then you should respond
            in the language of {type}"""
    
    system_message += expert_generated_message()
        
    server_response = log_prompt_to_db(system_message, message, "expert", db, 500)
    
    return server_response

# Career Craft AI Section

emoji_usage = """Ensure that you liberally use emojis to enhance the reponse.""" 
class CoverLetterRequest(BaseModel):
    resume: str
    jobDesc: str
    isCasual: bool
    isHumorous: bool
    isConcise: bool
    isEmoji: bool

@router.post("/cover")
async def get_cover_letter_response(
    request: CoverLetterRequest,
    db: Session = Depends(get_db)
):
    text = parse_PDF_from_file(request.resume)
    return get_cover_letter(
        text,
        request.jobDesc,
        request.isCasual,
        request.isHumorous,
        request.isConcise,
        request.isEmoji,
        db
    )

def get_cover_letter(
    resume: str,
    jobDesc: str,
    isCasual: bool,
    isHumorous: bool,
    isConcise: bool,
    isEmoji: bool,
    db: Session
):
    system_message = f"""As an expert in resume writing and recruitment, your task is to craft a unique and tailored cover letter.
        Draw upon the provided resume, job description, and the company's website to align the letter
        with the company's mission and values. Your writing should be professional, yet imbued with a
        touch of humor to stand out. Strive for a balance between confidence and humility, ensuring
        the letter resonates with authenticity and sincerity. You may use bullet points where you deem necessary
        (use an emoji for them if needed). Bullet points can be a powerful tool
        in a cover letter when used judiciously. They should complement, not replace, the narrative
        flow of your letter. The key is to balance brevity and impact with a personal and engaging tone.
        After the salutation, conclude with a friendly message separate from the cover letter advising them to
        verify the cover letter accuracy with their actual skills and experience before applying to jobs.
        {career_craft_generated_message()}"""
    
    if isEmoji == True:
        system_message += emoji_usage

    message = f"""I need a cover letter written for me.  Here is my resume: ${resume} 
            | Here is the job description: ${jobDesc} """
        
    if isCasual == True:
        message = message + "I also need this to be in a casual yet professional tone."

    if isHumorous == True:
        message = message + "I also need this to use a sense of humor tied to the companies brand."

    if isConcise == True:
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
    server_response = log_prompt_to_db(system_message, message, "cover", db)
    return server_response

class ResumeFeedbackRequest(BaseModel):
    resume: str
    jobDesc: str

@router.post("/resume")
def get_resume_feedback_response(request: ResumeFeedbackRequest, db: Session = Depends(get_db)):
    text = parse_PDF_from_file(request.resume)
    return get_resume_feedback(text, request.jobDesc, db)

def get_resume_feedback(resume: str, jobDesc: str, db: Session):
    system_message = f"""As an expert resume writer, you excel at identifying key
        elements in a user's resume and effectively aligning them with the job description.
        Your approach ensures authenticity, focusing on the user's actual background and experience
        without any embellishment. Conclude with a friendly message advising them to verify the
        resume feedback accuracy with their skills and experience before applying to jobs. {career_craft_generated_message()}"""
    
    message = f"""I need some feedback on how I can beef up my resume based on the job description.  Here is my resume: ${resume} 
        | Here is the job description: ${jobDesc} """
    
    server_response = log_prompt_to_db(system_message, message, "resume", db)
    return server_response

class ResumeRewriteRequest(BaseModel):
    resume: str
    jobDesc: str

@router.post("/rewrite")
def get_resume_rewrite_response(request: ResumeRewriteRequest, db: Session = Depends(get_db)):
    text = parse_PDF_from_file(request.resume)
    return get_resume_rewrite(text, request.jobDesc, db)

def get_resume_rewrite(resume: str, jobDesc: str, db:Session):
    system_message = f"""You are a skilled resume writer with a keen eye for aligning a user's
        existing resume content with a job description. Your task is to expertly rewrite the resume,
        ensuring all information accurately reflects the user's actual background without any fabrication.
        Keep the original format intact, using emojis or unicode characters for bullet points as needed.
        Exclude the job description from your response. After the rewrite, briefly explain the major
        content changes you made, excluding formatting details. Ensure the final version represents
        your rewrite, not the original. Conclude with a friendly message advising them to verify the
        resume's accuracy with their skills and experience before applying to jobs. {career_craft_generated_message()}"""
    
    message = f"""I need rewrite on my resume based on the job description.  Here is my resume: ${resume} 
        | Here is the job description: ${jobDesc} """

    server_response = log_prompt_to_db(system_message, message, "rewrite", db)
    return server_response

@router.get("/email")
def get_email_response(original: str, goal: str, db: Session = Depends(get_db)):
    return get_email_response(original, goal, db)

def get_email_response(original: str, goal: str, db: Session):
    system_message = f"""You are an email communication expert, knowledgeable in proper etiquette
        and ethical strategies to elicit responses. Users will provide you with emails requiring replies.
        Your role is to craft a response that assists them in achieving their specified goals, aiming to
        optimize the outcome of their email exchange. Although outcomes can't be predicted, ensure your
        response is tailored to maximize the user's chances of a favorable result. {email_generated_message()}"""
    
    message = f"""I need an email response to an email I received: {original}."""
    if len(goal) > 0:
        message = message + f"I also want to be sure that it achieves this purpose: {goal}"
    
    server_response = log_prompt_to_db(system_message, message, "email", db)
    return server_response