"""Flashcard model"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import uuid4

class FlashcardBase(BaseModel):
    question: str = Field(..., min_length=1)
    answer: str = Field(..., min_length=1)
    category: Optional[str] = None
    difficulty: Optional[str] = Field(default="medium", pattern="^(easy|medium|hard)$")

class FlashcardCreate(FlashcardBase):
    pass

class FlashcardUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    category: Optional[str] = None
    difficulty: Optional[str] = None

class FlashcardInDB(FlashcardBase):
    id: str = Field(default_factory=lambda: str(uuid4()))
    user_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    times_reviewed: int = 0
    last_reviewed: Optional[datetime] = None
    mastery_level: int = 0  # 0-5 scale

class FlashcardResponse(FlashcardBase):
    id: str
    user_id: str
    created_at: datetime
    times_reviewed: int
    mastery_level: int

class FlashcardReviewUpdate(BaseModel):
    correct: bool
