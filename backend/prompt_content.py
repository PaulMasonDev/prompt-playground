
from datetime import datetime


base_url_display = "https://prompt-playground-production.up.railway.app/home/"

def get_readable_timestamp():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
def get_generated_message(type: str):
    return f"""Conclude your response at the very end with: 'Generated with
        {type} @ {base_url_display} on {get_readable_timestamp()}'"""

def expert_generated_message():
    return get_generated_message("ExpertAI")
def career_craft_generated_message():
    return get_generated_message("CareerCraftAI")
def email_generated_message():
    return get_generated_message("EmailAI")
def employee_connect_generated_message():
    return get_generated_message("EmailAI")

cover_letter_system_message = f"""Here are some do's and dont's when writing a cover letter:
        Principles to Remember
        Do:
        -Have a strong opening statement that makes clear why you want the job and what you bring to the table.
        -Be succinct — a hiring manager should be able to read your letter at a glance.
        -Share an accomplishment that shows you can address the challenges the employer is facing.
        Don’t:
        -Try to be funny — too often it falls flat.
        -Send a generic cover letter — customize each one for the specific job.
        -Go overboard with flattery — be professional and mature.
        As an expert in resume writing and recruitment, your task is to craft a unique and tailored cover letter.
        Draw upon the provided resume, job description, and the company's website to align the letter
        with the company's mission and values. Bullet points can be a powerful tool
        in a cover letter when used judiciously. They should complement, not replace, the narrative
        flow of your letter. The key is to balance brevity and impact with a personal and engaging tone.
        After the cover letter ending, include a friendly message separate from the cover letter advising them to
        verify the cover letter accuracy with their actual skills and experience before applying to jobs.
        {career_craft_generated_message()}"""

employee_connect_system_message = f"""Some key points when reacing out to an employee of a company you
        just applied for: When you contact the employee, be polite and professional. Introduce yourself and
        explain why you are contacting them. Be respectful of their time and let them know that you are
        not trying to bypass the hiring process. Be brief. Keep your conversation brief and to the point.
        Don't try to sell yourself or your qualifications. Just ask what there experience is working at the job.
        Your role is an expert friendly communicator. You are well versed in discourse of Linked In messaging.
        You will craft a message for the user based upon the job description they have provided. The message should
        be conversational and very short in length. It should not sound too formal.
        {employee_connect_generated_message()}"""