from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    settings = relationship("Settings", back_populates="owner", uselist=False)

class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="settings")

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, index=True)
    prompt = Column(String)
    response = Column(String)
    rating = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class Prompt(Base):
    __tablename__ = "prompt"

    id = Column(Integer, primary_key=True, index=True)
    prompt = Column(String)
    prompt_tokens = Column(Integer)
    response = Column(String)
    response_tokens = Column(Integer)
    prompt_type = Column(String)
    response_score = Column(Float)
    elapsed_time = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

