import base64
from PyPDF2 import PdfReader
from fastapi import HTTPException
import io

def parse_PDF_from_file(original_pdf: str) -> str:
    # Decode the base64-encoded resume
    try:
        resume_content = base64.b64decode(original_pdf)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid resume data: {e}")

    # Process the resume content (assuming it's a PDF)
    try:
        reader = PdfReader(io.BytesIO(resume_content))
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing resume PDF: {e}")
    
    return text