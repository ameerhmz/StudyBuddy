"""Study Session model for Pomodoro timer"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import uuid4

class StudySessionBase(BaseModel):
    duration_minutes: int = Field(..., ge=1, le=120)
    session_type: str = Field(..., pattern="^(pomodoro|short_break|long_break|custom)$")
    subject: Optional[str] = None
    notes: Optional[str] = None

class StudySessionCreate(StudySessionBase):
    pass

class StudySessionInDB(StudySessionBase):
    id: str = Field(default_factory=lambda: str(uuid4()))
    user_id: str
    start_time: datetime = Field(default_factory=datetime.utcnow)
    end_time: Optional[datetime] = None
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class StudySessionResponse(StudySessionBase):
    id: str
    user_id: str
    start_time: datetime
    end_time: Optional[datetime]
    completed: bool

class StudySessionComplete(BaseModel):
    end_time: datetime = Field(default_factory=datetime.utcnow)
    completed: bool = True
