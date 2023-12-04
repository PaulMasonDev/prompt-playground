from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from auth import router as auth_router  # Import the router from auth.py
# import requests
# import base64

# Create an instance of the FastAPI application
app = FastAPI()

origins = [
    # "https://buyerresist.github.io",  # Production frontend
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
# app.include_router(recipe_router, prefix="/recipe", tags=["recipe"])
# app.include_router(pricing_router, prefix="/product", tags=["product"])


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
