from typing import Annotated, List
from fastapi import APIRouter, Depends, Request, status, HTTPException
from bson.objectid import ObjectId

from models.user import User
from schemas.user import UserSchema, UpdateUserReq, DeleteUserRes
from auth.utils import hash_password, auth_required


router = APIRouter()


@router.get("/")
@auth_required
async def list_users(req: Request) -> List[UserSchema]:
    users = User.find_many()
    return [user.to_json() for user in users]


@router.get("/{id}")
@auth_required
async def get_user(req: Request, id: str) -> UserSchema:
    user = User.find_one({"_id": ObjectId(id)})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user.to_json()


@router.put("/{id}")
@auth_required
async def update_user(id: str, body: UpdateUserReq) -> UserSchema:
    user = User.find_one({"_id": ObjectId(id)})
    if user:
        for attr, value in body:
            if value:
                if attr == "password":
                    setattr(user, "hashed_password", hash_password(value))
                else:
                    setattr(user, attr, value)

        result = user.save()
        updated_user = User.find_one({"_id": result.inserted_id})

        if not result:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unable to create user",
            )

        return updated_user.to_json()

    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="The user belonging to this token no longer exist",
        )


@router.delete("/{id}")
@auth_required
async def delete_user(id: str) -> DeleteUserRes:
    delete_res = User.delete(id)

    return {
        "status": "success" if delete_res.acknowledged else "failed",
        "deleteCount": delete_res.deleted_count,
    }
