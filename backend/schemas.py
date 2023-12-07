from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

# Settings Schemas
class SettingsBase(BaseModel):
    title: str

class SettingsCreate(SettingsBase):
    pass

class Settings(SettingsBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

# User Schemas
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    settings: Settings
    class Config:
        from_attributes = True

# Feedback Schemas
class FeedbackBase(BaseModel):
    prompt: str
    response: str
    rating: str
    type: str

class FeedbackCreate(FeedbackBase):
    pass

class Feedback(FeedbackBase):
    id: int
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

# Prompt Schemas
class PromptBase(BaseModel):
    prompt: str
    prompt_tokens: int
    response: str
    response_tokens: int
    elapsed_time: float
    response_score: float
    prompt_type: str

class PromptCreate(PromptBase):
    pass

class Prompt(PromptBase):
    id: int
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)


# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None
