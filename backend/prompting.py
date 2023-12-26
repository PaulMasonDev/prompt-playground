
from fastapi import APIRouter, Depends
from prompt_logging import log_prompt_to_db
from sqlalchemy.orm import Session
from auth import get_db
from pydantic import BaseModel
from file_utils import parse_PDF_from_file
from prompt_content import career_craft_generated_message, cover_letter_system_message, interview_questions_generated_message, resume_rewrite_system_message, employee_connect_system_message, email_generated_message, expert_generated_message

router = APIRouter()

gpt_4_model="gpt-4-1106-preview"

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
    extra: str
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
        request.extra,
        request.isCasual,
        request.isHumorous,
        request.isConcise,
        request.isEmoji,
        db
    )

def get_cover_letter(
    resume: str,
    jobDesc: str,
    extra: str,
    isCasual: bool,
    isHumorous: bool,
    isConcise: bool,
    isEmoji: bool,
    db: Session
):
    system_message = cover_letter_system_message
    
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
    
    if len(extra) > 0:
        message += f"""I would also like you to weave this piece of information into the cover
            letter as well: ${extra}"""
        
    server_response = log_prompt_to_db(system_message, message, "cover", db, 1000, gpt_4_model)
    return server_response

class ResumeFeedbackRequest(BaseModel):
    resume: str
    jobDesc: str
    extra: str

@router.post("/resume")
def get_resume_feedback_response(request: ResumeFeedbackRequest, db: Session = Depends(get_db)):
    text = parse_PDF_from_file(request.resume)
    return get_resume_feedback(text, request.jobDesc, request.extra, db)

def get_resume_feedback(resume: str, jobDesc: str, extra: str, db: Session):
    system_message = f"""As an expert resume writer, you excel at identifying key
        elements in a user's resume and effectively aligning them with the job description.
        Your approach ensures authenticity, focusing on the user's actual background and experience
        without any embellishment. After the feedback, give a friendly message advising them to verify the
        resume feedback accuracy with their skills and experience before applying to jobs. {career_craft_generated_message()}"""
    
    message = f"""I need some feedback on how I can beef up my resume based on the job description.  Here is my resume: ${resume} 
        | Here is the job description: ${jobDesc} """
    
    if len(extra) > 0:
        message += f"""I would also like you to weave this piece of information into the feedback as well: ${extra}"""
    
    server_response = log_prompt_to_db(system_message, message, "resume", db, 1000)
    return server_response

class ResumeRewriteRequest(BaseModel):
    resume: str
    jobDesc: str
    extra: str

@router.post("/rewrite")
def get_resume_rewrite_response(request: ResumeRewriteRequest, db: Session = Depends(get_db)):
    text = parse_PDF_from_file(request.resume)
    return get_resume_rewrite(text, request.jobDesc, request.extra, db)

def get_resume_rewrite(resume: str, jobDesc: str, extra: str, db:Session):
    # Chat GPT-4 message:
    system_message = f"""You are an expert resume writer. Be prepared to rewrite a resume to better
        align with a specific job description. Where applicable, try to use specific value add statements
        such as "Enhanced conversion rates by X% with the implementation of this feature." 
        The job description information and existing resume will be provided by a user. Use that resume as a base,
        ensuring all information reflects the user's real background without fabrication. First, identify 
        places where the resume should be updated. Go through each of those places and update them.
        After the rewrites, place them in the appropriate places back into the original resume provided
        by the user. Also provide a brief explanation of the major content changes made, excluding
        formatting details. Conclude with a reminder for the user to verify the accuracy of the resume
        in relation to their skills and experience before applying for jobs. {career_craft_generated_message()}"""
    # system_message = resume_rewrite_system_message
    message = f"""I need rewrite on my resume based on the job description.  Here is my resume: ${resume} 
        | Here is the job description: ${jobDesc} """
    
    if len(extra) > 0:
        message += f"""I would also like you to weave this piece of information into the rewrite as well: ${extra}"""

    server_response = log_prompt_to_db(system_message, message, "rewrite", db, 1000, gpt_4_model)
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
    
    server_response = log_prompt_to_db(system_message, message, "email", db, 1000, gpt_4_model)
    return server_response

class EmployeeConnectRequest(BaseModel):
    jobDesc: str
    name: str
    title: str

@router.post("/employee-connect")
def get_employee_connect_response(request: EmployeeConnectRequest, db: Session = Depends(get_db)):
    return get_employee_connect(request, db)

def get_employee_connect(request: EmployeeConnectRequest, db: Session):
    system_message = employee_connect_system_message
    
    message = f"""There is an employee I am reaching out to. Here is the job description for
        the company that the employee is a part of who I am reaching out to. Job Desc: {request.jobDesc}. 
        The name of the person is {request.name} and their title is {request.title}. You can contextualize your message
        to their title. There is a limit of 200 characters to this message as well"""
    
    server_response = log_prompt_to_db(system_message, message, "employee-connect", db, 1000, gpt_4_model)
    return server_response

class InterviewQuestionsRequest(BaseModel):
    jobDesc: str
    website: str
    number: str

@router.post("/interview-questions")
def get_interview_questions(request: InterviewQuestionsRequest, db: Session = Depends(get_db)):
    return get_interview_questions_response(request, db)

def get_interview_questions_response(request: InterviewQuestionsRequest, db: Session):
    system_message = f"""You are an expert at coming up with interview questions an applicant would have for a prospective company
        based upon years of experience in the recruiting industry. You know the types of questions to come up with that really identify workplace culture
        through an interview. Your job is to generate with a list of {request.number} question(s).  The user will provide a job
        description and optional website to assist with you coming up with the questions. {interview_questions_generated_message}"""
    
    message = f"""I need a list of {request.number} questions for a job interview I have coming up. 
        Here is my job desc: {request.jobDesc}."""

    if len(request.website) > 0:
        message += f"""Here is the website: {request.website}"""
    
    server_response = log_prompt_to_db(system_message, message, "interview-questions", db, 1000, gpt_4_model)
    return server_response    