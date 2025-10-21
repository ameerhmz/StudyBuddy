"""Notes API routes"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List
from ...core.database import get_database
from ...models.note import NoteCreate, NoteUpdate, NoteResponse
from ...services.note_service import NoteService
from ...middleware.auth import get_current_active_user
from ...models.user import UserInDB

router = APIRouter()

@router.post("/api/notes", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
async def create_note(
    note: NoteCreate,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Create a new note"""
    note_service = NoteService(db)
    new_note = await note_service.create_note(current_user.id, note)
    return NoteResponse(**new_note.model_dump())

@router.get("/api/notes", response_model=List[NoteResponse])
async def get_notes(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    archived: bool = Query(False),
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Get all notes for current user"""
    note_service = NoteService(db)
    notes = await note_service.get_user_notes(current_user.id, skip, limit, archived)
    return [NoteResponse(**note.model_dump()) for note in notes]

@router.get("/api/notes/search", response_model=List[NoteResponse])
async def search_notes(
    q: str = Query(..., min_length=1),
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Search notes by title or content"""
    note_service = NoteService(db)
    notes = await note_service.search_notes(current_user.id, q)
    return [NoteResponse(**note.model_dump()) for note in notes]

@router.get("/api/notes/{note_id}", response_model=NoteResponse)
async def get_note(
    note_id: str,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Get a specific note"""
    note_service = NoteService(db)
    note = await note_service.get_note_by_id(note_id, current_user.id)
    
    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )
    
    return NoteResponse(**note.model_dump())

@router.put("/api/notes/{note_id}", response_model=NoteResponse)
async def update_note(
    note_id: str,
    note_update: NoteUpdate,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Update a note"""
    note_service = NoteService(db)
    updated_note = await note_service.update_note(note_id, current_user.id, note_update)
    
    if not updated_note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )
    
    return NoteResponse(**updated_note.model_dump())

@router.delete("/api/notes/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_note(
    note_id: str,
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Delete a note"""
    note_service = NoteService(db)
    deleted = await note_service.delete_note(note_id, current_user.id)
    
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )

@router.patch("/api/notes/{note_id}/archive", response_model=NoteResponse)
async def archive_note(
    note_id: str,
    archived: bool = Query(True),
    current_user: UserInDB = Depends(get_current_active_user),
    db = Depends(get_database)
):
    """Archive or unarchive a note"""
    note_service = NoteService(db)
    note = await note_service.archive_note(note_id, current_user.id, archived)
    
    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )
    
    return NoteResponse(**note.model_dump())
