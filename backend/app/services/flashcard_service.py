"""Flashcard service for flashcard management"""
from typing import List, Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models.flashcard import FlashcardCreate, FlashcardUpdate, FlashcardInDB, FlashcardReviewUpdate

class FlashcardService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.flashcards
    
    async def create_flashcard(self, user_id: str, flashcard: FlashcardCreate) -> FlashcardInDB:
        """Create a new flashcard"""
        flashcard_dict = flashcard.model_dump()
        flashcard_dict["user_id"] = user_id
        flashcard_in_db = FlashcardInDB(**flashcard_dict)
        
        await self.collection.insert_one(flashcard_in_db.model_dump())
        return flashcard_in_db
    
    async def get_user_flashcards(self, user_id: str, category: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[FlashcardInDB]:
        """Get all flashcards for a user"""
        query = {"user_id": user_id}
        if category:
            query["category"] = category
        
        cursor = self.collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
        
        flashcards = []
        async for flashcard_dict in cursor:
            flashcards.append(FlashcardInDB(**flashcard_dict))
        
        return flashcards
    
    async def get_flashcard_by_id(self, flashcard_id: str, user_id: str) -> Optional[FlashcardInDB]:
        """Get a specific flashcard by ID"""
        flashcard_dict = await self.collection.find_one({"id": flashcard_id, "user_id": user_id})
        if flashcard_dict:
            return FlashcardInDB(**flashcard_dict)
        return None
    
    async def update_flashcard(self, flashcard_id: str, user_id: str, flashcard_update: FlashcardUpdate) -> Optional[FlashcardInDB]:
        """Update a flashcard"""
        update_data = {k: v for k, v in flashcard_update.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await self.collection.find_one_and_update(
            {"id": flashcard_id, "user_id": user_id},
            {"$set": update_data},
            return_document=True
        )
        
        if result:
            return FlashcardInDB(**result)
        return None
    
    async def delete_flashcard(self, flashcard_id: str, user_id: str) -> bool:
        """Delete a flashcard"""
        result = await self.collection.delete_one({"id": flashcard_id, "user_id": user_id})
        return result.deleted_count > 0
    
    async def review_flashcard(self, flashcard_id: str, user_id: str, review: FlashcardReviewUpdate) -> Optional[FlashcardInDB]:
        """Record a flashcard review and update mastery level"""
        flashcard = await self.get_flashcard_by_id(flashcard_id, user_id)
        if not flashcard:
            return None
        
        # Update mastery level based on correctness
        new_mastery = flashcard.mastery_level
        if review.correct:
            new_mastery = min(5, flashcard.mastery_level + 1)
        else:
            new_mastery = max(0, flashcard.mastery_level - 1)
        
        result = await self.collection.find_one_and_update(
            {"id": flashcard_id, "user_id": user_id},
            {
                "$set": {
                    "last_reviewed": datetime.utcnow(),
                    "mastery_level": new_mastery,
                    "updated_at": datetime.utcnow()
                },
                "$inc": {"times_reviewed": 1}
            },
            return_document=True
        )
        
        if result:
            return FlashcardInDB(**result)
        return None
    
    async def get_due_for_review(self, user_id: str, limit: int = 20) -> List[FlashcardInDB]:
        """Get flashcards that are due for review (least recently reviewed)"""
        cursor = self.collection.find(
            {"user_id": user_id}
        ).sort([("last_reviewed", 1), ("mastery_level", 1)]).limit(limit)
        
        flashcards = []
        async for flashcard_dict in cursor:
            flashcards.append(FlashcardInDB(**flashcard_dict))
        
        return flashcards
