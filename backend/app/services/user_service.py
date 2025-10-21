"""User service for authentication and user management"""
from typing import Optional
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase
from fastapi import HTTPException, status
from ..models.user import UserCreate, UserUpdate, UserInDB, UserResponse
from ..core.security import get_password_hash, verify_password

class UserService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.users
    
    async def create_user(self, user: UserCreate) -> UserInDB:
        """Create a new user"""
        # Check if user exists
        existing_user = await self.collection.find_one(
            {"$or": [{"email": user.email}, {"username": user.username}]}
        )
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email or username already exists"
            )
        
        # Create user
        user_dict = user.model_dump()
        user_dict["hashed_password"] = get_password_hash(user_dict.pop("password"))
        user_in_db = UserInDB(**user_dict)
        
        await self.collection.insert_one(user_in_db.model_dump())
        return user_in_db
    
    async def authenticate_user(self, username: str, password: str) -> Optional[UserInDB]:
        """Authenticate user by username/email and password"""
        user_dict = await self.collection.find_one(
            {"$or": [{"email": username}, {"username": username}]}
        )
        if not user_dict:
            return None
        
        user = UserInDB(**user_dict)
        if not verify_password(password, user.hashed_password):
            return None
        
        return user
    
    async def get_user_by_id(self, user_id: str) -> Optional[UserInDB]:
        """Get user by ID"""
        user_dict = await self.collection.find_one({"id": user_id})
        if user_dict:
            return UserInDB(**user_dict)
        return None
    
    async def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        """Get user by email"""
        user_dict = await self.collection.find_one({"email": email})
        if user_dict:
            return UserInDB(**user_dict)
        return None
    
    async def update_user(self, user_id: str, user_update: UserUpdate) -> Optional[UserInDB]:
        """Update user information"""
        update_data = {k: v for k, v in user_update.model_dump().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        
        result = await self.collection.find_one_and_update(
            {"id": user_id},
            {"$set": update_data},
            return_document=True
        )
        
        if result:
            return UserInDB(**result)
        return None
    
    async def add_friend(self, user_id: str, friend_id: str) -> bool:
        """Add a friend to user's friend list"""
        result = await self.collection.update_one(
            {"id": user_id},
            {"$addToSet": {"friends": friend_id}}
        )
        return result.modified_count > 0
    
    async def remove_friend(self, user_id: str, friend_id: str) -> bool:
        """Remove a friend from user's friend list"""
        result = await self.collection.update_one(
            {"id": user_id},
            {"$pull": {"friends": friend_id}}
        )
        return result.modified_count > 0
