from typing import List
from pydantic import BaseModel

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

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None
