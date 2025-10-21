"""Flashcards API routes"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from ...core.database import get_database
from ...models.flashcard import FlashcardCreate, FlashcardUpdate, FlashcardResponse, FlashcardReviewUpdate
from ...services.flashcard_service import FlashcardService
from ...middleware.auth import get_current_active_user
from ...models.user import UserInDB

router = APIRouter()

@router.post("/api/flashcards", response_model=FlashcardResponse, status_code=status.HTTP_201_CREATED)
async def create_flashcard(
    flashcard: FlashcardCreate,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Create a new flashcard"""
    flashcard_service = FlashcardService(db)
    new_flashcard = await flashcard_service.create_flashcard(current_user.id, flashcard)
    return FlashcardResponse(**new_flashcard.model_dump())

@router.get("/api/flashcards", response_model=List[FlashcardResponse])
async def get_flashcards(
    category: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Get all flashcards for current user"""
    flashcard_service = FlashcardService(db)
    flashcards = await flashcard_service.get_user_flashcards(current_user.id, category, skip, limit)
    return [FlashcardResponse(**fc.model_dump()) for fc in flashcards]

@router.get("/api/flashcards/review", response_model=List[FlashcardResponse])
async def get_flashcards_for_review(
    limit: int = Query(20, ge=1, le=50),
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Get flashcards due for review"""
    flashcard_service = FlashcardService(db)
    flashcards = await flashcard_service.get_due_for_review(current_user.id, limit)
    return [FlashcardResponse(**fc.model_dump()) for fc in flashcards]

@router.get("/api/flashcards/{flashcard_id}", response_model=FlashcardResponse)
async def get_flashcard(
    flashcard_id: str,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Get a specific flashcard"""
    flashcard_service = FlashcardService(db)
    flashcard = await flashcard_service.get_flashcard_by_id(flashcard_id, current_user.id)
    
    if not flashcard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flashcard not found"
        )
    
    return FlashcardResponse(**flashcard.model_dump())

@router.put("/api/flashcards/{flashcard_id}", response_model=FlashcardResponse)
async def update_flashcard(
    flashcard_id: str,
    flashcard_update: FlashcardUpdate,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Update a flashcard"""
    flashcard_service = FlashcardService(db)
    updated_flashcard = await flashcard_service.update_flashcard(
        flashcard_id, current_user.id, flashcard_update
    )
    
    if not updated_flashcard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flashcard not found"
        )
    
    return FlashcardResponse(**updated_flashcard.model_dump())

@router.delete("/api/flashcards/{flashcard_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_flashcard(
    flashcard_id: str,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Delete a flashcard"""
    flashcard_service = FlashcardService(db)
    deleted = await flashcard_service.delete_flashcard(flashcard_id, current_user.id)
    
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flashcard not found"
        )

@router.post("/api/flashcards/{flashcard_id}/review", response_model=FlashcardResponse)
async def review_flashcard(
    flashcard_id: str,
    review: FlashcardReviewUpdate,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Record a flashcard review"""
    flashcard_service = FlashcardService(db)
    reviewed_flashcard = await flashcard_service.review_flashcard(
        flashcard_id, current_user.id, review
    )
    
    if not reviewed_flashcard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Flashcard not found"
        )
    
    return FlashcardResponse(**reviewed_flashcard.model_dump())
