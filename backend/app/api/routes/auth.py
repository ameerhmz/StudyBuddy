"""Authentication routes"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from ...core.database import get_database
from ...core.security import create_access_token, create_refresh_token
from ...core.config import settings
from ...models.user import UserCreate, UserResponse, Token
from ...services.user_service import UserService
from ...middleware.auth import get_current_active_user

router = APIRouter()

@router.post("/api/auth/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db = Depends(get_database)):
    """Register a new user"""
    user_service = UserService(db)
    new_user = await user_service.create_user(user)
    return UserResponse(**new_user.model_dump())

@router.post("/api/auth/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db = Depends(get_database)
):
    """Login user and return access token"""
    user_service = UserService(db)
    user = await user_service.authenticate_user(form_data.username, form_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.id})
    refresh_token = create_refresh_token(data={"sub": user.id})
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )

@router.get("/api/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user = Depends(get_current_active_user)):
    """Get current user information"""
    return UserResponse(**current_user.model_dump())

@router.post("/api/auth/refresh", response_model=Token)
async def refresh_token(refresh_token: str, db = Depends(get_database)):
    """Refresh access token"""
    from ...core.security import decode_token
    
    payload = decode_token(refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type"
        )
    
    user_id = payload.get("sub")
    user_service = UserService(db)
    user = await user_service.get_user_by_id(user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    new_access_token = create_access_token(data={"sub": user.id})
    new_refresh_token = create_refresh_token(data={"sub": user.id})
    
    return Token(
        access_token=new_access_token,
        refresh_token=new_refresh_token,
        token_type="bearer"
    )
