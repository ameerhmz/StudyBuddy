"""Study Sessions API routes"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List
from ...core.database import get_database
from ...models.study_session import StudySessionCreate, StudySessionResponse, StudySessionComplete
from ...services.study_session_service import StudySessionService
from ...middleware.auth import get_current_active_user
from ...models.user import UserInDB

router = APIRouter()

@router.post("/api/study-sessions", response_model=StudySessionResponse, status_code=status.HTTP_201_CREATED)
async def create_study_session(
    session: StudySessionCreate,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Create a new study session"""
    session_service = StudySessionService(db)
    new_session = await session_service.create_session(current_user.id, session)
    return StudySessionResponse(**new_session.model_dump())

@router.get("/api/study-sessions", response_model=List[StudySessionResponse])
async def get_study_sessions(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Get all study sessions for current user"""
    session_service = StudySessionService(db)
    sessions = await session_service.get_user_sessions(current_user.id, skip, limit)
    return [StudySessionResponse(**s.model_dump()) for s in sessions]

@router.get("/api/study-sessions/stats")
async def get_study_stats(
    days: int = Query(7, ge=1, le=365),
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Get study session statistics"""
    session_service = StudySessionService(db)
    stats = await session_service.get_session_stats(current_user.id, days)
    return stats

@router.get("/api/study-sessions/{session_id}", response_model=StudySessionResponse)
async def get_study_session(
    session_id: str,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Get a specific study session"""
    session_service = StudySessionService(db)
    session = await session_service.get_session_by_id(session_id, current_user.id)
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Study session not found"
        )
    
    return StudySessionResponse(**session.model_dump())

@router.patch("/api/study-sessions/{session_id}/complete", response_model=StudySessionResponse)
async def complete_study_session(
    session_id: str,
    completion: StudySessionComplete,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Mark a study session as completed"""
    session_service = StudySessionService(db)
    completed_session = await session_service.complete_session(
        session_id, current_user.id, completion
    )
    
    if not completed_session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Study session not found"
        )
    
    return StudySessionResponse(**completed_session.model_dump())
