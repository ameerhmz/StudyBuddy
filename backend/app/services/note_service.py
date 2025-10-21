"""Note service for notes management"""
from typing import List, Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from fastapi import HTTPException, status
from ..models.note import NoteCreate, NoteUpdate, NoteInDB, NoteResponse

class NoteService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.notes
    
    async def create_note(self, user_id: str, note: NoteCreate) -> NoteInDB:
        """Create a new note"""
        note_dict = note.model_dump()
        note_dict["user_id"] = user_id
        note_in_db = NoteInDB(**note_dict)
        
        await self.collection.insert_one(note_in_db.model_dump())
        return note_in_db
    
    async def get_user_notes(self, user_id: str, skip: int = 0, limit: int = 100, archived: bool = False) -> List[NoteInDB]:
        """Get all notes for a user"""
        cursor = self.collection.find(
            {"user_id": user_id, "is_archived": archived}
        ).sort("updated_at", -1).skip(skip).limit(limit)
        
        notes = []
        async for note_dict in cursor:
            notes.append(NoteInDB(**note_dict))
        
        return notes
    
    async def get_note_by_id(self, note_id: str, user_id: str) -> Optional[NoteInDB]:
        """Get a specific note by ID"""
        note_dict = await self.collection.find_one({"id": note_id, "user_id": user_id})
        if note_dict:
            return NoteInDB(**note_dict)
        return None
    
    async def update_note(self, note_id: str, user_id: str, note_update: NoteUpdate) -> Optional[NoteInDB]:
        """Update a note"""
        update_data = {k: v for k, v in note_update.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await self.collection.find_one_and_update(
            {"id": note_id, "user_id": user_id},
            {"$set": update_data},
            return_document=True
        )
        
        if result:
            return NoteInDB(**result)
        return None
    
    async def delete_note(self, note_id: str, user_id: str) -> bool:
        """Delete a note"""
        result = await self.collection.delete_one({"id": note_id, "user_id": user_id})
        return result.deleted_count > 0
    
    async def archive_note(self, note_id: str, user_id: str, archived: bool = True) -> Optional[NoteInDB]:
        """Archive or unarchive a note"""
        result = await self.collection.find_one_and_update(
            {"id": note_id, "user_id": user_id},
            {"$set": {"is_archived": archived, "updated_at": datetime.utcnow()}},
            return_document=True
        )
        
        if result:
            return NoteInDB(**result)
        return None
    
    async def search_notes(self, user_id: str, query: str) -> List[NoteInDB]:
        """Search notes by title or content"""
        cursor = self.collection.find({
            "user_id": user_id,
            "$or": [
                {"title": {"$regex": query, "$options": "i"}},
                {"content": {"$regex": query, "$options": "i"}}
            ]
        }).sort("updated_at", -1)
        
        notes = []
        async for note_dict in cursor:
            notes.append(NoteInDB(**note_dict))
        
        return notes
