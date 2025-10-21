"""Study session service for Pomodoro timer tracking"""
from typing import List, Optional
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorDatabase
from ..models.study_session import StudySessionCreate, StudySessionInDB, StudySessionComplete

class StudySessionService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.study_sessions
    
    async def create_session(self, user_id: str, session: StudySessionCreate) -> StudySessionInDB:
        """Create a new study session"""
        session_dict = session.model_dump()
        session_dict["user_id"] = user_id
        session_in_db = StudySessionInDB(**session_dict)
        
        await self.collection.insert_one(session_in_db.model_dump())
        return session_in_db
    
    async def get_user_sessions(self, user_id: str, skip: int = 0, limit: int = 100) -> List[StudySessionInDB]:
        """Get all study sessions for a user"""
        cursor = self.collection.find(
            {"user_id": user_id}
        ).sort("start_time", -1).skip(skip).limit(limit)
        
        sessions = []
        async for session_dict in cursor:
            sessions.append(StudySessionInDB(**session_dict))
        
        return sessions
    
    async def get_session_by_id(self, session_id: str, user_id: str) -> Optional[StudySessionInDB]:
        """Get a specific session by ID"""
        session_dict = await self.collection.find_one({"id": session_id, "user_id": user_id})
        if session_dict:
            return StudySessionInDB(**session_dict)
        return None
    
    async def complete_session(self, session_id: str, user_id: str, completion: StudySessionComplete) -> Optional[StudySessionInDB]:
        """Mark a session as completed"""
        result = await self.collection.find_one_and_update(
            {"id": session_id, "user_id": user_id},
            {"$set": completion.model_dump()},
            return_document=True
        )
        
        if result:
            return StudySessionInDB(**result)
        return None
    
    async def get_session_stats(self, user_id: str, days: int = 7) -> dict:
        """Get study session statistics for a user"""
        start_date = datetime.utcnow() - timedelta(days=days)
        
        cursor = self.collection.find({
            "user_id": user_id,
            "start_time": {"$gte": start_date},
            "completed": True
        })
        
        total_sessions = 0
        total_minutes = 0
        sessions_by_type = {}
        
        async for session_dict in cursor:
            session = StudySessionInDB(**session_dict)
            total_sessions += 1
            total_minutes += session.duration_minutes
            
            if session.session_type in sessions_by_type:
                sessions_by_type[session.session_type] += 1
            else:
                sessions_by_type[session.session_type] = 1
        
        return {
            "total_sessions": total_sessions,
            "total_minutes": total_minutes,
            "sessions_by_type": sessions_by_type,
            "period_days": days
        }
