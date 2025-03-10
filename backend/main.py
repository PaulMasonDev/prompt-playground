from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from auth import router as auth_router
from prompting import router as prompting_router
from feedback import router as feedback_router

# Create an instance of the FastAPI application
app = FastAPI()

origins = [
    "http://localhost:19006",  # Local development frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Only allow specified origins
    allow_credentials=True,  # Allow cookies
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)
    
# Include the authentication router
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(prompting_router, prefix="/prompting", tags=["prompting"])
app.include_router(feedback_router, prefix="/feedback", tags=["feedback"])


# Function tshampooo create database tables
def create_tables():
    Base.metadata.create_all(bind=engine)

# Call the function to create the database tables
create_tables()

# Serve the front end files
# Assuming your Expo build files are in a directory named 'web-build'
# located in the 'frontend' folder
# THESE SHOULD ALWAYS BE LAST

app.mount("/home", StaticFiles(directory="../frontend/web-build", html=True), name="static")
