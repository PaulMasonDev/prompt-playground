from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi import APIRouter, Cookie, Depends, HTTPException, Request, Response, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
import models
import schemas
from database import SessionLocal
from schemas import Token, TokenData
load_dotenv()
import os

SECRET_KEY = os.getenv('HASH_SECRET')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Utility functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def set_access_token_cookie(response: Response, access_token: str, key:str):
    is_prod = os.getenv('ENVIRONMENT') == 'production'
    response.set_cookie(
        key=key,
        value=access_token,
        httponly=True,
        secure=is_prod,  # True in production, False in development
        samesite="None" if is_prod else "Lax"  # None for cross-origin in production
    )

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return TokenData(username=username)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
        

def get_current_active_user(access_token: str = Cookie(None), db: Session = Depends(get_db)) -> models.User:
    if access_token is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    access_token_data = decode_token(access_token)
    user = db.query(models.User).filter(models.User.username == access_token_data.username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Routes
@router.post("/register", response_model=schemas.User)
def register_user(response: Response, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = get_user(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Create unique settings for the user
    timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
    settings_title = f"{user.username}_{timestamp}"
    db_settings = models.Settings(title=settings_title, user_id=db_user.id)
    db.add(db_settings)
    db.commit()
    db.refresh(db_settings)

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    set_access_token_cookie(response, access_token, "access_token")

    db_user.settings = db_settings
    return db_user

@router.get("/users/me/settings", response_model=schemas.Settings)
def read_user_settings(current_user: models.User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    user_settings = db.query(models.Settings).filter(models.Settings.user_id == current_user.id).first()
    if user_settings is None:
        raise HTTPException(status_code=404, detail="Settings not found")
    return user_settings

@router.get("/users/me", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(get_current_active_user)):
    return current_user

@router.post("/login", response_model=Token)
def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    set_access_token_cookie(response, access_token, "access_token")

    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}
